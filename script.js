function switchTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
}

// ✨ Quote on Refresh
window.addEventListener("load", () => {
  const quotes = [
    "You’re doing better than you think. 💖",
    "One step at a time is still progress. 🌱",
    "Your feelings are valid. 🌈",
    "Inhale calm. Exhale stress. 🌬️",
    "You are worthy of love and care. 💫"
  ];
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  const quoteBox = document.createElement("div");
  quoteBox.innerText = random;
  quoteBox.style.textAlign = "center";
  quoteBox.style.marginTop = "1rem";
  quoteBox.style.fontStyle = "italic";
  quoteBox.style.color = "#704c8a";
  document.querySelector(".content").prepend(quoteBox);
});

async function handleSend() {
  const input = document.getElementById("userInput").value.trim();
  const responseBox = document.getElementById("responseBox");

  if (!input) {
    responseBox.innerText = "Please share how your day was 🌿";
    return;
  }

  responseBox.innerText = "Thinking... 🧘‍♀️";

  const reply = await getAmicusReply(input);
  responseBox.innerText = reply;
}

async function getAmicusReply(userMessage) {
  const response = await fetch("https://api.cohere.ai/v1/chat", {
    method: "POST",
    headers: {
      "Authorization": "Bearer RBowPYJmwsoQWruHG2Do3CQrLdckp3M31wdF5KxZ", // 🔑 Replace this line with your Cohere API Key
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "command-r-plus",
      message: userMessage,
      chat_history: [],
      preamble: `You are Amicus, a gentle, empathetic mental wellness companion. When users share how their day was, respond with emotional support, reflect their feelings, and suggest calming actions like journaling, breathing, or affirmations. Never judge or diagnose. Keep your tone warm and human.`
    })
  });

  const data = await response.json();
  return data.text || "I'm here for you. Feel free to share more.";
}

function startBreathingGame() {
  const box = document.getElementById("breathingGame");
  box.innerText = "Inhale...";
  setTimeout(() => box.innerText = "Hold...", 4000);
  setTimeout(() => box.innerText = "Exhale...", 8000);
  setTimeout(() => box.innerText = "Repeat as needed 💜", 12000);
}

function selectMood(color) {
  const calendar = document.getElementById("moodCalendar");
  const date = new Date().toLocaleDateString();
  const entry = document.createElement("div");
  entry.innerText = `${date} - ${color.toUpperCase()}`;
  entry.style.color = color;
  calendar.appendChild(entry);
}

function suggestMovies() {
  const mood = document.getElementById("moodSelect").value;
  const box = document.getElementById("movieSuggestions");
  const movies = {
    red: ["Taare Zameen Par – A warm emotional film about childhood.", "The Pursuit of Happyness – A hopeful story about perseverance."],
    yellow: ["Zindagi Na Milegi Dobara – Light and uplifting.", "The Intern – Fun and feel-good."],
    green: ["3 Idiots – Inspiring and humorous.", "Hidden Figures – A story of brilliance and courage."]
  };
  box.innerHTML = movies[mood].map(m => `<p>🎬 ${m}</p>`).join("");
}

function submitReview() {
  const input = document.getElementById("reviewInput").value;
  const list = document.getElementById("reviewList");
  const item = document.createElement("p");
  item.innerText = input;
  list.appendChild(item);
  document.getElementById("reviewInput").value = "";
}

// 🧠 Quiz Logic
const quizQuestions = [
  { q: "I feel energetic in the mornings.", a: ["Yes", "Sometimes", "No"] },
  { q: "I have trouble falling asleep.", a: ["Often", "Rarely", "Never"] },
  { q: "I talk to someone when I’m upset.", a: ["Always", "Sometimes", "Never"] },
  { q: "I take time to relax each day.", a: ["Yes", "No", "Trying to"] },
  { q: "I feel overwhelmed frequently.", a: ["Yes", "No", "Sometimes"] }
];

let quizIndex = 0;
const quizContainer = document.getElementById("quizContainer");

function renderQuiz() {
  if (quizIndex < quizQuestions.length) {
    const q = quizQuestions[quizIndex];
    quizContainer.innerHTML = `
      <p>${q.q}</p>
      ${q.a.map(ans => `<button onclick="nextQuiz()">${ans}</button>`).join("<br>")}
    `;
  } else {
    quizContainer.innerHTML = "Thanks for completing the quiz! 💖";
    quizIndex = 0;
  }
}

function nextQuiz() {
  quizIndex++;
  renderQuiz();
}

if (quizContainer) renderQuiz();
