let points = parseInt(localStorage.getItem("points")) || 0;
(function () {
  const maxSum = 10;
  const answerCount = 5;
  const maxAllowedAttempts = 60;

  const getRandomInteger = (highestAllowedValue) =>
    Math.floor(Math.random() * (highestAllowedValue + 1));

  function generateQuestion() {
    const a = getRandomInteger(maxSum);
    const b = getRandomInteger(maxSum - a);
    return { questionText: `${a} + ${b}`, solution: a + b };
  }

  function checkAnswerOverlap(r1, r2) {
    return (
      r1.left < r2.right &&
      r1.right > r2.left &&
      r1.top < r2.bottom &&
      r1.bottom > r2.top
    );
  }

  function placeAnswersAwayFromQuestion(btn) {
    const board = document.getElementById("board");
    const boardRect = board.getBoundingClientRect();
    const questionBox = document
      .getElementById("question")
      .getBoundingClientRect(); // Holen des Begrenzungsrechtecks der Frage

    // Stelle sicher, dass das Element messbar ist (wird vor dem Aufruf angehängt)
    btn.style.visibility = "hidden";

    const existingButtons = Array.from(
      document.querySelectorAll(".answer"), // Holen aller vorhandenen Antwort-Buttons
    )
      .filter((b) => b !== btn) // Ausschließen des aktuellen Buttons
      .map((b) => b.getBoundingClientRect()); // getBoundingClientRect() gibt die Position und Größe eines Elements relativ zum Ansichtsfenster zurück

    const buttonWidth =
      btn.offsetWidth || btn.getBoundingClientRect().width || 80;
    const buttonHeight =
      btn.offsetHeight || btn.getBoundingClientRect().height || 80;

    const maxX = Math.max(boardRect.width - buttonWidth, 0); // 0 bedeutet, dass der Button nicht größer als das Fenster sein darf - wenn ich hier 10 nehme, dann kann der Button 10 Pixel links und rechts über den Rand hinausragen
    const maxY = Math.max(boardRect.height - buttonHeight, 0);

    let x = 0,
      y = 0,
      attempt = 0;

    while (attempt++ < maxAllowedAttempts) {
      x = Math.random() * maxX;
      y = Math.random() * maxY;
      const potentialSolution = {
        left: boardRect.left + x,
        right: boardRect.left + x + buttonWidth, //damit der Button nicht zu weit rechts ist
        top: boardRect.top + y,
        bottom: boardRect.top + y + buttonHeight,
      }; //

      const overlapQuestion = checkAnswerOverlap(
        potentialSolution,
        questionBox,
      );
      const overlapButton = existingButtons.some(
        (
          b, //.some prüft, ob mindestens ein Element im Array die Bedingung erfüllt, in diesem Fall ob es überlappt, alternativ könnte man auch .find verwenden. Der Unterschied ist, dass .some einen booleschen Wert zurückgibt (true/false), während .find das erste Element zurückgibt, das die Bedingung erfüllt, oder undefined, wenn kein solches Element gefunden wird.
        ) => checkAnswerOverlap(potentialSolution, b), // prüft Überlappung mit jedem vorhandenen Button
      );

      if (!overlapQuestion && !overlapButton) break;
    }

    // Fallback: klemmt die Position ins sichtbare Fenster d.h. wenn nach maxAllowedAttempts keine passende Position gefunden wurde, wird der Button irgendwo im sichtbaren Bereich platziert:
    x = Math.min(Math.max(0, x), maxX);
    y = Math.min(Math.max(0, y), maxY);

    btn.style.left = x + "px";
    btn.style.top = y + "px";
    btn.style.visibility = "";
  }

  function shuffle(array) {
    //hier wird das Array mit den potentiellen Antworten gemischt
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function startGame() {
    document.querySelectorAll(".answer").forEach((e) => e.remove());

    const data = generateQuestion();
    const correct = data.solution;

    document.getElementById("question").textContent = data.questionText + " = ";

    const answers = new Set([correct]); // Set speichert nur eindeutige Werte, hier wird die korrekte Antwort als erstes hinzugefügt

    while (answers.size < answerCount) {
      answers.add(getRandomInteger(maxSum));
    } // Solange bis die gewünschte Anzahl an Antworten erreicht ist, werden zufällige Zahlen hinzugefügt

    const shuffledAnswers = Array.from(answers); // Konvertiert das Set in ein Array
    shuffle(shuffledAnswers);

    shuffledAnswers.forEach((value) => {
      // Für jede Antwort wird ein Button erstellt
      const btn = document.createElement("button");
      btn.className = "answer";
      btn.textContent = value;
      board.appendChild(btn);
      placeAnswersAwayFromQuestion(btn);

      btn.onclick = () => {
        if (value === correct) {
          points += 1;
          localStorage.setItem("points", points);
          btn.style.borderColor = "lime";
          btn.style.transition = " border 0.3s ease";
          setTimeout(() => {
            document.getElementById("question").textContent =
              data.questionText + " = " + correct;
          }, 200);

          setTimeout(() => {
            startGame();
          }, 1000);
        } else {
          btn.style.borderColor = "red";
          btn.style.transition = " border 0.3s ease";

          setTimeout(() => {
            btn.remove();
          }, 500);
        }
      };
    });
  }

  window.onload = startGame;
  const backButton = document.getElementById("backBtn");
  backButton.onclick = () => {
    window.location.href = "./plusaufgabenauswahl.html";
  };
})();
