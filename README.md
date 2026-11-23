# 📚 StudyBuddy – AI-Powered Study Assistant

> Prompt Engineering – Final Project | Second-Year Engineering, Third Semester

**Live Website:** [PASTE YOUR VERCEL URL HERE]
**GitHub Repository:** [PASTE YOUR REPO URL HERE]

---

## 👥 Team Members

| Name | Roll No. | Role in Project |
|------|----------|-----------------|
| [Name 1] | [Roll No.] | [e.g., Prompt design, frontend] |
| [Name 2] | [Roll No.] | [e.g., Chatbot and API integration] |
| [Name 3] | [Roll No.] | [e.g., Deployment, documentation] |
| [Name 4 – optional] | [Roll No.] | [e.g., Testing] |

---

## 1. Project Description

StudyBuddy is an AI-powered web application that helps students understand their study material faster. Students paste their notes or type a topic, and StudyBuddy explains it in simple language, summarises it, generates practice quizzes and answers follow-up questions through a built-in AI chatbot.

### The Problem
Students often struggle to:
- Understand difficult topics from dense textbooks or lecture notes.
- Revise efficiently before exams.
- Get quick doubt-solving help outside class hours.
- Test themselves without a ready-made question bank.

### Our Solution
StudyBuddy gives every student an on-demand AI tutor that:
- Simplifies complex topics at the student's chosen level.
- Summarises long notes into key points.
- Generates MCQ and short-answer quizzes from any topic.
- Answers doubts through a conversational chatbot.

### Target Audience
School and college students (especially engineering students) who want a quick, simple way to learn and revise.

---

## 2. Objectives

1. Provide a useful, real-world study aid using AI tools.
2. Demonstrate effective prompt engineering across the whole development process.
3. Integrate a working AI chatbot connected to an AI model through an API.
4. Build, document, and deploy a fully functional web application.

---

## 3. Features Implemented

| Feature | Description |
|---------|-------------|
| **Topic Explainer** | Explains a topic in simple, intermediate or advanced language. |
| **Notes Summariser** | Converts pasted notes into concise bullet-point summaries. |
| **Quiz Generator** | Creates MCQs and short-answer questions with answers from a topic or notes. |
| **AI Chatbot (StudyBuddy Chat)** | Answers study-related questions in real time using an AI model through an API. |
| **Input Validation** | Rejects empty, too-short or too-long inputs with clear messages. |
| **Error Handling** | Shows friendly messages for API failures, timeouts and rate limits. |
| **Responsive UI** | Works on desktop and mobile screens. |

> ⚠️ Edit this table so it lists only the features you actually built.

---

## 4. Technologies Used

| Category | Technology |
|----------|------------|
| Frontend | [HTML, CSS, JavaScript / React / Next.js – edit] |
| Backend | [Serverless API route / Node.js – edit] |
| AI Model API | [Claude API / Gemini API / OpenAI API – edit] |
| Version Control | Git and GitHub |
| Deployment | Vercel |

---

## 5. AI Tools Used and Their Contributions

> Replace the entries below with what your team **actually** did. Be ready to explain this in the viva.

| AI Tool | Tasks Performed | How It Helped |
|---------|-----------------|---------------|
| **[Tool 1 – e.g., Claude]** | [e.g., Generated the initial website from the five-part prompt] | [e.g., Produced the full page structure and base code] |
| **[Tool 2 – e.g., ChatGPT]** | [e.g., Debugged the chatbot API errors, refined UI text] | [e.g., Explained errors and suggested fixes] |
| **[Tool 3 – e.g., Cursor / Bolt.new / Gemini]** | [e.g., Added the quiz generator and improved styling] | [e.g., Faster edits directly in the codebase] |

---

## 6. Prompt Engineering Documentation

### 6.1 Initial Project-Building Prompt (Five Parts)

This prompt was prepared **before** development and used to generate the first version of the website in **[tool name]**.

**1. Role**
```
You are an expert full-stack web developer and UI/UX designer who builds
clean, beginner-friendly educational web applications.
```

**2. Task**
```
Build a complete, responsive website called "StudyBuddy" with these features:
a topic explainer, a notes summariser, a quiz generator, and an AI chatbot
that answers study-related questions using an AI API.
```

**3. Context**
```
StudyBuddy is for school and college students, mainly second-year engineering
students, who struggle to understand difficult topics and revise efficiently.
The goal is to act as a simple, always-available AI tutor. The project is part
of a Prompt Engineering course, so the code must be clear and well-commented
so students can explain it in a viva.
```

**4. Constraints**
```
- Use [HTML, CSS, JavaScript / React] for the frontend.
- The chatbot must call a real AI model through an API (no predefined replies).
- Keep API keys in environment variables, never in the frontend code.
- Validate user input and handle API errors with friendly messages.
- Clean, modern, mobile-friendly design with a simple colour palette.
- Add comments explaining the main parts of the code.
- It must be deployable on Vercel.
```

**5. Output Format**
```
Provide:
1. The project folder structure.
2. Full source code for every file.
3. A list of pages and features.
4. Step-by-step instructions to run the project locally.
```

**Saved output of this prompt:** see [`/prompts/01-initial-prompt-output.md`](prompts/01-initial-prompt-output.md)

### 6.2 How Each Part Contributed

| Part | Contribution to the Generated Website |
|------|---------------------------------------|
| **Role** | Made the AI produce professional, well-structured code and a tidy UI instead of a generic page. |
| **Task** | Defined exactly which features to build, so the output included all four modules. |
| **Context** | Led to a student-friendly design, simple language and commented code. |
| **Constraints** | Forced use of the chosen tech stack, safe API-key handling and error handling. |
| **Output Format** | Gave a complete folder structure, full code and run instructions in one response. |

### 6.3 Prompt Engineering Techniques Used

| Technique | Where We Used It |
|-----------|------------------|
| **Role-based prompting** | "You are an expert full-stack developer…" and the chatbot's system prompt "You are StudyBuddy, a friendly tutor…" |
| **Step-by-step / chain prompting** | Built the project in stages: layout → chatbot → quiz generator → error handling → deployment. |
| **Context-based prompting** | Gave the audience, purpose and course requirements in every major prompt. |
| **Structured prompting** | Used the Role / Task / Context / Constraints / Output Format structure. |
| **Prompt refinement and optimisation** | Rewrote vague prompts into specific ones (see 6.4). |
| **Clear instructions and constraints** | Specified tech stack, error handling and security rules. |
| **Reverse prompting and response evaluation** | Asked the AI what information it needed, then checked its output against our requirements. |

### 6.4 Prompt Improvement Log

> Replace these examples with your **real** prompts and results. Add screenshots in the `/screenshots` folder.

| # | Tool | Original Prompt | Problem with Output | Improved Prompt | Result |
|---|------|-----------------|---------------------|-----------------|--------|
| 1 | [Tool] | "Make a study website." | Generic page, no chatbot, no structure. | The five-part prompt in 6.1. | Complete multi-feature site with a chatbot. |
| 2 | [Tool] | "Add a chatbot." | Chatbot used hard-coded replies. | "Add a chatbot that sends the user's message to the [API name] and displays the model's response. Store the API key in an environment variable." | Real API-connected chatbot. |
| 3 | [Tool] | "Fix the error." | Vague, unhelpful suggestions. | "Here is my code and this exact error message: [error]. Explain the cause and give the corrected code." | Correct, explained fix. |
| 4 | [Tool] | "Make quiz questions." | Questions too easy and inconsistent format. | "Generate 5 MCQs on [topic] for second-year engineering students with 4 options each, mark the correct answer and add a one-line explanation. Return JSON." | Consistent, usable quiz output. |

Full prompt history: see [`/prompts/`](prompts/).

### 6.5 Chatbot System Prompt

```
You are StudyBuddy, a friendly and patient AI tutor for students.
- Answer only study-related questions (concepts, revision, quizzes, exam tips).
- Explain in simple language with short examples.
- If a question is unrelated to studying, politely steer the user back to studies.
- If you are unsure, say so instead of guessing.
```

---

## 7. How the AI Chatbot Works

1. The user types a message in the chat interface.
2. The frontend validates the input (not empty, within the length limit).
3. The message is sent to our backend API route (`/api/chat`).
4. The backend adds the **system prompt**, attaches the API key from the environment variable and sends the request to the **[AI model API]**.
5. The model's reply is returned to the backend, then to the frontend, and displayed in the chat window.

**Why a backend route?** It keeps the API key secret. The key never reaches the browser.

**Error handling:**
- Empty or too-long input → inline validation message.
- Network or API failure → "Something went wrong. Please try again."
- Rate limit or timeout → friendly retry message.

---

## 8. Project Structure

> Edit this to match your actual folders.

```
studybuddy/
├── public/
├── src/ (or app/)
│   ├── components/
│   ├── pages/
│   └── api/
│       └── chat.js
├── prompts/
│   ├── 01-initial-prompt-output.md
│   └── prompt-history.md
├── screenshots/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 9. Installation and Running the Project

### Prerequisites
- Node.js (v18 or later) and npm
- An API key from [your AI provider]

### Steps

```bash
# 1. Clone the repository
git clone [YOUR REPO URL]
cd studybuddy

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# Open .env and add your key:
# API_KEY=your_api_key_here

# 4. Start the development server
npm run dev

# 5. Open the app
# http://localhost:3000
```

### Deploying to Vercel
1. Push the code to GitHub.
2. Import the repository on [vercel.com](https://vercel.com).
3. Add `API_KEY` under **Settings → Environment Variables**.
4. Click **Deploy** and copy the live URL into this README.

---

## 10. Screenshots

> Add your own screenshots to the `/screenshots` folder and update the file names.

| Home Page | Topic Explainer |
|-----------|-----------------|
| ![Home](screenshots/home.png) | ![Explainer](screenshots/explainer.png) |

| Quiz Generator | Chatbot |
|----------------|---------|
| ![Quiz](screenshots/quiz.png) | ![Chatbot](screenshots/chatbot.png) |

---

## 11. Errors and Challenges Faced

> Replace with your real problems. You will be asked about these in the viva.

| Challenge | How We Solved It |
|-----------|------------------|
| [e.g., API key exposed in frontend code] | Moved the API call to a backend route and used environment variables. |
| [e.g., CORS error when calling the API from the browser] | Called the API from the server-side route instead. |
| [e.g., Chatbot gave off-topic answers] | Added a stricter system prompt. |
| [e.g., Inconsistent quiz format] | Asked for JSON output with a fixed structure in the prompt. |
| [e.g., Deployment failed on Vercel] | Added the missing environment variable and fixed the build error. |

---

## 12. Future Improvements

- User accounts and saved study history.
- Upload PDF notes for summarising.
- Flashcard mode and progress tracking.
- Multi-language support.

---

## 13. Security Note

API keys are **not** stored in this repository. They are loaded from environment variables. `.env` is listed in `.gitignore`.

---

## 14. License

This project was created for educational purposes as part of the Prompt Engineering course.
