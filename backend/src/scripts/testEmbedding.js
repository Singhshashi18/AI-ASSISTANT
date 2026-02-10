import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../../.env") });

import { generateEmbedding } from "../services/geminiService.js";

(async () => {
  try {
    const text = "Hello world. This is a quick embedding test.";
    console.log("Sending test text to OpenAI for embedding...");
    const emb = await generateEmbedding(text);
    console.log("Embedding length:", emb.length);
    console.log("Sample values:", emb.slice(0, 5));
  } catch (err) {
    console.error("Embedding test failed:", err.message || err);
    process.exit(1);
  }
})();
