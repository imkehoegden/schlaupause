// Wörter festlegen
const words = [
  ["B", "L", "U", "M", "E"],
  ["T", "A", "S", "S", "E"],
  ["F", "I", "S", "C", "H"],
  ["Z", "E", "B", "R", "A"],
  ["S", "C", "H", "A", "F"],
  ["V", "O", "G", "E", "L"],
  ["K", "A", "T", "Z", "E"],
  ["A", "P", "F", "E", "L"],
  ["H", "O", "N", "I", "G"],
  ["R", "E", "G", "A", "L"],
  ["K", "U", "G", "E", "L"],
  ["R", "A", "D", "I", "O"],
  ["W", "O", "L", "K", "E"],
  ["S", "T", "U", "H", "L"],
];

// DOM Elemente holen
const saladBowl = document.querySelector(".salad-bowl");
const lettersContainer = document.querySelector(".salad-bowl .salad-letters");
const wordSol = document.querySelector(".word-solution");
const undoBtn = document.getElementById("undo-btn");
const letterSlots = [
  document.getElementById("letter-1"),
  document.getElementById("letter-2"),
  document.getElementById("letter-3"),
  document.getElementById("letter-4"),
  document.getElementById("letter-5"),
];

// Funktion 1: suche Wort randomly aus wordsArray

function getRandomWord(words) {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Funktion 2: mische die Buchstaben
function shuffleLetters(word) {
  const letters = [...word]; // kopiert Array, damit Original unverändert bleibt

  for (let i = letters.length - 1; i > 0; i--) {
    // Schleife von letztem Buchstaben bis zum zweiten
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]]; // Buchstaben tauschen
  }

  return letters;
}

let currentWord = getRandomWord(words);
let saladLetters = shuffleLetters(currentWord);

console.log("Aktuelles Wort:", currentWord);
console.log("Salatbowl:", saladLetters);

// Funktion 3: Buchstaben in Salatbowl anzeigen, also DOM-Elemente für einzelne Buchstaben erzeugen
let currentLetterStack = []; // neues Array für das Wort, dass das Kind gerade legt

function showWordInBowl(letters) {
  const target = lettersContainer || saladDiv;
  target.innerHTML = ""; // leerer Ziel-Container

  letters.forEach((letter, index) => {
    // DOM-Elemente erstellen
    const letterSpan = document.createElement("span");
    letterSpan.textContent = letter;
    letterSpan.classList.add("single-letter");

    letterSpan.addEventListener("click", () => {
      currentLetterStack.push(letter);
      wordSol.textContent = currentLetterStack.join("");

      if (letterSpan.parentElement)
        letterSpan.parentElement.removeChild(letterSpan);

      if (currentLetterStack.length === currentWord.length) {
        checkSolutionWordAndGiveFeedback();
      }
    });

    target.appendChild(letterSpan);
  });
}

showWordInBowl(saladLetters);

// Funktion 4: Wort überprüfen, ob richtig oder falsch

function checkSolutionWordAndGiveFeedback() {}

// Eventlistener -> Spieler:inneninteraktion
/* SingleLetter.addEventListener("click", () =>
  // falsch, event muss auf buchstaben liegen
  console.log("auf Buchstaben geklickt")
);*/
undoBtn.addEventListener("click", () =>
  console.log("Buchstabe wurde entfernt")
);
// document.addEventListener("DOMContentLoaded", () => console.log("DOM bereit"));
