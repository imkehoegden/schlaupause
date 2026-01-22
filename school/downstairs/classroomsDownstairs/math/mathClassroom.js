const backButton = document.getElementById("backBtn");
const plusGames = document.getElementById("Plus");
const minusGames = document.getElementById("Minus");
const mengenGames = document.getElementById("Mengen");
const comparisonGame = document.getElementById("Krokodil");

backButton.addEventListener("click", () => {
  window.location.href = "../../mainDownstairs.html";
});

plusGames.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "./Plus/plusaufgabenauswahl.html";
  }, 1000);
});

minusGames.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "./Minus/minusaufgabenauswahl.html";
  }, 1000);
});

mengenGames.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "./Mengen/mengenZuordnen.html";
  }, 1000);
});

comparisonGame.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "./GroesserKleiner/groesserkleiner.html";
  }, 1000);
});
