import express from "express";
import {
  uploadDocument,
  listDocuments,
  getDocument,
  deleteDocument,
  toggleDocument,
} from "../controllers/documentController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post("/upload", upload.single("file"), uploadDocument);
router.get("/list", listDocuments);
router.get("/:id", getDocument);
router.delete("/:id", deleteDocument);

// Admin only
router.put("/:id/toggle", adminOnly, toggleDocument);

export default router;
