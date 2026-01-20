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
const backButton = document.getElementById("backBtn");

const numbersContainer = document.querySelector(".numbers-container");

const leftNumberContainer = document.getElementById("left-number");
const rightNumberContainer = document.getElementById("right-number");
const comparisonSignContainer = document.getElementById("comparison-sign");

const greaterButton = document.getElementById("greater-btn");
const lessButton = document.getElementById("less-btn");
const equalButton = document.getElementById("equal-btn");

// Variablen für Spielzustand
let kidSelectedSign;
let currentNumberPair = getRandomNumberPair();

// Funktion 1: Nummern-Paar aus numbersArray holen
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
  numberLeftSpan.classList.add("number-span");
  leftNumberContainer.appendChild(numberLeftSpan);

  const numberRightSpan = document.createElement("span");
  numberRightSpan.textContent = numberRight;
  numberLeftSpan.classList.add("number-span");
  rightNumberContainer.appendChild(numberRightSpan);

  if ((comparisonSignContainer.textContent = ">" || "<" || "=")) {
    setTimeout(checkKidSolutionAndGiveFeedback, 1000);
  }
}

// Funktion 3: Lösung des Kindes überprüfen, ob richtig oder falsch
function checkKidSolutionAndGiveFeedback() {
  if (
    (currentNumberPair.left > currentNumberPair.right &&
      kidSelectedSign === ">") ||
    (currentNumberPair.left < currentNumberPair.right &&
      kidSelectedSign === "<") ||
    (currentNumberPair.left === currentNumberPair.right &&
      kidSelectedSign === "=")
  ) {
    leftNumberContainer.style.backgroundColor = "#a8e6a3";
    rightNumberContainer.style.backgroundColor = "#a8e6a3";
    comparisonSignContainer.style.backgroundColor = "#a8e6a3";
    setTimeout(showNextNumberPair, 1000);
  } else {
    numbersContainer.classList.add("shake");
  }
  setTimeout(numbersContainer.classList.remove("shake"), 1000);
}

// Funktion 4: neues Nummern-Paar anzeigen
function showNextNumberPair() {
  currentNumberPair = getRandomNumberPair();
  showNumberPair();
}

showNumberPair();

// Eventlistener für Buttons
greaterButton.addEventListener("click", () => {
  comparisonSignContainer.textContent = ">";
});
lessButton.addEventListener("click", () => {
  comparisonSignContainer.textContent = "<";
});
equalButton.addEventListener("click", () => {
  comparisonSignContainer.textContent = "=";
});

backButton.onclick = () => {
  window.location.href = "../mathClassroom.html";
};
