import User from "../models/userModel.js";
import Document from "../models/documentModel.js";
import DocumentChunk from "../models/documentChunkModel.js";
import ChatSession from "../models/chatSessionModel.js";
import Message from "../models/messageModel.js";


export const getDashboardStats = async (req, res) => {
  try {
    // Get counts
    const totalUsers = await User.countDocuments();
    const totalDocuments = await Document.countDocuments();
    const totalChunks = await DocumentChunk.countDocuments();
    const totalChatSessions = await ChatSession.countDocuments();
    const totalMessages = await Message.countDocuments();

    // Get active users (users with documents or chat sessions in last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const activeUsers = await User.countDocuments({
      updatedAt: { $gte: thirtyDaysAgo },
    });

    // Calculate total storage (document file sizes)
    const storageData = await Document.aggregate([
      {
        $group: {
          _id: null,
          totalSize: { $sum: "$fileSize" },
          avgSize: { $avg: "$fileSize" },
        },
      },
    ]);

    const totalStorage = storageData[0]?.totalSize || 0;
    const avgDocSize = storageData[0]?.avgSize || 0;

    // Get avg chunks per document
    const chunksData = await DocumentChunk.aggregate([
      {
        $group: {
          _id: "$documentId",
        },
      },
      {
        $group: {
          _id: null,
          avgChunksPerDoc: { $avg: 1 },
        },
      },
    ]);

    const avgChunksPerDoc = chunksData[0]?.avgChunksPerDoc || 0;

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeUsers30d: activeUsers,
        totalDocuments,
        totalChunks,
        avgChunksPerDocument: parseFloat(avgChunksPerDoc.toFixed(2)),
        totalChatSessions,
        totalMessages,
        storage: {
          total: totalStorage,
          average: avgDocSize,
          unit: "bytes",
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route   GET /api/admin/users/list
// @desc    Get list of all users with stats
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(query)
      .select("id name email role createdAt updatedAt")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    // Get user stats for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const docCount = await Document.countDocuments({ uploadedBy: user._id });
        const chatCount = await ChatSession.countDocuments({ userId: user._id });
        const messageCount = await Message.countDocuments({
          sessionId: { $in: await ChatSession.find({ userId: user._id }).select("_id") },
        });

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          stats: {
            documents: docCount,
            chatSessions: chatCount,
            messages: messageCount,
          },
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      })
    );

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: usersWithStats.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      users: usersWithStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getDocumentAnalytics = async (req, res) => {
  try {
    // Documents by file type
    const docsByType = await Document.aggregate([
      {
        $group: {
          _id: "$fileType",
          count: { $sum: 1 },
          totalSize: { $sum: "$fileSize" },
        },
      },
    ]);

    // Total and active documents
    const totalDocs = await Document.countDocuments();
    const activeDocs = await Document.countDocuments({ isActive: true });
    const inactiveDocs = totalDocs - activeDocs;

    // Top documents by chunk count
    const topDocs = await Document.aggregate([
      {
        $lookup: {
          from: "documentchunks",
          localField: "_id",
          foreignField: "documentId",
          as: "chunks",
        },
      },
      {
        $project: {
          title: 1,
          fileName: 1,
          fileSize: 1,
          createdAt: 1,
          chunkCount: { $size: "$chunks" },
        },
      },
      { $sort: { chunkCount: -1 } },
      { $limit: 10 },
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        totalDocuments: totalDocs,
        activeDocuments: activeDocs,
        inactiveDocuments: inactiveDocs,
        byFileType: docsByType,
        topDocuments: topDocs,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getChatAnalytics = async (req, res) => {
  try {
    const totalSessions = await ChatSession.countDocuments();
    const activeSessions = await ChatSession.countDocuments({ isActive: true });
    const totalMessages = await Message.countDocuments();

    // Get messages per session average
    const msgStats = await ChatSession.aggregate([
      {
        $lookup: {
          from: "messages",
          localField: "_id",
          foreignField: "sessionId",
          as: "messages",
        },
      },
      {
        $project: {
          messageCount: { $size: "$messages" },
        },
      },
      {
        $group: {
          _id: null,
          avgMessages: { $avg: "$messageCount" },
          maxMessages: { $max: "$messageCount" },
          minMessages: { $min: "$messageCount" },
        },
      },
    ]);

    const msgData = msgStats[0] || { avgMessages: 0, maxMessages: 0, minMessages: 0 };

    // Top active sessions (most messages)
    const topSessions = await ChatSession.aggregate([
      {
        $lookup: {
          from: "messages",
          localField: "_id",
          foreignField: "sessionId",
          as: "messages",
        },
      },
      {
        $project: {
          title: 1,
          userId: 1,
          createdAt: 1,
          messageCount: { $size: "$messages" },
        },
      },
      { $sort: { messageCount: -1 } },
      { $limit: 10 },
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        totalChatSessions: totalSessions,
        activeSessions,
        totalMessages,
        messageStats: {
          average: parseFloat(msgData.avgMessages.toFixed(2)),
          max: msgData.maxMessages,
          min: msgData.minMessages,
        },
        topSessions,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be 'user' or 'admin'",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User role updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Mark user as inactive
    user.isActive = false;
    await user.save();

    // Optional: Also deactivate user's documents
    await Document.updateMany(
      { uploadedBy: userId },
      { isActive: false }
    );

    // Optional: Deactivate user's chat sessions
    await ChatSession.updateMany(
      { userId },
      { isActive: false }
    );

    res.status(200).json({
      success: true,
      message: "User account deactivated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getSystemHealth = async (req, res) => {
  try {
    const health = {
      status: "healthy",
      timestamp: new Date(),
      database: "connected",
      checks: {
        usersCollection: await User.countDocuments() >= 0,
        documentsCollection: await Document.countDocuments() >= 0,
        chunksCollection: await DocumentChunk.countDocuments() >= 0,
        chatsCollection: await ChatSession.countDocuments() >= 0,
        messagesCollection: await Message.countDocuments() >= 0,
      },
    };

    res.status(200).json({
      success: true,
      health,
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: "Service unavailable",
      error: error.message,
    });
  }
};
