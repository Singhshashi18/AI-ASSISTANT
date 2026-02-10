




// import fetch from "node-fetch";

// const OLLAMA_URL = "http://localhost:11434/api/chat";
// const MODEL = "mistral"; // or mistral

// export const generateAnswer = async (question, context) => {
//   const response = await fetch(OLLAMA_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       model: MODEL,
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a helpful assistant. Answer ONLY using the given context.",
//         },
//         {
//           role: "user",
//           content: `Context:\n${context}\n\nQuestion:\n${question}`,
//         },
//       ],
//       stream: false, // 
//     }),
//   });

//   const data = await response.json();
// console.log("OLLAMA RAW RESPONSE:", data);

//   if (data.message && typeof data.message.content === "string") {
//   return data.message.content;
// }

// return "No response generated.";

// };





import fetch from "node-fetch";

const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "mistral"; // keep same

export const generateAnswer = async (question, context) => {
  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,

      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. Answer ONLY using the given context.",
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion:\n${question}`,
        },
      ],

      
      stream: false,
      options: {
        temperature: 0.2,
        top_p: 0.9,
        num_ctx: 2048,
        num_predict: 256,
      },
    }),
  });

  const data = await response.json();
  console.log("OLLAMA RAW RESPONSE:", data);

  if (data?.message?.content && typeof data.message.content === "string") {
    return data.message.content.trim();
  }

  return "No response generated.";
};
