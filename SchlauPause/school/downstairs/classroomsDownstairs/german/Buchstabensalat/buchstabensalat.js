// Wörter festlegen

const words = [
  { letters: ["B", "L", "U", "M", "E"], word: "BLUME", icon: "🌸" },
  { letters: ["T", "A", "S", "S", "E"], word: "TASSE", icon: "☕" },
  { letters: ["F", "I", "S", "C", "H"], word: "FISCH", icon: "🐟" },
  { letters: ["Z", "E", "B", "R", "A"], word: "ZEBRA", icon: "🦓" },
  { letters: ["S", "C", "H", "A", "F"], word: "SCHAF", icon: "🐑" },
  { letters: ["V", "O", "G", "E", "L"], word: "VOGEL", icon: "🐦" },
  { letters: ["K", "A", "T", "Z", "E"], word: "KATZE", icon: "🐱" },
  { letters: ["A", "P", "F", "E", "L"], word: "APFEL", icon: "🍎" },
  { letters: ["H", "O", "N", "I", "G"], word: "HONIG", icon: "🍯" },
  { letters: ["R", "E", "G", "A", "L"], word: "REGAL", icon: "🗄️" },
  { letters: ["K", "U", "G", "E", "L"], word: "KUGEL", icon: "⚽" },
  { letters: ["R", "A", "D", "I", "O"], word: "RADIO", icon: "📻" },
  { letters: ["W", "O", "L", "K", "E"], word: "WOLKE", icon: "☁️" },
  { letters: ["S", "T", "U", "H", "L"], word: "STUHL", icon: "🪑" },
];

// DOM Elemente holen
const lettersContainer = document.querySelector(".salad-letters");
const wordIcon = document.querySelector(".word-icon");
const wordSolution = document.querySelector(".word-solution");
const undoBtn = document.getElementById("undo-btn");
const letterSlots = [
  document.getElementById("letter-1"),
  document.getElementById("letter-2"),
  document.getElementById("letter-3"),
  document.getElementById("letter-4"),
  document.getElementById("letter-5"),
];

// Funktion 1: wähle random Wort aus wordsArray aus

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Funktion 2: mische die Buchstaben
function shuffleLetters(array) {
  const letters = [...array]; // kopiert Array, damit Original unverändert bleibt

  for (let i = letters.length - 1; i > 0; i--) {
    // Schleife von letztem Buchstaben bis zum zweiten
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]]; // Buchstaben tauschen
  }

  return letters;
}

// Variablen für den Spielzustand

let currentWordObject = getRandomWord();
let currentWord = currentWordObject.letters;
let saladLetters = shuffleLetters(currentWord);
let currentLetterStack = []; // neues Array für das Wort, dass das Kind gerade legt

// console.log("Aktuelles Wort:", currentWord);
// console.log("Salatbowl:", saladLetters);

// Funktion 3: Buchstaben in Salatbowl anzeigen, also DOM-Elemente für einzelne Buchstaben erzeugen

function showWordInBowl(letters) {
  lettersContainer.innerHTML = ""; // zuerst leerer Ziel-Container

  wordIcon.textContent = currentWordObject.icon;

  letters.forEach((letter) => {
    // DOM-Elemente erstellen
    const letterSpan = document.createElement("span");
    letterSpan.textContent = letter;
    letterSpan.classList.add("single-letter");

    letterSpan.addEventListener("click", () => {
      if (currentLetterStack.length > currentWord.length) return;

      currentLetterStack.push(letter);
      updateSolutionSlots();
      letterSpan.remove();

      if (currentLetterStack.length === currentWord.length) {
        checkSolutionAndGiveFeedback();
      }
    });

    lettersContainer.appendChild(letterSpan);
  });
}

// Funktion 4: Wort überprüfen, ob richtig oder falsch

function checkSolutionAndGiveFeedback() {
  const playerWord = currentLetterStack.join("");
  const correctWord = currentWord.join("");

  if (playerWord === correctWord) {
    letterSlots.forEach((slot) => {
      slot.style.backgroundColor = "#a8e6a3";
    });
    setTimeout(showNextWord, 1000);
  } else {
    letterSlots.forEach((slot) => {
      /*slot.style.backgroundColor = "#f6b1e5";*/
      letterSlots.forEach((slot) => {
        slot.classList.add("shake");
      });

      // shake-Klasse nach Animation wieder entfernen
      setTimeout(() => {
        letterSlots.forEach((slot) => slot.classList.remove("shake"));
      }, 500);
    });
  }
}

// Funktion 5: Slots des Lösungswort aktualisieren

function updateSolutionSlots() {
  letterSlots.forEach((slot, index) => {
    slot.textContent = currentLetterStack[index] || "_";
    slot.style.backgroundColor = "";
  });
}

// Funktion 6: neues Wort anzeigen
function showNextWord() {
  currentWordObject = getRandomWord();
  currentWord = currentWordObject.letters;
  saladLetters = shuffleLetters(currentWord);
  currentLetterStack = [];
  updateSolutionSlots();
  showWordInBowl(saladLetters);
}

// Eventlistener

undoBtn.addEventListener("click", () => {
  if (currentLetterStack.length === 0) return; // es ist nichts mehr zu tun :). der Stapel ist leer

  const lastLetter = currentLetterStack.pop(); // letzten Buchstaben entfernen
  updateSolutionSlots();

  // Buchstabe zurück in die Salatschüssel
  const letterSpan = document.createElement("span");
  letterSpan.textContent = lastLetter;
  letterSpan.classList.add("single-letter");

  // Wieder Klick-Funktion hinzufügen
  letterSpan.addEventListener("click", () => {
    currentLetterStack.push(lastLetter);
    updateSolutionSlots();

    letterSpan.remove();
    if (currentLetterStack.length === currentWord.length) {
      checkSolutionAndGiveFeedback();
    }
  });

  lettersContainer.appendChild(letterSpan);
  console.log("Buchstabe wurde entfernt");
});

updateSolutionSlots();
showWordInBowl(saladLetters);
