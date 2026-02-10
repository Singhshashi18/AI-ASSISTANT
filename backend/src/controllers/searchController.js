
// import DocumentChunk from "../models/documentChunkModel.js";
// import Document from "../models/documentModel.js";
// import { getEmbedding } from "../services/ollamaEmbeddings.js";
// import { generateAnswer } from "../services/llmService.js";

// /* ---------------- SAFE COSINE SIMILARITY ---------------- */
// const cosineSimilarity = (vecA, vecB) => {
//   if (
//     !Array.isArray(vecA) ||
//     !Array.isArray(vecB) ||
//     vecA.length === 0 ||
//     vecB.length === 0 ||
//     vecA.length !== vecB.length
//   ) {
//     return 0;
//   }

//   let dot = 0;
//   let normA = 0;
//   let normB = 0;

//   for (let i = 0; i < vecA.length; i++) {
//     dot += vecA[i] * vecB[i];
//     normA += vecA[i] * vecA[i];
//     normB += vecB[i] * vecB[i];
//   }

//   if (normA === 0 || normB === 0) return 0;
//   return dot / (Math.sqrt(normA) * Math.sqrt(normB));
// };

// /* -------------------------------------------------------
//    SEARCH CHUNKS
// -------------------------------------------------------- */
// export const searchChunks = async (req, res) => {
//   try {
//     const { query, topK = 3} = req.body;
//     const userId = req.user.id;

//     if (!query) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide a search query",
//       });
//     }

//     console.log(`Processing search query: "${query}"`);
//     const queryEmbedding = await getEmbedding(query);

//     const userDocs = await Document.find({
//       uploadedBy: userId,
//       isActive: true,
//     }).select("_id");

//     const docIds = userDocs.map(doc => doc._id);

//     if (docIds.length === 0) {
//       return res.status(200).json({
//         success: true,
//         chunks: [],
//       });
//     }

//     const allChunks = await DocumentChunk.find({
//       documentId: { $in: docIds },
//     }).populate("documentId", "title");

//     const chunksWithScore = allChunks
//       .map(chunk => ({
//         ...chunk.toObject(),
//         similarity: cosineSimilarity(queryEmbedding, chunk.embedding),
//       }))
//       .sort((a, b) => b.similarity - a.similarity)
//       .slice(0, topK);

//     res.status(200).json({
//       success: true,
//       query,
//       resultCount: chunksWithScore.length,
//       chunks: chunksWithScore.map(chunk => ({
//         id: chunk._id,
//         documentTitle: chunk.documentId?.title,
//         content: chunk.content,
//         similarity: (chunk.similarity * 100).toFixed(2) + "%",
//       })),
//     });
//   } catch (error) {
//     console.error("searchChunks error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* -------------------------------------------------------
//    ASK QUESTION (RAG)
// -------------------------------------------------------- */
// export const askQuestion = async (req, res) => {
//   try {
//     const { question, topK = 3 } = req.body;
//     const userId = req.user.id;

//     if (!question) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide a question",
//       });
//     }

//     console.log(`Processing question: "${question}"`);
//     const questionEmbedding = await getEmbedding(question);

//     const userDocs = await Document.find({
//       uploadedBy: userId,
//       isActive: true,
//     }).select("_id");

//     const docIds = userDocs.map(doc => doc._id);

//     if (docIds.length === 0) {
//       return res.status(200).json({
//         success: true,
//         answer: "No documents uploaded yet.",
//         sources: [],
//       });
//     }

//     const allChunks = await DocumentChunk.find({
//       documentId: { $in: docIds },
//     }).populate("documentId", "title");

//     const isSummaryQuery = /summary|summarize|overview|brief/i.test(question);

//     let relevantChunks = [];

//     if (isSummaryQuery) {
//       // 🔥 SUMMARY MODE
//       relevantChunks = allChunks.slice(0, 6);
//     } else {
//       // 🔥 VECTOR SEARCH MODE
//       relevantChunks = allChunks
//         .map(chunk => ({
//           ...chunk.toObject(),
//           similarity: cosineSimilarity(questionEmbedding, chunk.embedding),
//         }))
//         .sort((a, b) => b.similarity - a.similarity)
//         .slice(0, topK)
//         .filter(chunk => chunk.similarity > 0.25);
//     }

//     if (relevantChunks.length === 0) {
//       return res.status(200).json({
//         success: true,
//         answer: "No relevant information found in your documents.",
//         sources: [],
//       });
//     }

//     const context = relevantChunks
//       .map(chunk => `[${chunk.documentId.title}]\n${chunk.content}`)
//       .join("\n\n");

//     console.log("Generating answer with LLM...");
//     const answer = await generateAnswer(question, context);

//     res.status(200).json({
//       success: true,
//       question,
//       answer,
//       sources: relevantChunks.map(chunk => ({
//         document: chunk.documentId.title,
//         similarity: chunk.similarity
//           ? (chunk.similarity * 100).toFixed(2) + "%"
//           : "N/A",
//         excerpt: chunk.content.substring(0, 100) + "...",
//       })),
//     });
//   } catch (error) {
//     console.error("askQuestion error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };





import DocumentChunk from "../models/documentChunkModel.js";
import Document from "../models/documentModel.js";
import { getEmbedding } from "../services/ollamaEmbeddings.js";
import { generateAnswer } from "../services/llmService.js";

/* ---------------- SAFE COSINE SIMILARITY ---------------- */
const cosineSimilarity = (vecA, vecB) => {
  if (
    !Array.isArray(vecA) ||
    !Array.isArray(vecB) ||
    vecA.length === 0 ||
    vecB.length === 0 ||
    vecA.length !== vecB.length
  ) {
    return 0;
  }

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
};

/* -------------------------------------------------------
   SEARCH CHUNKS
-------------------------------------------------------- */
export const searchChunks = async (req, res) => {
  try {
    const { query, topK = 3 } = req.body;
    const userId = req.user.id;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Please provide a search query",
      });
    }

    console.log(`Processing search query: "${query}"`);
    const queryEmbedding = await getEmbedding(query);

    const userDocs = await Document.find({
      uploadedBy: userId,
      isActive: true,
    }).select("_id");

    const docIds = userDocs.map(doc => doc._id);

    if (docIds.length === 0) {
      return res.status(200).json({
        success: true,
        chunks: [],
      });
    }

    const allChunks = await DocumentChunk.find({
      documentId: { $in: docIds },
    }).populate("documentId", "title");

    const chunksWithScore = allChunks
      .map(chunk => ({
        ...chunk.toObject(),
        similarity: cosineSimilarity(queryEmbedding, chunk.embedding),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);

    res.status(200).json({
      success: true,
      query,
      resultCount: chunksWithScore.length,
      chunks: chunksWithScore.map(chunk => ({
        id: chunk._id,
        documentTitle: chunk.documentId?.title,
        content: chunk.content.slice(0, 300), // 🔥 small preview
        similarity: (chunk.similarity * 100).toFixed(2) + "%",
      })),
    });
  } catch (error) {
    console.error("searchChunks error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------
   ASK QUESTION (RAG)
-------------------------------------------------------- */
export const askQuestion = async (req, res) => {
  try {
    const { question, topK = 3 } = req.body;
    const userId = req.user.id;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Please provide a question",
      });
    }

    console.log(`Processing question: "${question}"`);
    const questionEmbedding = await getEmbedding(question);

    const userDocs = await Document.find({
      uploadedBy: userId,
      isActive: true,
    }).select("_id");

    const docIds = userDocs.map(doc => doc._id);

    if (docIds.length === 0) {
      return res.status(200).json({
        success: true,
        answer: "No documents uploaded yet.",
        sources: [],
      });
    }

    const allChunks = await DocumentChunk.find({
      documentId: { $in: docIds },
    }).populate("documentId", "title");

    const isSummaryQuery = /summary|summarize|overview|brief/i.test(question);

    let relevantChunks = [];

    if (isSummaryQuery) {
      // 🔥 SUMMARY MODE (first chunks, limited)
      relevantChunks = allChunks.slice(0, 5).map(c => c.toObject());
    } else {
      // 🔥 VECTOR SEARCH MODE
      relevantChunks = allChunks
        .map(chunk => ({
          ...chunk.toObject(),
          similarity: cosineSimilarity(questionEmbedding, chunk.embedding),
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, topK)
        .filter(chunk => chunk.similarity > 0.25);
    }

    if (relevantChunks.length === 0) {
      return res.status(200).json({
        success: true,
        answer: "No relevant information found in your documents.",
        sources: [],
      });
    }

    // 🔥 CONTEXT SIZE LIMITED (MAIN SPEED FIX)
    const context = relevantChunks
      .map(
        chunk =>
          `[${chunk.documentId.title}]\n${chunk.content.slice(0, 800)}`
      )
      .join("\n\n");

    console.log("Generating answer with LLM...");
    const answer = await generateAnswer(question, context);

    res.status(200).json({
      success: true,
      question,
      answer,
      sources: relevantChunks.map(chunk => ({
        document: chunk.documentId.title,
        similarity: chunk.similarity
          ? (chunk.similarity * 100).toFixed(2) + "%"
          : "N/A",
        excerpt: chunk.content.slice(0, 120) + "...",
      })),
    });
  } catch (error) {
    console.error("askQuestion error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
