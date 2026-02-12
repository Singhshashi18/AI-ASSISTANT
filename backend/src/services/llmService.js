
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAnswer = async (question, context) => {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini", 
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. Answer ONLY using the given context. If answer is not in context, say you don't know.",
      },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion:\n${question}`,
      },
    ],
    temperature: 0.2,
    max_tokens: 300,
  });

  return (
    completion.choices?.[0]?.message?.content?.trim() ||
    "No response generated."
  );
};
