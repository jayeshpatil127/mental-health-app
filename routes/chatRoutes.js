// const express = require("express");
// const router = express.Router();
// const axios = require("axios");


// const sensitiveWords = [
//   "suicide",
//   "siside",
//   "kill myself",
//   "kill my self",
//   "die",
//   "mar jana",
//   "self harm",
//   "self-harm",
//   "end everything",
//   "end my life",
//   "hopeless",
//   "can't go on",
//   "cant go on",
//   "want to disappear",
//   "i want to die",
//   "i want to kill myself"
// ];

// /* ---------- CRISIS RESPONSE ---------- */
// function crisisReply() {
//   return `
// ⚠️ It sounds like you're going through a very difficult moment.

// You are not alone. Please reach out for immediate help:

// 🇮🇳 India: +91-9152987821  
// 🇺🇸 US: 1-800-273-8255
// `;
// }

// /* ---------- CRISIS KEYWORDS ---------- */
// router.post("/", async (req, res) => {
//   const { message } = req.body;

//   console.log("API HIT");
//   console.log("Message:", message);

//   if (!message || typeof message !== "string" || message.trim() === "") {
//     return res.json({
//       reply: "Please tell me what you're feeling.",
//       alert: false,
//     });
//   }

//   const lowerMessage = message.toLowerCase();

//   const crisisDetected = sensitiveWords.some(word =>
//     lowerMessage.includes(word)
//   );

//   console.log("Crisis detected:", crisisDetected);

//   if (crisisDetected) {
//     return res.json({
//       reply: crisisReply(),
//       alert: true,
//     });
//   }

//   // 🔥 NORMAL MESSAGE — FORCE RESPONSE
//   let replyText = "I’m here. Tell me more about what’s on your mind.";

//   try {
//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "mistralai/mistral-7b-instruct",
//         messages: [
//           {
//             role: "system",
//            content: `
// You are a helpful assistant.
// - If the user asks general questions, answer clearly and concisely.
// - If the user expresses emotional distress, respond empathetically.
// - Do NOT give medical or self-harm advice.
// `

//           },
//           { role: "user", content: message },
//         ],
//         temperature: 0.4,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         timeout: 6000, // ⏱️ strict
//       }
//     );

//     const aiReply = response?.data?.choices?.[0]?.message?.content;
//     if (aiReply && aiReply.trim() !== "") {
//       replyText = aiReply;
//     }

//   } catch (err) {
//     console.log("AI FAILED, USING FALLBACK");
//   }

//   // ✅ THIS WILL ALWAYS RUN
//   return res.json({
//     reply: replyText,
//     alert: false,
//   });
// });


// module.exports = router;
const express = require("express");
const router = express.Router();
const axios = require("axios");

/* ---------- CRISIS KEYWORDS ---------- */
const sensitiveWords = [
  "suicide",
  "siside",
  "kill myself",
  "kill my self",
  "die",
  "mar jana",
  "self harm",
  "self-harm",
  "end everything",
  "end my life",
  "hopeless",
  "can't go on",
  "cant go on",
  "want to disappear",
  "i want to die",
  "i want to kill myself"
];

/* ---------- CRISIS RESPONSE ---------- */
function crisisReply() {
  return `
⚠️ It sounds like you're going through a very difficult moment.

You are not alone. Please reach out for immediate help:

🇮🇳 India: +91-9152987821  
🇺🇸 US: 1-800-273-8255
`;
}

/* ---------- CHAT ROUTE ---------- */
router.post("/", async (req, res) => {
  const { message } = req.body;

  // Basic validation
  if (!message || typeof message !== "string" || message.trim() === "") {
    return res.json({
      reply: "Please tell me what you're feeling.",
      alert: false,
    });
  }

  const lowerMessage = message.toLowerCase();

  // 🚨 Crisis detection FIRST
  const crisisDetected = sensitiveWords.some(word =>
    lowerMessage.includes(word)
  );

  if (crisisDetected) {
    return res.json({
      reply: crisisReply(),
      alert: true,
    });
  }

  // 🤖 Normal / Random questions + chat
  let replyText = "I’m here. Tell me more about what’s on your mind.";

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: `
You are a helpful assistant.

Rules:
- Answer general questions clearly.
- Respond normally to greetings.
- Be empathetic for emotional messages.
- Do NOT give medical advice.
- Do NOT encourage self-harm.
`,
          },
          { role: "user", content: message },
        ],
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 6000,
      }
    );

    const aiReply = response?.data?.choices?.[0]?.message?.content;
    if (aiReply && aiReply.trim() !== "") {
      replyText = aiReply;
    }

  } catch (err) {
    // Silent fallback (no terminal spam)
  }

  return res.json({
    reply: replyText,
    alert: false,
  });
});

module.exports = router;
