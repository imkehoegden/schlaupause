const ballImg = document.querySelector(".football-img");
const counterDisplay = document.querySelector(".anzeige-counter");
let gameInterval;
let counter = 150; // entspricht 15 Sekunden Zeit

function startGame() {
  counter = 150; // setzt den Counter auf 15 Sekunden bei jedem Spielstart zurück
  counterDisplay.textContent = Math.ceil(counter / 10);

  gameInterval = setInterval(moveBall, 1000); // ruft jede Sekunde die Funktion moveBall auf

  ballImg.style.left =
    Math.floor(Math.random() * (window.innerWidth - 250)) + "px"; // zufällige Startposition hinzugefügt
  ballImg.style.top =
    Math.floor(Math.random() * (window.innerHeight - 250)) + "px";
}

function moveBall() {
  if (counter === 0) {
    counter = 0;
    counterDisplay.textContent = 0;
    stopGame();
    return; // Spiel beenden, wenn der Counter 0 erreicht. -1 Sekunde verhindern
  }

  const x = Math.random() * (window.innerWidth - 250);
  const y = Math.random() * (window.innerHeight - 250);

  ballImg.style.left = x + "px";
  ballImg.style.top = y + "px";

  counter = counter - 10;
  counterDisplay.textContent = Math.floor(counter / 10); // bei jedem Aufruf wird der Counter um 1 Sekunde verringert
}

function stopGame() {
  clearInterval(gameInterval);

  if (counter === 0) {
    loseShake();
    setTimeout(startGame, 3000);
    // Spiel neu starten
  } else {
    confettiRain();
    setTimeout(startGame, 3000);
  }
}

function confettiRain() {
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 },
  });
}

function loseShake() {
  document.body.classList.add("shake");
  setTimeout(() => {
    document.body.classList.remove("shake");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => startGame());
ballImg.addEventListener("click", stopGame);
