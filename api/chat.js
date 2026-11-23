// Serverless backend (Vercel). Keeps the API key secret and builds the prompts.
// Flow: browser -> /api/chat -> Gemini API -> back to browser.

const SYSTEM = {
  chat: `You are StudyBuddy, a friendly and patient AI tutor for students.
- Answer only study-related questions (concepts, revision, quizzes, exam tips).
- Explain in simple language with short examples.
- If a question is unrelated to studying, politely steer the user back to studies.
- If you are unsure, say so instead of guessing.`,
  explain: (level) => `You are an expert teacher. Explain the given topic at a ${level} level
using simple language, one real-world analogy and a short example. Keep it under 250 words.`,
  summarize: `You are a study-notes assistant. Summarise the given notes into clear
bullet points (max 8) and end with a one-line key takeaway.`,
  quiz: `You are an exam-question writer for second-year engineering students.
From the given topic or notes, write 5 MCQs. Each has 4 options (A-D), the correct
answer and a one-line explanation. Use exactly this format for each question:
Q1. question
A) ... B) ... C) ... D) ...
Answer: X - explanation`,
};

// Models to try in order. If one is not found (404), the next one is used.
const MODELS = process.env.GEMINI_MODEL
  ? [process.env.GEMINI_MODEL]
  : ['gemini-3.5-flash', 'gemini-3.6-flash', 'gemini-2.5-flash'];

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const { mode, text, level = 'beginner', history = [] } = req.body || {};

  // --- Input validation ---
  if (!['chat', 'explain', 'summarize', 'quiz'].includes(mode))
    return res.status(400).json({ error: 'Invalid mode.' });
  const input = typeof text === 'string' ? text.trim() : '';
  if (input.length < 3) return res.status(400).json({ error: 'Please enter at least 3 characters.' });
  if (input.length > 4000) return res.status(400).json({ error: 'Input is too long (max 4000 characters).' });
  if (!process.env.API_KEY) return res.status(500).json({ error: 'Server is missing its API key.' });

  const system = mode === 'explain'
    ? SYSTEM.explain(['beginner', 'intermediate', 'advanced'].includes(level) ? level : 'beginner')
    : SYSTEM[mode];

  // Chat keeps the last 10 turns for context; other modes are single-shot.
  // Gemini uses the role "model" instead of "assistant".
  const past = mode === 'chat'
    ? history.slice(-10)
        .filter(m => ['user', 'assistant'].includes(m.role) && typeof m.content === 'string')
        .map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }))
    : [];
  const contents = [...past, { role: 'user', parts: [{ text: input }] }];

  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: system }] },
    contents,
    generationConfig: { maxOutputTokens: 2000 },
  });

  try {
    let r;
    for (const model of MODELS) {
      r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.API_KEY },
        body,
      });
      if (r.status !== 404) break; // model exists (or another error), stop trying
    }

    if (r.status === 429) {
      return res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.' });
    }
    if (!r.ok) {
      // DEBUG: shows Google's real error. Remove the detail once everything works.
      const detail = await r.text();
      console.error('Gemini error', r.status, detail);
      return res.status(502).json({ error: 'AI error (' + r.status + '): ' + detail.slice(0, 250) });
    }

    const data = await r.json();
    const parts = (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [];
    const reply = parts.map(p => p.text || '').join('').trim();
    return res.status(200).json({ reply: reply || 'No response received. Please rephrase.' });
  } catch (e) {
    return res.status(500).json({ error: 'Network error. Please try again.' });
  }
};
