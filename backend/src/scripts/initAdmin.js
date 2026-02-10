import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

import User from "../models/userModel.js";

async function initializeAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Check if admin exists
    const existingAdmin = await User.findOne({ role: "admin" });
    
    if (existingAdmin) {
      console.log(`✓ Admin user already exists: ${existingAdmin.email}`);
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      name: "Super Admin",
      email: "admin@example.com",
      password: "Admin@123",
      role: "admin",
    });

    console.log(`✓ Admin user created successfully!`);
    console.log(`  Email: ${adminUser.email}`);
    console.log(`  Name: ${adminUser.name}`);
    console.log(`  Role: ${adminUser.role}`);
    console.log(`\nYou can now login with:`);
    console.log(`  POST /api/auth/login`);
    console.log(`  { "email": "${adminUser.email}", "password": "Admin@123" }`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(" Error:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

initializeAdmin();
