



import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

import fs from "fs";
import path from "path";

import Document from "../models/documentModel.js";
import DocumentChunk from "../models/documentChunkModel.js";



// ✅ add Ollama embeddings
import { getBatchEmbeddings } from "../services/ollamaEmbeddings.js";

const readFileContent = async (filePath, fileType) => {
  try {
    if (fileType === "txt") {
      return fs.readFileSync(filePath, "utf-8");
    }

    if (fileType === "pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    }
  } catch (error) {
    console.error("Error in readFileContent:", error);
    throw new Error(`Error reading file: ${error.message}`);
  }
};

// Helper function to chunk text
const chunkText = (text, chunkSize = 500, overlap = 100) => {
  const chunks = [];
  const sentences = text.split(/(?<=[.!?])\s+/);

  let currentChunk = "";
  for (const sentence of sentences) {
    if ((currentChunk + " " + sentence).length > chunkSize) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += " " + sentence;
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
};

export const uploadDocument = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;
    const userId = req.user.id;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }

    if (!title) {
      fs.unlinkSync(file.path);
      return res.status(400).json({
        success: false,
        message: "Please provide a document title",
      });
    }

    const fileExt = path.extname(file.originalname).toLowerCase().slice(1);
    const content = await readFileContent(file.path, fileExt);

    const document = await Document.create({
      title,
      description: description || "",
      fileName: file.originalname,
      filePath: file.path,
      fileSize: file.size,
      fileType: fileExt,
      uploadedBy: userId,
      content,
    });

    const chunks = chunkText(content);

    let chunkDocuments = [];
    try {
      // ✅ USE OLLAMA EMBEDDINGS
      const embeddings = await getBatchEmbeddings(chunks);

      chunkDocuments = chunks.map((chunk, index) => ({
        documentId: document._id,
        chunkIndex: index,
        content: chunk,
        embedding: embeddings[index],
        tokenCount: Math.ceil(chunk.split(/\s+/).length / 4),
      }));
    } catch (err) {
      chunkDocuments = chunks.map((chunk, index) => ({
        documentId: document._id,
        chunkIndex: index,
        content: chunk,
        embedding: null,
        tokenCount: Math.ceil(chunk.split(/\s+/).length / 4),
      }));
    }

    await DocumentChunk.insertMany(chunkDocuments);

    document.chunksCount = chunks.length;
    await document.save();

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      document: {
        id: document._id,
        title: document.title,
        fileName: document.fileName,
        fileSize: document.fileSize,
        chunksCount: document.chunksCount,
        createdAt: document.createdAt,
      },
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);

    console.error("uploadDocument error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const listDocuments = async (req, res) => {
  try {
    const userId = req.user.id;

    const documents = await Document.find({
      uploadedBy: userId,
      isActive: true,
    }).select(
      "title description fileName fileSize fileType chunksCount createdAt"
    );

    res.status(200).json({
      success: true,
      count: documents.length,
      documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (document.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this document",
      });
    }

    res.status(200).json({
      success: true,
      document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (document.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this document",
      });
    }

    if (fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    await DocumentChunk.deleteMany({ documentId: id });

    document.isActive = false;
    await document.save();

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    document.isActive = !document.isActive;
    await document.save();

    res.status(200).json({
      success: true,
      message: `Document ${document.isActive ? "enabled" : "disabled"}`,
      document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

