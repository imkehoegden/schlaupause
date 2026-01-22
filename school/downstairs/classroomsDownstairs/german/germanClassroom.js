const backButton = document.getElementById("backBtn");
const alphabet = document.getElementById("alphabet");
const bowl = document.getElementById("bowl");
const booklet = document.getElementById("booklet");

backButton.addEventListener("click", () => {
  window.location.href = "../../mainDownstairs.html";
});

alphabet.addEventListener("click", (event) => {
  setTimeout(() => {
    window.location.href = "./Letter/WhichLetterToStart.html";
  }, 1000);
});

bowl.addEventListener("click", (event) => {
  setTimeout(() => {
    window.location.href = "./Buchstabensalat/buchstabensalatauswahl.html";
  }, 1000);
});

booklet.addEventListener("click", (event) => {
  setTimeout(() => {
    window.location.href = "./Storytime/storytime.html";
  }, 1000);
});
