const words = [
  { letters: ["B", "A", "U", "M"], icon: "🌳" },
  { letters: ["H", "A", "U", "S"], icon: "🏠" },
  { letters: ["S", "C", "H", "U", "L", "E"], icon: "🏫" },
  { letters: ["B", "L", "U", "M", "E"], icon: "🌸" },
  { letters: ["K", "A", "T", "Z", "E"], icon: "🐱" },
  { letters: ["H", "U", "N", "D"], icon: "🐶" },
  { letters: ["V", "O", "G", "E", "L"], icon: "🐦" },
  { letters: ["F", "I", "S", "C", "H"], icon: "🐟" },
  { letters: ["A", "P", "F", "E", "L"], icon: "🍎" },
  { letters: ["B", "A", "N", "A", "N", "E"], icon: "🍌" },
  { letters: ["S", "O", "N", "N", "E"], icon: "☀️" },
  { letters: ["W", "O", "L", "K", "E"], icon: "☁️" },
  { letters: ["S", "T", "U", "H", "L"], icon: "🪑" },
  { letters: ["T", "I", "S", "C", "H"], icon: "🪟" },
  { letters: ["F", "A", "H", "R", "R", "A", "D"], icon: "🚲" },
  { letters: ["A", "U", "T", "O"], icon: "🚗" },
  { letters: ["B", "U", "C", "H"], icon: "📘" },
  { letters: ["U", "H", "R"], icon: "⏰" },
  { letters: ["W", "E", "C", "K", "E", "R"], icon: "⏰" },
  { letters: ["S", "C", "H", "N", "E", "E"], icon: "❄️" },
  { letters: ["R", "E", "G", "E", "N"], icon: "🌧️" },
  { letters: ["F", "E", "U", "E", "R"], icon: "🔥" },
  { letters: ["S", "T", "E", "R", "N"], icon: "⭐" },
  { letters: ["M", "O", "N", "D"], icon: "🌙" },
  { letters: ["Z", "A", "H", "N"], icon: "🦷" },
  { letters: ["F", "E", "D", "E", "R"], icon: "🪶" },
  { letters: ["K", "I", "N", "D"], icon: "🧒" },
  { letters: ["F", "R", "E", "U", "N", "D"], icon: "🤝" },
  { letters: ["H", "E", "R", "Z"], icon: "❤️" },
  { letters: ["K", "O", "F", "F", "E", "R"], icon: "🧳" },
  { letters: ["B", "A", "L", "L"], icon: "⚽" },
  { letters: ["M", "A", "U", "S"], icon: "🐭" },
  { letters: ["E", "I", "S"], icon: "🍦" },
  { letters: ["K", "U", "C", "H", "E", "N"], icon: "🍰" },
  { letters: ["P", "I", "N", "G", "U", "I", "N"], icon: "🐧" },
  { letters: ["T", "O", "R"], icon: "🥅" },
  { letters: ["S", "T", "E", "I", "N"], icon: "🪨" },
  { letters: ["K", "I", "N", "D"], icon: "🧒" },
  { letters: ["B", "L", "A", "T", "T"], icon: "🍃" },
  { letters: ["G", "L", "A", "S"], icon: "🥛" },
  { letters: ["T", "A", "S", "S", "E"], icon: "☕" },
  { letters: ["R", "O", "S", "E"], icon: "🌹" },
  { letters: ["H", "A", "U", "S"], icon: "🏡" },
  { letters: ["F", "E", "N", "S", "T", "E", "R"], icon: "🪟" },
  { letters: ["S", "T", "R", "A", "N", "D"], icon: "🏖️" },
]; //Array mit Wörtern variabler Länge

const bowlLettersContainer = document.querySelector(".salad-letters");
const bowlWordIconContainer = document.querySelector(".salad-word-icon");
const undoButton = document.getElementById("undo-btn");
const solutionWordContainer = document.querySelector(".solution-word");

let currentWordObject = getRandomWord();
let targetWordLetters = currentWordObject.letters;
let shuffledBowlLetters = shuffleLetters(targetWordLetters);
let kidSelectedLetters = [];
let solutionLetterSlots = [];

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function shuffleLetters(lettersArray) {
  const letters = [...lettersArray];
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters;
}

//Hier werden die Lücken für das Lösungswort erstellt, abhängig von der Wortlänge
function createSolutionSlots() {
  solutionWordContainer.innerHTML = "";
  solutionLetterSlots = [];
  for (let i = 0; i < targetWordLetters.length; i++) {
    const slot = document.createElement("span");
    slot.classList.add("solution-slot");
    slot.textContent = "_";
    solutionWordContainer.appendChild(slot);
    solutionLetterSlots.push(slot);
  }
}

function showWordInBowl(letters) {
  bowlLettersContainer.innerHTML = "";
  bowlWordIconContainer.textContent = currentWordObject.icon;

  letters.forEach((letter) => {
    const letterSpan = document.createElement("span");
    letterSpan.textContent = letter;
    letterSpan.classList.add("bowl-letter");

    letterSpan.addEventListener("click", () => {
      kidSelectedLetters.push(letter);
      updateSolutionSlots();
      letterSpan.remove();
      if (kidSelectedLetters.length === targetWordLetters.length) {
        checkKidSolutionAndGiveFeedback();
      }
    });

    bowlLettersContainer.appendChild(letterSpan);
  });
}

// Hier werden die Lücken mit den vom Nutzer ausgewählten Buchstaben aktualisiert
function updateSolutionSlots() {
  solutionLetterSlots.forEach((slot, i) => {
    slot.textContent = kidSelectedLetters[i] || "_";
    slot.style.backgroundColor = "";
  });
}

function checkKidSolutionAndGiveFeedback() {
  const kidWord = kidSelectedLetters.join("");
  const correctWord = targetWordLetters.join("");
  //gleich, aber jetzt dynamisch für variable Wortlänge
  if (kidWord === correctWord) {
    let points = parseInt(localStorage.getItem("points")) || 0;
    points += 1;
    localStorage.setItem("points", points);
    solutionLetterSlots.forEach((slot) => {
      slot.style.backgroundColor = "#a8e6a3";
    });
    setTimeout(showNextWord, 1000);
  } else {
    solutionLetterSlots.forEach((slot) => slot.classList.add("shake"));
    setTimeout(() => {
      solutionLetterSlots.forEach((slot) => slot.classList.remove("shake"));
    }, 500);
  }
}

function showNextWord() {
  currentWordObject = getRandomWord();
  targetWordLetters = currentWordObject.letters;
  shuffledBowlLetters = shuffleLetters(targetWordLetters);
  kidSelectedLetters = [];
  createSolutionSlots(); // Erstellt neue Lücken basierend auf der neuen Wortlänge
  showWordInBowl(shuffledBowlLetters);
}

undoButton.addEventListener("click", () => {
  if (kidSelectedLetters.length === 0) return;

  const lastLetter = kidSelectedLetters.pop();
  updateSolutionSlots();

  const letterSpan = document.createElement("span");
  letterSpan.textContent = lastLetter;
  letterSpan.classList.add("bowl-letter");

  letterSpan.addEventListener("click", () => {
    kidSelectedLetters.push(lastLetter);
    updateSolutionSlots();
    letterSpan.remove();
    if (kidSelectedLetters.length === targetWordLetters.length) {
      checkKidSolutionAndGiveFeedback();
    }
  });

  bowlLettersContainer.appendChild(letterSpan);
});

document.getElementById("backBtn").onclick = () => {
  window.location.href = "./buchstabensalatauswahl.html";
};

createSolutionSlots();
showWordInBowl(shuffledBowlLetters);
