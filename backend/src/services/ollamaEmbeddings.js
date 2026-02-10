// Ollama-based local embeddings (FREE)

const OLLAMA_URL = "http://localhost:11434/api/embeddings";
const MODEL = "nomic-embed-text";

// 🔹 Single text embedding (for query)
export const getEmbedding = async (text) => {
  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: text,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error("Ollama embedding failed: " + err);
  }

  const data = await response.json();

  if (!data.embedding || !Array.isArray(data.embedding)) {
    throw new Error("Invalid embedding response from Ollama");
  }

  return data.embedding; // number[]
};

// 🔹 Batch embeddings (for document chunks)
export const getBatchEmbeddings = async (texts) => {
  const embeddings = [];

  for (const text of texts) {
    const emb = await getEmbedding(text);
    embeddings.push(emb);
  }

  return embeddings; // number[][]
};
