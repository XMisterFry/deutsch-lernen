let current = 0;
let slides = [];
let exercises = [];
let currentExercise = 0;




async function loadLesson(lessonId) {
  if (lessonId) {
    localStorage.setItem("lastLesson", lessonId); // ✅ Save to localStorage
  } else {
    lessonId = localStorage.getItem("lastLesson"); // ✅ Use saved lesson if none passed
  }

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
    document.getElementById("lessonSelect").value = lessonId; // Update dropdown UI
  } catch (err) {
    container.innerHTML = "<p>Error loading lesson.</p>";
  }
}

function renderSlide() {
  const container = document.getElementById("lessonDisplay");
  const slide = slides[current];

  let html = `<div class="slide active">`;

  // We only need to handle text slides now
  if (slide.type === "text") {
    html += `<p>${slide.content.replace(/\n/g, '<br>')}</p>`;
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

function renderExercise() {
  const container = document.getElementById("exerciseContainer");
  const ex = exercises[currentExercise];

  let optionsHTML = "";
  if (ex.options && ex.options.length > 0) {
    optionsHTML = `
      <div class="exercise-options" style="margin-bottom: 10px;">
        ${ex.options.map(opt => `
          <button class="option-btn" onclick="document.getElementById('exerciseInput').value='${opt}'">${opt}</button>
        `).join("")}
      </div>
    `;
  }

  container.innerHTML = `
    <h2 style="margin-bottom: 1rem;">
      ✍️ Lesson Exercise
    </h2>

    <div class="exercise-slide">
      <p><strong>Exercise ${currentExercise + 1}:</strong> ${ex.question}</p>

      ${optionsHTML}

      <input type="text" id="exerciseInput" placeholder="Type your answer here" />
      <div id="exerciseFeedback" class="feedback" style="margin-top: 10px;"></div>

      <div class="nav-buttons">
        <button onclick="prevExercise()" ${currentExercise === 0 ? 'disabled' : ''}>Previous</button>
        <button id="actionButton" onclick="submitOrNext()">Show Answer</button>
      </div>
    </div>
  `;
}

function submitOrNext() {
  const feedback = document.getElementById("exerciseFeedback");
  const correct = exercises[currentExercise].answer;

  const button = document.getElementById("actionButton");

  if (button.textContent === "Show Answer") {
    // Show the correct answer
    feedback.innerHTML = `<span style='color: blue;'>💡 Correct answer: ${correct}</span>`;
    button.textContent = "Next";
  } else {
    // Go to next exercise
    if (currentExercise < exercises.length - 1) {
      currentExercise++;
      renderExercise();
    } else {
      feedback.innerHTML += " 🎉 You've completed all exercises!";
      button.disabled = true;
    }
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




function prevExercise() {
  if (currentExercise > 0) {
    currentExercise--;
    renderExercise();
  }
}



function speakGerman(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE"; // Force German

  const voices = window.speechSynthesis.getVoices();

  // Try to find a German voice manually
  const germanVoice = voices.find(v => v.lang.startsWith("de"));

  if (germanVoice) {
    utterance.voice = germanVoice;
  } else {
    console.warn("German voice not found, using default.");
  }

  window.speechSynthesis.speak(utterance);
  if (speechSynthesis.getVoices().length === 0) {
    speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
  } else {
    setVoiceAndSpeak();
  }

}

window.addEventListener("DOMContentLoaded", () => {
  const savedLesson = localStorage.getItem("lastLesson");
  if (savedLesson) {
    loadLesson(savedLesson); // ✅ Auto load last lesson
  }
});

async function loadDailyWords() {
  try {
    const res = await fetch("words.json");
    const data = await res.json();
    const allWords = data.words;

    const daySeed = new Date().getDate();
    const dailyWords = [];

    for (let i = 0; i < 5; i++) {
      const index = (daySeed * i + i * 7) % allWords.length;
      dailyWords.push(allWords[index]);
    }

    const wordLine = document.getElementById("wordLine");
    wordLine.innerHTML = dailyWords
      .map((item) => `<strong>${item.word}</strong> – ${item.meaning}`)
      .join(" | ");
  } catch (err) {
    console.error("Failed to load daily words:", err);
  }

}

window.addEventListener("DOMContentLoaded", () => {
  loadDailyWords();
});


function goHome() {
  // Clear localStorage
  localStorage.removeItem("lastLesson");

  // Reset dropdown
  document.getElementById("lessonSelect").value = "";

  // Clear slide and exercise containers
  document.getElementById("lessonDisplay").innerHTML = "<p>Please select a lesson.</p>";
  document.getElementById("exerciseContainer").innerHTML = "";

  // Reset internal state if needed
  slides = [];
  current = 0;
  exercises = [];
  currentExercise = 0;
}






