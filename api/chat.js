// Serverless backend (Vercel). Keeps the API key secret and builds the prompts.
// Flow: browser -> /api/chat -> AI model API -> back to browser.

const SYSTEM = {
  chat: `You are StudyBuddy, a friendly and patient AI tutor for students. - Answer only study-related questions (concepts, revision, quizzes, exam tips). - Explain in simple language with short examples. - If a question is unrelated to studying, politely steer the user back to studies. - If you are unsure, say so instead of guessing.`,
  explain: ( level ) => `You are an expert teacher. Explain the given topic at a ${level} level using simple language, one real-world analogy and a short example. Keep it under 250 words.`,
  summarize: `You are a study-notes assistant. Summarise the given notes into clear bullet points (max 8) and end with a one-line key takeaway.`,
  quiz: `You are an exam-question writer for second-year engineering students. From the given topic or notes, write 5 MCQs. Each has 4 options (A-D), the correct answer and a one-line explanation. Use exactly this format for each question: Q1. question A) ... B) ... C) ... D) ... Answer: X - explanation`,
};

module.exports = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed." });

  const { mode, text, level = "beginner", history = [] } = req.body || {};

  // --- Input validation ---
  if (!["chat", "explain", "summarize", "quiz"].includes(mode))
    return res.status(400).json({ error: "Invalid mode." });
  const input = typeof text === "string" ? text.trim() : "";
  if (input.length < 3)
    return res
      .status(400)
      .json({ error: "Please enter at least 3 characters." });
  if (input.length > 4000)
    return res
      .status(400)
      .json({ error: "Input is too long (max 4000 characters)." });
  if (!process.env.API_KEY)
    return res.status(500).json({ error: "Server is missing its API key." });

  const system =
    mode === "explain"
      ? SYSTEM.explain(
          ["beginner", "intermediate", "advanced"].includes(level)
            ? level
            : "beginner"
        )
      : SYSTEM[mode];

  // Chat keeps the last 10 turns for context; other modes are single-shot.
  const past =
    mode === "chat"
      ? history
          .slice(-10)
          .filter(
            (m) =>
              ["user", "assistant"].includes(m.role) &&
              typeof m.content === "string"
          )
      : [];
  const messages = [...past, { role: "user", content: input }];

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5-5",
        max_tokens: 1000,
        system,
        messages,
      }),
    });
    if (r.status === 429)
      return res
        .status(429)
        .json({
          error: "Too many requests. Please wait a moment and try again.",
        });
    if (!r.ok)
      return res
        .status(502)
        .json({ error: "The AI service had a problem. Please try again." });
    const data = await r.json();
    const reply = (data.content || [])
      .map((b) => b.text || "")
      .join("")
      .trim();
    return res
      .status(200)
      .json({ reply: reply || "No response received. Please rephrase." });
  } catch (e) {
    return res.status(500).json({ error: "Network error. Please try again." });
  }
};
