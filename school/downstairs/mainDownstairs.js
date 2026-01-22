const backButton = document.getElementById("backBtn");
backButton.onclick = () => {
  window.location.href = "../../index.html";
};
const mathdoor = document.getElementById("Mathetür");
const germandoor = document.getElementById("Deutschtür");

const defaultImg = document.getElementById("default");
const mathImg = document.getElementById("math");
const germanImg = document.getElementById("german");

mathdoor.onclick = () => {
  defaultImg.style.opacity = 0;
  germanImg.style.opacity = 0;
  mathImg.style.opacity = 1;
  setTimeout(() => {
    window.location.href = "./classroomsDownstairs/math/mathClassroom.html";
  }, 1000);
};
germandoor.onclick = () => {
  defaultImg.style.opacity = 0;
  mathImg.style.opacity = 0;
  germanImg.style.opacity = 1;
  setTimeout(() => {
    window.location.href = "./classroomsDownstairs/german/germanClassroom.html";
  }, 1000);
};
