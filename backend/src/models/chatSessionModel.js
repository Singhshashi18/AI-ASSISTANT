import mongoose from "mongoose";

const chatSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "New Chat",
    },
    documentIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    }],
    messageCount: {
      type: Number,
      default: 0,
    },
    totalTokensUsed: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ChatSession", chatSessionSchema);
