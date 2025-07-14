let current = 0;
let slides = [];
let exercises = [];
let currentExercise = 0;


async function loadLesson(lessonId) {
  const container = document.getElementById("lessonDisplay");
  if (!lessonId) {
    container.innerHTML = "<p>Please select a lesson.</p>";
    return;
  }

  container.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`lessons/lesson${lessonId}.json`);
    const data = await res.json();
    slides = data.slides;
    current = 0;
    renderSlide();
  } catch (err) {
    container.innerHTML = "<p>Error loading lesson.</p>";
  }
}

function renderSlide() {
  const container = document.getElementById("lessonDisplay");
  const slide = slides[current];

  let html = `<div class="slide active">`;

  if (slide.type === "text") {
    html += `<p>${slide.content.replace(/\n/g, '<br>')}</p>`;

  } else if (slide.type === "quiz") {
    html += `<p><strong>${slide.question}</strong></p><ul>`;
    slide.options.forEach(option => {
      html += `<li><button onclick="checkAnswer('${option}', '${slide.answer}')">${option}</button></li>`;
    });
    html += `</ul><div id="quizFeedback"></div>`;
  }

  html += `
    <div class="nav-buttons">
      <button onclick="prevSlide()" ${current === 0 ? 'disabled' : ''}>Previous</button>
      <button onclick="nextSlide()" ${current === slides.length - 1 ? 'disabled' : ''}>Next</button>
    </div>
    <div class="exercise-button">
    <button onclick="loadExercise()">Start Exercise</button>
  </div>
  </div>`;

  container.innerHTML = html;
}

function nextSlide() {
  if (current < slides.length - 1) {
    current++;
    renderSlide();
  }
}

function prevSlide() {
  if (current > 0) {
    current--;
    renderSlide();
  }
}

function checkAnswer(selected, correct) {
  const feedback = document.getElementById("quizFeedback");
  if (selected === correct) {
    feedback.innerHTML = "<p style='color: green;'>Correct!</p>";
  } else {
    feedback.innerHTML = `<p style='color: red;'>Wrong. Correct answer is: ${correct}</p>`;
  }
}

async function loadExercise() {
  const lessonId = document.getElementById("lessonSelect").value;
  const container = document.getElementById("exerciseContainer");
  container.innerHTML = "<p>Loading exercise...</p>";

  try {
    const res = await fetch(`lessons/lesson${lessonId}_exercises.json`);
    const data = await res.json();
    exercises = data.exercises;
    currentExercise = 0;
    renderExercise();
  } catch (err) {
    container.innerHTML = "<p>❌ No exercises found for this lesson.</p>";
  }
}

function renderExercise() {
  const container = document.getElementById("exerciseContainer");
  const ex = exercises[currentExercise];

  container.innerHTML = `
  
  <h2 style="margin-bottom: 1rem;">✍️ Lesson Exercise</h2>

    <div class="exercise-slide">
      <p><strong>Exercise ${currentExercise + 1}:</strong> ${ex.question}</p>
      <input type="text" id="exerciseInput" placeholder="Type your answer here" />
      <div id="exerciseFeedback" class="feedback"></div>

      <div class="nav-buttons">
        <button onclick="prevExercise()" ${currentExercise === 0 ? 'disabled' : ''}>Previous</button>
        <button onclick="nextExercise()">Next</button>
      </div>
    </div>
  `;
}
function nextExercise() {
  const input = document.getElementById("exerciseInput").value.trim().toLowerCase();
  const correct = exercises[currentExercise].answer.toLowerCase();

  const feedback = document.getElementById("exerciseFeedback");
  if (isCorrect(input, correct)) {
    feedback.innerHTML = "<span style='color: green;'>✅ Correct!</span>";
  } else {
    feedback.innerHTML = `<span style='color: red;'>❌ Incorrect. Correct: ${correct}</span>`;
  }

  setTimeout(() => {
    if (currentExercise < exercises.length - 1) {
      currentExercise++;
      renderExercise();
    }
  }, 1000);
}

function prevExercise() {
  if (currentExercise > 0) {
    currentExercise--;
    renderExercise();
  }
}

// Fuzzy match
function isCorrect(userInput, correctAnswer) {
  const normalize = (str) => str
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ß/g, "ss")
    .replace(/\s+/g, " ") // normalize spaces
    .trim();

  return normalize(userInput) === normalize(correctAnswer);
}

function speakGerman(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE"; // German voice
  speechSynthesis.speak(utterance);
}




