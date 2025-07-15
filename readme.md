# 🇩🇪 German Learning WebApp

This is a beginner-friendly German learning web application built with vanilla JavaScript, HTML, and CSS. The app is organized by lessons that cover basic grammar, vocabulary, pronunciation, and exercises — designed to help users master German A1–A2 level concepts in an interactive way.

---

## 🚀 Features

- 📚 **Structured Lessons**: Lessons are divided into slides (concepts) with clear explanations and examples.
- 🔊 **Text-to-Speech Pronunciation**: Every important sentence or word can be heard using your browser's built-in speech engine (TTS). Works best on desktop. Mobile support improved.
- ✍️ **Interactive Exercises**: After each lesson, practice exercises test your learning with typing-based input — not just MCQs.
- 🧠 **Smart Answer Matching**: Minor spelling mistakes, case issues, and umlaut variations are tolerated in answers.
- 🎯 **Lesson Resume Support**: The app uses `localStorage` to remember your last visited lesson and resume from there on reload.
- 📄 **All Content via JSON**: Lessons and exercises are loaded dynamically from JSON files in the `/lessons/` folder.
- 🌐 **Static Hosting Friendly**: Works completely client-side (no database). Ideal for GitHub Pages or Render static hosting.

---

## 🧾 Folder Structure

project/
├── public/
│ ├── index.html
│ ├── user_guide.html
│ ├── css/
│ ├── script/
│ │ ├── script.js
│ ├── lessons/
│ │ ├── lesson1.json
│ │ ├── lesson1_exercises.json
│ │ ├── lesson2.json
│ │ ├── lesson2_exercises.json
│ │ ├── lesson3.json
│ │ ├── lesson3_exercises.json
│ │ ├── lesson4.json
│ │ ├── lesson4_exercises.json
│ │ └── ...
└── README.md


---

## 🔧 Tech Stack

- HTML5 + CSS3
- Vanilla JavaScript (DOM, localStorage, speechSynthesis)
- JSON-based lesson and quiz content

---

## 📌 Limitations

- No backend or database (only localStorage).
- No user accounts or login yet.
- LocalStorage stores only the last visited lesson for now.
- Text-to-Speech may not work with correct German voice on some mobile browsers (fixed partially by voice selection logic).

---

## 🧑‍🏫 How to Use

Check `user_guide.html` or see the live app for step-by-step usage.

---

## 📄 License

MIT — feel free to fork and contribute.
