const tales = [
  {
    name: "Die goldene Gans",
    text: "Ein armer Junge findet eine Gans mit goldenen Federn. Er nimmt sie mit nach Hause. Wer die Gans berührt, bleibt daran kleben. Bald kleben viele Menschen an der Gans. Alle lachen über die lustige Parade. Am Ende heiratet der Junge eine Prinzessin. Er wird reich und alle sind froh.",
  },
  {
    name: "Der Froschkönig",
    text: "Eine Prinzessin verliert ihre goldene Kugel in einem Brunnen. Ein Frosch holt sie zurück. Er will dafür ihr Freund sein. Die Prinzessin ist zuerst böse, aber sie hält ihr Versprechen. Sie küsst den Frosch, und er wird ein Prinz. Die Prinzessin und der Prinz sind glücklich. Alle feiern ihre Freundschaft.",
  },
  {
    name: "Hans im Glück",
    text: "Hans bekommt Gold für seine Arbeit. Auf dem Heimweg tauscht er es gegen ein Pferd, dann gegen eine Kuh und ein Schwein. Am Ende hat er nichts mehr. Aber Hans ist glücklich. Er merkt, dass Glück nicht vom Besitz kommt. Auf dem Heimweg singt und tanzt er. Er freut sich über sein freies Leben.",
  },
  {
    name: "König Drosselbart",
    text: "Eine stolze Prinzessin verspottet viele Freier. Ein armer Mann heiratet sie. Anfangs ist sie unglücklich. Dann lernt sie, dass Freundlichkeit wichtig ist. Der Mann ist König Drosselbart. Sie regieren glücklich zusammen. Alle im Volk freuen sich.",
  },
  {
    name: "Frau Holle",
    text: "Ein Mädchen fällt in einen Brunnen und kommt zu Frau Holle. Sie hilft beim Betten schütteln und Aufräumen. Frau Holle belohnt sie mit Gold. Die faule Schwester versucht dasselbe, bekommt aber Pech. Das Mädchen teilt ihr Glück. Alle loben ihre Hilfsbereitschaft.",
  },
  {
    name: "Rotkäppchen",
    text: "Ein Mädchen trägt einen roten Umhang und besucht die Großmutter. Unterwegs trifft sie einen bösen Wolf. Der Wolf frisst die Großmutter und verkleidet sich. Ein Jäger rettet beide. Der Wolf wird besiegt. Rotkäppchen lernt, vorsichtig zu sein.",
  },
  {
    name: "Aschenputtel",
    text: "Ein Mädchen lebt bei einer bösen Stiefmutter. Sie muss alle Hausarbeiten machen. Eine gute Fee hilft ihr auf den Ball zu gehen. Sie verliert den gläsernen Schuh. Der Prinz sucht sie im ganzen Land. Aschenputtel heiratet den Prinzen. Alle feiern das glückliche Ende.",
  },
  {
    name: "Dornröschen",
    text: "Eine Prinzessin wird von einer bösen Fee verflucht. Sie soll sich an einer Spindel stechen. Eine gute Fee mildert den Fluch. Dornröschen schläft hundert Jahre. Ein Prinz küsst sie wach. Sie verlieben sich und sind glücklich. Alle feiern das Ende des Fluchs.",
  },
  {
    name: "Rumpelstilzchen",
    text: "Ein Müller sagt, seine Tochter kann Stroh zu Gold spinnen. Der König verlangt es. Ein kleiner Mann hilft, will aber das Kind später haben. Die Tochter heiratet den König. Um ihr Kind zu behalten, muss sie den Namen des Mannes erraten. Sie erfährt, dass er Rumpelstilzchen heißt. Der Mann verschwindet wütend.",
  },
  {
    name: "Die Bremer Stadtmusikanten",
    text: "Vier alte Tiere fliehen von ihren Besitzern. Sie wollen in Bremen Stadtmusikanten werden. Unterwegs finden sie ein Räuberhaus. Sie stellen sich aufeinander und erschrecken die Räuber. Die Räuber fliehen. Die Tiere leben glücklich zusammen. Sie singen jeden Abend zusammen.",
  },
];

let currentIndex = Math.floor(Math.random() * tales.length);

function showTale(index) {
  currentIndex = index;
  document.getElementById("story").textContent = tales[index].text;
}

function nextRandomTale() {
  if (tales.length <= 1) return;
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * tales.length);
  } while (newIndex === currentIndex);
  showTale(newIndex);
}

showTale(currentIndex);

function checkAnswer() {
  const answerInput = document.getElementById("answer");
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = tales[currentIndex].name.toLowerCase();

  if (userAnswer === correctAnswer) {
    let points = parseInt(localStorage.getItem("points")) || 0;
    points += 1;
    localStorage.setItem("points", points);
    answerInput.style.borderColor = "green";
    // kurze Rückmeldung, dann neue Geschichte zeigen und Eingabe zurücksetzen
    setTimeout(() => {
      nextRandomTale();
      answerInput.value = "";
      answerInput.style.borderColor = "";
    }, 700);
  } else {
    answerInput.style.borderColor = "red";
    setTimeout(() => {
      answerInput.style.borderColor = "";
    }, 700);
  }
}
const checkButton = document.getElementById("checkBtn");
checkButton.onclick = checkAnswer;

const backButton = document.getElementById("backBtn");
backButton.onclick = () => {
  window.location.href = "../germanClassroom.html";
};
