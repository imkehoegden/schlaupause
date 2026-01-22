// Wörter festlegen

const words = [
  { letters: ["B", "L", "U", "M", "E"], icon: "🌸" },
  { letters: ["T", "A", "S", "S", "E"], icon: "☕" },
  { letters: ["F", "I", "S", "C", "H"], icon: "🐟" },
  { letters: ["Z", "E", "B", "R", "A"], icon: "🦓" },
  { letters: ["S", "C", "H", "A", "F"], icon: "🐑" },
  { letters: ["V", "O", "G", "E", "L"], icon: "🐦" },
  { letters: ["K", "A", "T", "Z", "E"], icon: "🐱" },
  { letters: ["A", "P", "F", "E", "L"], icon: "🍎" },
  { letters: ["H", "O", "N", "I", "G"], icon: "🍯" },
  { letters: ["R", "E", "G", "A", "L"], icon: "🗄️" },
  { letters: ["K", "U", "G", "E", "L"], icon: "⚽" },
  { letters: ["R", "A", "D", "I", "O"], icon: "📻" },
  { letters: ["W", "O", "L", "K", "E"], icon: "☁️" },
  { letters: ["S", "T", "U", "H", "L"], icon: "🪑" },
]; // evtl. noch mit Varibler Wordlänge?

// DOM Elemente holen
const bowlLettersContainer = document.querySelector(".salad-letters");
const bowlWordIconContainer = document.querySelector(".salad-word-icon");
const undoButton = document.getElementById("undo-btn");
const solutionLetterSlots = [
  document.getElementById("letter-1"),
  document.getElementById("letter-2"),
  document.getElementById("letter-3"),
  document.getElementById("letter-4"),
  document.getElementById("letter-5"),
];

// Variablen für Spielzustand
let currentWordObject = getRandomWord();
let targetWordLetters = currentWordObject.letters;
let shuffledBowlLetters = shuffleLetters(targetWordLetters);
let kidSelectedLetters = []; // neues Array für das Wort, dass das Kind gerade legt

// Funktion 1: wähle random Wort aus wordsArray aus
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Funktion 2: mische die Buchstaben
// Jedes Element wird genau einmal zufällig mit einem vorherigen Element getauscht, um eine gleichmäßige Zufallsverteilung zu garantieren.
function shuffleLetters(lettersArray) {
  const letters = [...lettersArray]; // kopiert Array, damit Original unverändert bleibt

  for (let i = letters.length - 1; i > 0; i--) {
    // Schleife von letztem Buchstaben bis zum zweiten. Iteration rückwärts, um das Fisher-Yates-Prinzip korrekt umzusetzen
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]]; // Buchstaben tauschen
  }

  return letters;
}

// Funktion 3: Buchstaben in Bowl anzeigen, also DOM-Elemente für einzelne Buchstaben erzeugen

function showWordInBowl(letters) {
  bowlLettersContainer.innerHTML = ""; // Vorherige Buchstaben entfernen, damit bei neuem Wort keine alten DOM-Elemente übrig bleiben

  bowlWordIconContainer.textContent = currentWordObject.icon; // Icon in Bowl legen

  letters.forEach((letter) => {
    // DOM-Elemente erstellen
    const letterSpan = document.createElement("span");
    letterSpan.textContent = letter;
    letterSpan.classList.add("bowl-letter");

    letterSpan.addEventListener("click", () => {
      // so können sie in Bowl zurückgeschoben werden
      if (kidSelectedLetters.length > targetWordLetters.length) return; //verhindert, dass mehr Buchstaben als vorgesehen gewählt werden

      kidSelectedLetters.push(letter); // Der gewählte Buchstabe gehört jetzt zum Lösungswort
      updateSolutionSlots(); // Anzeige der Lösungsslots an den aktuellen Zustand anpassen
      letterSpan.remove(); // Ein gewählter Buchstabe darf nicht erneut angeklickt werden

      if (kidSelectedLetters.length === targetWordLetters.length) {
        checkKidSolutionAndGiveFeedback();
      }
    });

    bowlLettersContainer.appendChild(letterSpan);
  });
}

// Funktion 4: Wort überprüfen, ob richtig oder falsch
function checkKidSolutionAndGiveFeedback() {
  const kidWord = kidSelectedLetters.join("");
  const correctWord = targetWordLetters.join("");

  if (kidWord === correctWord) {
    let points = parseInt(localStorage.getItem("points")) || 0;
    points += 1;
    localStorage.setItem("points", points);
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
showWordInBowl(shuffledBowlLetters);
