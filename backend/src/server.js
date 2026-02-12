import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });
console.log("OPENAI KEY isssssssss:", process.env.OPENAI_API_KEY);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected "))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5050;




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
