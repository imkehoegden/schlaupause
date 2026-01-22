const words = [
  { icon: "🍎", name: "Apfel" },
  { icon: "🐶", name: "Hund" },
  { icon: "🐱", name: "Katze" },
  { icon: "🍊", name: "Orange" },
  { icon: "🌞", name: "Sonne" },
  { icon: "🌳", name: "Baum" },
  { icon: "🐟", name: "Fisch" },
  { icon: "🍌", name: "Banane" },
  { icon: "🏠", name: "Haus" },
  { icon: "🦁", name: "Löwe" },
  { icon: "🐰", name: "Hase" },
  { icon: "🚲", name: "Fahrrad" },
  { icon: "🐸", name: "Frosch" },
  { icon: "🌷", name: "Tulpe" },
  { icon: "🍇", name: "Traube" },
  { icon: "🦆", name: "Ente" },
  { icon: "🍓", name: "Erdbeere" },
  { icon: "🌊", name: "Welle" },
  { icon: "🚀", name: "Rakete" },
  { icon: "🛵", name: "Roller" },
  { icon: "🐝", name: "Biene" },
  { icon: "🦀", name: "Krabbe" },
  { icon: "🌻", name: "Sonnenblume" },
  { icon: "🦊", name: "Fuchs" },
  { icon: "🍒", name: "Kirsche" },
  { icon: "🥕", name: "Karotte" },
  { icon: "🦓", name: "Zebra" },
  { icon: "🐧", name: "Pinguin" },
  { icon: "🐬", name: "Delfin" },
  { icon: "🍉", name: "Wassermelone" },
  { icon: "🌵", name: "Kaktus" },
  { icon: "🦔", name: "Igel" },
  { icon: "🥑", name: "Avocado" },
  { icon: "🍋", name: "Zitrone" },
  { icon: "🐒", name: "Affe" },
  { icon: "🍍", name: "Ananas" },
  { icon: "🥝", name: "Kiwi" },
  { icon: "🐳", name: "Wal" },
  { icon: "🐓", name: "Hahn" },
  { icon: "🌽", name: "Mais" },
  { icon: "🥔", name: "Kartoffel" },
  { icon: "🦜", name: "Papagei" },
  { icon: "🥦", name: "Brokkoli" },
  { icon: "🐘", name: "Elefant" },
  { icon: "🍕", name: "Pizza" },
  { icon: "🍿", name: "Popcorn" },
];

function placeButtonAwayFromQuestion(btn) {
  const board = document.getElementById("board");
  const boardBox = board.getBoundingClientRect();
  const questionBox = document
    .getElementById("question")
    .getBoundingClientRect();

  const bw = 80;
  const bh = 80;

  let x,
    y,
    safe = false;

  const existingButtons = Array.from(board.querySelectorAll(".answer")).map(
    (b) => b.getBoundingClientRect(),
  );

  while (!safe) {
    x = Math.random() * (boardBox.width - bw - 10);
    y = Math.random() * (boardBox.height - bh);

    const absX = boardBox.left + x;
    const absY = boardBox.top + y;

    const overlapQuestion =
      absX < questionBox.right &&
      absX + bw > questionBox.left &&
      absY < questionBox.bottom &&
      absY + bh > questionBox.top;

    const overlapButton = existingButtons.some(
      (b) =>
        absX < b.right &&
        absX + bw > b.left &&
        absY < b.bottom &&
        absY + bh > b.top,
    );

    if (!overlapQuestion && !overlapButton) safe = true;
  }

  btn.style.left = x + "px";
  btn.style.top = y + "px";
}

function startGame() {
  document.querySelectorAll(".answer").forEach((e) => e.remove());

  const word = words[Math.floor(Math.random() * words.length)];
  const correctLetter = word.name[0].toUpperCase();

  document.getElementById("icon").textContent = word.icon;
  document.getElementById("word").textContent = "";

  const letters = new Set([correctLetter]);

  while (letters.size < 5) {
    letters.add(String.fromCharCode(65 + Math.floor(Math.random() * 26)));
  }

  [...letters]
    .sort(() => Math.random() - 0.5)
    .forEach((letter) => {
      const btn = document.createElement("button");
      btn.className = "answer";
      btn.textContent = letter;

      placeButtonAwayFromQuestion(btn);

      btn.onclick = () => {
        if (letter === correctLetter) {
          let points = parseInt(localStorage.getItem("points")) || 0;
          points += 1;
          localStorage.setItem("points", points);
          btn.style.borderColor = "lime";
          btn.style.transition = " border 0.3s ease";
          setTimeout(() => {
            document.getElementById("word").textContent = word.name;
            document.getElementById("word").style.color = "white";
          }, 200);

          setTimeout(() => {
            startGame();
          }, 3000);
        } else {
          btn.style.borderColor = "red";
          btn.style.transition = " border 0.3s ease";

          setTimeout(() => {
            btn.remove();
          }, 500);
        }
      };

      board.appendChild(btn);
    });
}

window.onload = startGame;
const backButton = document.getElementById("backBtn");
backButton.onclick = () => {
  window.location.href = "../germanClassroom.html";
};
