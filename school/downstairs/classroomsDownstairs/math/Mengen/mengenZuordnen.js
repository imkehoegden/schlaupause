const icon = "🍎";
const totalApples = 10;

let targetNumber = 0;
let clickedApples = 0;
let checkTimer;
let points = parseInt(localStorage.getItem("points")) || 0;

const removeBtn = document.getElementById("removeBtn");
const board = document.getElementById("board");
const questionDiv = document.getElementById("question");

// --- Zufallszahl 1–10 generieren ---
function generateNumber() {
  targetNumber = Math.floor(Math.random() * 10) + 1;
  clickedApples = 0;
  updateQuestion();
}

// --- Überlappung prüfen ---
function isOverlap(r1, r2) {
  return !(
    r1.right < r2.left ||
    r1.left > r2.right ||
    r1.bottom < r2.top ||
    r1.top > r2.bottom
  );
}

// --- Buttons zufällig platzieren (ohne Überlappung) ---
function generateButtons() {
  document.querySelectorAll(".apple-btn").forEach((b) => b.remove());

  const existingRects = [];
  const boardRect = board.getBoundingClientRect();
  const qRect = questionDiv.getBoundingClientRect();
  const removeRect = removeBtn.getBoundingClientRect();

  for (let i = 0; i < totalApples; i++) {
    const btn = document.createElement("button");
    btn.className = "apple-btn";
    btn.textContent = icon;
    btn.style.position = "absolute";

    let x, y, rect;
    let attempts = 0;

    while (attempts++ < 200) {
      x = Math.random() * (boardRect.width - 60);
      y = Math.random() * (boardRect.height - 60);

      rect = {
        left: boardRect.left + x,
        top: boardRect.top + y,
        right: boardRect.left + x + 60,
        bottom: boardRect.top + y + 60,
      };

      const overlaps =
        existingRects.some((r) => isOverlap(r, rect)) ||
        isOverlap(rect, qRect) ||
        isOverlap(rect, removeRect);

      if (!overlaps) break;
    }

    btn.style.left = x + "px";
    btn.style.top = y + "px";

    existingRects.push(rect);

    btn.onclick = () => {
      clickedApples++;
      btn.remove();
      updateQuestion();
      resetCheckTimer();
    };

    board.appendChild(btn);
  }
}

// --- Anzeige aktualisieren ---
function updateQuestion() {
  questionDiv.textContent = targetNumber + " = " + icon.repeat(clickedApples);
}

// --- Grüner Rand bei richtiger Anzahl ---
function greenBorder() {
  questionDiv.style.border = "4px dashed #4CAF50";
  questionDiv.style.borderRadius = "12px";
  setTimeout(() => {
    questionDiv.style.border = "none";
  }, 800);
}

// --- Timer zurücksetzen ---
function resetCheckTimer() {
  if (checkTimer) clearTimeout(checkTimer);

  if (clickedApples === targetNumber) {
    points += 1;
    localStorage.setItem("points", points);

    checkTimer = setTimeout(() => {
      greenBorder();
      setTimeout(startRound, 1000);
    }, 1000);
  }
}

// --- Entfernt einen Apfel ---
function removeApple() {
  if (clickedApples > 0) {
    clickedApples--;
    updateQuestion();
    resetCheckTimer();
  }
}

removeBtn.onclick = removeApple;

// --- Neue Runde starten ---
function startRound() {
  generateNumber();
  generateButtons();
}

// --- Zurück-Button ---
const backButton = document.getElementById("backBtn");
backButton.onclick = () => {
  window.location.href = "../mathClassroom.html";
};

// --- Start ---
window.onload = startRound;
