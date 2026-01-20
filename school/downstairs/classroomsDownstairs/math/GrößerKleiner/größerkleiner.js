const numbers = [
  { left: 5, right: 3 },
  { left: 7, right: 9 },
  { left: 4, right: 4 },
  { left: 12, right: 8 },
  { left: 6, right: 10 },
  { left: 15, right: 15 },
  { left: 1, right: 7 },
  { left: 9, right: 2 },
  { left: 11, right: 11 },
  { left: 14, right: 16 },
  { left: 3, right: 3 },
  { left: 8, right: 12 },
  { left: 7, right: 5 },
  { left: 10, right: 10 },
  { left: 6, right: 4 },
  { left: 13, right: 17 },
  { left: 2, right: 2 },
  { left: 18, right: 9 },
  { left: 5, right: 6 },
  { left: 7, right: 7 },
  { left: 12, right: 14 },
  { left: 3, right: 1 },
  { left: 8, right: 8 },
  { left: 9, right: 11 },
  { left: 4, right: 4 },
  { left: 16, right: 13 },
  { left: 2, right: 5 },
  { left: 10, right: 7 },
  { left: 15, right: 15 },
  { left: 6, right: 9 },
];

// DOM Elemente holen
const numbersContainer = document.querySelector(".numbers-container");
const leftNumberContainer = document.getElementById("left-number");
const rightNumberContainer = document.getElementById("right-number");
const greaterButton = document.getElementById("greater-btn");
const lessButton = document.getElementById("less-btn");
const equalButton = document.getElementById("equal-btn");

// Variable für Spielzustand

let kidSelectedSign = "";
let currentNumberPair = getRandomNumberPair();

// Funktion 1: wähle random Nummern-Paar aus numbersArray
function getRandomNumberPair() {
  const randomIndex = Math.floor(Math.random() * numbers.length);
  return numbers[randomIndex];
}

// Funktion 2: Nummern anzeigen, also DOM-Elemente für Zahl links und Zahl rechts erzeugen

function showNumberPair(numberLeft, numberRight) {
  leftNumberContainer.innerHTML = "";
  rightNumberContainer.innerHTML = "";

  numberLeft = currentNumberPair.left;
  numberRight = currentNumberPair.right;

  const numberLeftSpan = document.createElement("span");
  numberLeftSpan.textContent = numberLeft;
  leftNumberContainer.appendChild(numberLeftSpan);

  const numberRightSpan = document.createElement("span");
  numberRightSpan.textContent = numberRight;
  rightNumberContainer.appendChild(numberRightSpan);
}

showNumberPair();
/*
// Funktion 4: Wort überprüfen, ob richtig oder falsch
function checkKidSolutionAndGiveFeedback() {
  const kidWord = kidSelectedLetters.join("");
  const correctWord = targetWordLetters.join("");

  if (kidWord === correctWord) {
    solutionLetterSlots.forEach((slot) => {
      slot.style.backgroundColor = "#a8e6a3"; // hier lieber das Konfetti verwenden oder Umrandung grün färben, wie bei Melas Spiel?
    });
    setTimeout(showNextWord, 1000);
  } else {
    solutionLetterSlots.forEach((slot) => {
      slot.classList.add("shake");
    });

    // Die Shake-Animation wird per Klassenvergabe, also in CSS ausgelöst. Die Klasse muss nach Ablauf entfernt werden, damit die Animation bei einem erneuten Fehler wieder abgespielt werden kann.
    setTimeout(() => {
      solutionLetterSlots.forEach((slot) => slot.classList.remove("shake"));
    }, 500);
  }
}

// Funktion 5: Slots des Lösungsworts aktualisieren
// Synchronisiert die gewählten Buchstaben mit der Darstellung der Lösungsslots
function updateSolutionSlots() {
  solutionLetterSlots.forEach((slot, i) => {
    slot.textContent = kidSelectedLetters[i] || "_";
    slot.style.backgroundColor = "";
  });
}

// Funktion 6: neues Wort anzeigen
function showNextWord() {
  currentWordObject = getRandomWord();
  targetWordLetters = currentWordObject.letters;
  shuffledBowlLetters = shuffleLetters(targetWordLetters);
  kidSelectedLetters = [];
  updateSolutionSlots();
  showWordInBowl(shuffledBowlLetters);
}

// Eventlistener
undoButton.addEventListener("click", () => {
  if (kidSelectedLetters.length === 0) return; // Undo ist nur möglich, wenn mindestens ein Buchstabe gewählt wurde.

  const lastLetter = kidSelectedLetters.pop(); // entfernt letzten Buchstaben des "Stapels" // Array-Methode .pop() entfernt das letzte Element eines Arrays, gibt es zurück, verändert Array also
  updateSolutionSlots();

  // Buchstabe zurück in die Bowl legen
  const letterSpan = document.createElement("span");
  letterSpan.textContent = lastLetter;
  letterSpan.classList.add("bowl-letter");

  // Wieder Klick-Funktion hinzufügen
  letterSpan.addEventListener("click", () => {
    kidSelectedLetters.push(lastLetter);
    updateSolutionSlots();

    letterSpan.remove();
    if (kidSelectedLetters.length === targetWordLetters.length) {
      checkKidSolutionAndGiveFeedback();
    }
  });

  bowlLettersContainer.appendChild(letterSpan);
  // console.log("Buchstabe wurde entfernt");
});

const backButton = document.getElementById("backBtn");
backButton.onclick = () => {
  window.location.href = "./buchstabensalatauswahl.html";
};

updateSolutionSlots();
showWordInBowl(shuffledBowlLetters);*/
