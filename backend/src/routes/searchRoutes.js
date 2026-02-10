import express from "express";
import { searchChunks, askQuestion } from "../controllers/searchController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post("/query", searchChunks);
router.post("/ask", askQuestion);

export default router;
