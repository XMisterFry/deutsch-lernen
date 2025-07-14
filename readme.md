# 🧠 German Verb Trainer (A1/A2)

An interactive web app designed to help beginners (like myself!) learn **German grammar**—with a focus on **verb conjugation** and **sentence formation**—through short, well-structured lessons and practical exercises.

---

## 🚀 Features

- 📖 **Lesson-by-lesson format** (starting from A1 topics)
- 🔤 **Slide-based learning flow** — each concept appears one at a time
- 🧪 **Interactive exercises** with instant feedback (text-based, not MCQ)
- 🔊 **Built-in pronunciation (Text-to-Speech)** using the browser’s German voice
- 📂 **Modular lesson structure** using external JSON files
- 🖥️ Fully **client-side only** (no backend or database required)
- 🎯 Mobile-friendly design and responsive layout

---

## 📁 Folder Structure

```bash
/
├── index.html              # Main entry point
├── css/                    # Styling
├── script/                 # JavaScript logic (DOM + TTS)
├── lessons/                # All lesson content and exercises in JSON
│   ├── lesson1.json
│   ├── lesson1_exercises.json
│   ├── lesson2.json
│   └── ...
└── README.md               # This file

owser's Text-to-Speech API (SpeechSynthesisUtterance with German voices)

💾 Notes & Limitations
❌ No Local Storage or Login System

The app does not save progress between sessions

Each user session is fresh

✅ All content is served from static JSON files

Easy to update/add new lessons without touching HTML or JS

✅ App works 100% client-side (no need for backend/server)

🛠️ Tech Stack
HTML5

CSS3

JavaScript (Vanilla)

Web Speech API (TTS)

JSON (for lesson content)

📚 Lesson Topics Covered (so far)
✅ A1: Alphabets, Pronouns, Verb Conjugation, Numbers

🛠️ A2: In Progress...

Each lesson includes:

Concept explanation

Slide-by-slide progression

Practice questions with instant feedback

Pronunciation drills

🧑‍💻 Developer Note
This project is also a learning-by-building journey. I'm using this app not just to teach German—but to:

Practice frontend development

Structure real-world JSON data

Use Text-to-Speech

Improve UX for language learners

🌐 Live Demo
Coming soon: https://your-username.github.io/german-verb-trainer