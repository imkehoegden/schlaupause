const door = document.getElementById("door");
const overlayImg = document.querySelector(".overlay-img");
const ball = document.getElementById("ball");

let totalPoints = parseInt(localStorage.getItem("points")) || 0;
const pointsDisplay = document.getElementById("pointsDisplay");
pointsDisplay.textContent = totalPoints;

door.addEventListener("click", (event) => {
  overlayImg.classList.add("active");

  setTimeout(() => {
    window.location.href = "./school/downstairs/mainDownstairs.html";
  }, 1000);
});
function startGame() {
  let points = parseInt(localStorage.getItem("points")) || 0;

  if (points < 10) {
    const pointsDiv = document.getElementById("points");
    pointsDiv.classList.remove("points-error");
    void pointsDiv.offsetWidth; // kann jetzt so oft ausgeführt werden wie gewünscht
    pointsDiv.classList.add("points-error");

    return; // Spiel kann nicht gestartet werden
  }

  // Punkte abziehen
  points -= 10;
  localStorage.setItem("points", points);

  setTimeout(() => {
    window.location.href = "./school/outside/fangDenBall/fangDenBall.html";
  }, 1000);
}

ball.addEventListener("click", (event) => {
  startGame();
});
