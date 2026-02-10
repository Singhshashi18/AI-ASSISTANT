import express from "express";
import {
  createSession,
  getSessions,
  sendMessage,
  getChatHistory,
  deleteSession,
} from "../controllers/chatController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post("/sessions", createSession);
router.get("/sessions", getSessions);
router.post("/send", sendMessage);
router.get("/history/:sessionId", getChatHistory);
router.delete("/sessions/:sessionId", deleteSession);

export default router;
