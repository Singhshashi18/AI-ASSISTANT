







// import ChatSession from "../models/chatSessionModel.js";
// import Message from "../models/messageModel.js";
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

// /* ---------------- CONTROLLERS ---------------- */

// export const createSession = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { title } = req.body;

//     const session = await ChatSession.create({
//       userId,
//       title: title || "New Chat",
//     });

//     res.status(201).json({
//       success: true,
//       message: "Chat session created",
//       session: {
//         id: session._id,
//         title: session.title,
//         createdAt: session.createdAt,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getSessions = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const sessions = await ChatSession.find({ userId, isActive: true })
//       .sort({ createdAt: -1 })
//       .select("title messageCount totalTokensUsed createdAt");

//     res.status(200).json({
//       success: true,
//       count: sessions.length,
//       sessions,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const sendMessage = async (req, res) => {
//   try {
//     const { sessionId, message, topK = 3 } = req.body;
//     const userId = req.user.id;

//     if (!sessionId || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "Session ID and message are required",
//       });
//     }

//     const session = await ChatSession.findById(sessionId);
//     if (!session || session.userId.toString() !== userId) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }

//     await Message.create({
//       sessionId,
//       role: "user",
//       content: message,
//     });

//     /* 🔥 OLLAMA EMBEDDING */
//     const messageEmbedding = await getEmbedding(message);

//     const userDocs = await Document.find({
//       uploadedBy: userId,
//       isActive: true,
//     }).select("_id");

//     const docIds = userDocs.map(doc => doc._id);

//     let answer = "";
//     let sources = [];

//     if (docIds.length > 0) {
//       const allChunks = await DocumentChunk.find({
//         documentId: { $in: docIds },
//       }).populate("documentId", "title");

//       const isSummaryQuery = /summary|summarize|overview|brief/i.test(message);

//       let relevantChunks = [];

//       if (isSummaryQuery) {
//         // 🔥 SUMMARY MODE
//         relevantChunks = allChunks.slice(0, 6);
//       } else {
//         // 🔥 VECTOR SEARCH MODE
//         relevantChunks = allChunks
//           .map(chunk => ({
//             ...chunk.toObject(),
//             similarity: cosineSimilarity(messageEmbedding, chunk.embedding),
//           }))
//           .sort((a, b) => b.similarity - a.similarity)
//           .slice(0, topK)
//           .filter(chunk => chunk.similarity > 0.25);
//       }

//       if (relevantChunks.length > 0) {
//         const context = relevantChunks
//           .map(chunk => `[${chunk.documentId.title}]\n${chunk.content}`)
//           .join("\n\n");

//         answer = await generateAnswer(message, context);

//         sources = relevantChunks.map(chunk => ({
//           documentTitle: chunk.documentId.title,
//           similarity: chunk.similarity
//             ? (chunk.similarity * 100).toFixed(2) + "%"
//             : "N/A",
//           excerpt: chunk.content.substring(0, 100) + "...",
//         }));
//       } else {
//         answer = "No relevant information found in your documents.";
//       }
//     } else {
//       answer = "No documents uploaded yet.";
//     }

//     await Message.create({
//       sessionId,
//       role: "assistant",
//       content: answer,
//       sources,
//     });

//     session.messageCount += 2;
//     await session.save();

//     res.status(200).json({
//       success: true,
//       userMessage: message,
//       assistantMessage: answer,
//       sources,
//     });
//   } catch (error) {
//     console.error("sendMessage error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getChatHistory = async (req, res) => {
//   try {
//     const { sessionId } = req.params;
//     const userId = req.user.id;

//     const session = await ChatSession.findById(sessionId);
//     if (!session || session.userId.toString() !== userId) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }

//     const messages = await Message.find({ sessionId })
//       .sort({ createdAt: 1 })
//       .select("role content sources createdAt");

//     res.status(200).json({
//       success: true,
//       sessionId,
//       messageCount: messages.length,
//       messages,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const deleteSession = async (req, res) => {
//   try {
//     const { sessionId } = req.params;
//     const userId = req.user.id;

//     const session = await ChatSession.findById(sessionId);
//     if (!session || session.userId.toString() !== userId) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }

//     await Message.deleteMany({ sessionId });
//     session.isActive = false;
//     await session.save();

//     res.status(200).json({
//       success: true,
//       message: "Chat session deleted",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };







import ChatSession from "../models/chatSessionModel.js";
import Message from "../models/messageModel.js";
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

/* ---------------- CONTROLLERS ---------------- */

export const createSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title } = req.body;

    const session = await ChatSession.create({
      userId,
      title: title || "New Chat",
    });

    res.status(201).json({
      success: true,
      message: "Chat session created",
      session: {
        id: session._id,
        title: session.title,
        createdAt: session.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSessions = async (req, res) => {
  try {
    const userId = req.user.id;

    const sessions = await ChatSession.find({ userId, isActive: true })
      .sort({ createdAt: -1 })
      .select("title messageCount totalTokensUsed createdAt");

    res.status(200).json({
      success: true,
      count: sessions.length,
      sessions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { sessionId, message, topK = 3 } = req.body;
    const userId = req.user.id;

    if (!sessionId || !message) {
      return res.status(400).json({
        success: false,
        message: "Session ID and message are required",
      });
    }

    const session = await ChatSession.findById(sessionId);
    if (!session || session.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await Message.create({
      sessionId,
      role: "user",
      content: message,
    });

    /* 🔥 OLLAMA EMBEDDING */
    const messageEmbedding = await getEmbedding(message);

    const userDocs = await Document.find({
      uploadedBy: userId,
      isActive: true,
    }).select("_id");

    const docIds = userDocs.map(doc => doc._id);

    let answer = "";
    let sources = [];

    if (docIds.length > 0) {
      const allChunks = await DocumentChunk.find({
        documentId: { $in: docIds },
      }).populate("documentId", "title");

      const isSummaryQuery = /summary|summarize|overview|brief/i.test(message);

      let relevantChunks = [];

      if (isSummaryQuery) {
        // 🔥 SUMMARY MODE (LIMITED)
        relevantChunks = allChunks.slice(0, 5).map(c => c.toObject());
      } else {
        // 🔥 VECTOR SEARCH MODE
        relevantChunks = allChunks
          .map(chunk => ({
            ...chunk.toObject(),
            similarity: cosineSimilarity(messageEmbedding, chunk.embedding),
          }))
          .sort((a, b) => b.similarity - a.similarity)
          .slice(0, topK)
          .filter(chunk => chunk.similarity > 0.25);
      }

      if (relevantChunks.length > 0) {
        // 🔥 CONTEXT SIZE LIMITED (MAIN SPEED FIX)
        const context = relevantChunks
          .map(
            chunk =>
              `[${chunk.documentId.title}]\n${chunk.content.slice(0, 800)}`
          )
          .join("\n\n");

        answer = await generateAnswer(message, context);

        sources = relevantChunks.map(chunk => ({
          documentTitle: chunk.documentId.title,
          similarity: chunk.similarity
            ? (chunk.similarity * 100).toFixed(2) + "%"
            : "N/A",
          excerpt: chunk.content.slice(0, 120) + "...",
        }));
      } else {
        answer = "No relevant information found in your documents.";
      }
    } else {
      answer = "No documents uploaded yet.";
    }

    await Message.create({
      sessionId,
      role: "assistant",
      content: answer,
      sources,
    });

    session.messageCount += 2;
    await session.save();

    res.status(200).json({
      success: true,
      userMessage: message,
      assistantMessage: answer,
      sources,
    });
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;

    const session = await ChatSession.findById(sessionId);
    if (!session || session.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const messages = await Message.find({ sessionId })
      .sort({ createdAt: 1 })
      .select("role content sources createdAt");

    res.status(200).json({
      success: true,
      sessionId,
      messageCount: messages.length,
      messages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;

    const session = await ChatSession.findById(sessionId);
    if (!session || session.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await Message.deleteMany({ sessionId });
    session.isActive = false;
    await session.save();

    res.status(200).json({
      success: true,
      message: "Chat session deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
