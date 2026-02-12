

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export const getEmbedding = async (text) => {
  const response = await client.embeddings.create({
    model: "text-embedding-3-small", 
    input: text,
  });

  if (!response?.data?.[0]?.embedding) {
    throw new Error("OpenAI embedding failed");
  }

  return response.data[0].embedding; 
};


export const getBatchEmbeddings = async (texts) => {
  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  });

  if (!response?.data) {
    throw new Error("OpenAI batch embedding failed");
  }

  return response.data.map(item => item.embedding); 
};
