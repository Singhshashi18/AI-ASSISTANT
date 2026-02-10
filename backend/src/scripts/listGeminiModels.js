import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../../.env") });

const key = process.env.GEMINI_API_KEY;
if (!key) {
  console.error("GEMINI_API_KEY not set in .env");
  process.exit(1);
}

const url = "https://generativelanguage.googleapis.com/v1beta/models";

(async () => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("List models error:", err);
    process.exit(1);
  }
})();
