import express from "express";
import {
  getDashboardStats,
  getAllUsers,
  getDocumentAnalytics,
  getChatAnalytics,
  updateUserRole,
  deleteUser,
  getSystemHealth,
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(adminOnly);

// Dashboard stats
router.get("/stats/dashboard", getDashboardStats);

// User management
router.get("/users/list", getAllUsers);
router.put("/users/:userId/role", updateUserRole);
router.delete("/users/:userId", deleteUser);

// Analytics
router.get("/documents/analytics", getDocumentAnalytics);
router.get("/chat/analytics", getChatAnalytics);

// System health
router.get("/system/health", getSystemHealth);

export default router;
