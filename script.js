// Klasse für Fragen, Inhalt: Text (also die Frage), Antwortmöglichkeiten, richtige Antwort, Gewinnsumme
class Question {
  constructor(text, choices, correctAnswer, euro) {
    this.text = text;
    this.choices = choices;
    this.correctAnswer = correctAnswer;
    this.euro = euro;
  }

  isCorrect(answer) {
    return this.correctAnswer === answer;
  }
}

// Array mit Fragen, Inhalt: Fragen, Antwortmöglichkeiten, richtige Antwort, Gewinnsumme (basierend auf der Klasse Question)
const questions = [
  new Question(
    "Wie kann man in JavaScript eine Variable definieren, die später nicht mehr verändert werden kann?",
    ["const", "let", "var", "variable"],
    "const",
    50
  ),
  new Question(
    "Wie kann man mit JavaScript eine Zahl auf die nächste ganze Zahl abrunden?",
    ["Math.round()", "Math.floor()", "Math.ceil()", "Math.random()"],
    "Math.floor()",
    100
  ),
  new Question(
    "Welcher der folgenden Datentypen ist kein primitiver Datentyp?",
    ["string", "method", "number", "boolean"],
    "method",
    200
  ),
  new Question(
    "Woran erkennt man einen String in JavaScript?",
    [
      "Er ist in Anführungszeichen geschrieben",
      "Er ist in eckigen Klammern geschrieben",
      "Er ist in geschweiften Klammern geschrieben",
      "Er ist in runden Klammern geschrieben",
    ],
    "Er ist in Anführungszeichen geschrieben",
    300
  ),
  new Question(
    "Was ist das Ergebnis von typeOf([1, 2, false, 8])?",
    ["array", "object", "string", "number"],
    "object",
    500
  ),
  new Question(
    "Welche Methode wird verwendet, um das letzte Element aus einem Array zu entfernen?",
    ["pop()", "shift()", "push()", "unshift()"],
    "pop()",
    1000
  ),
  new Question(
    "Welcher dieser for loop Codeausschnitte iteriert genau 10 mal?",
    [
      "for (let i = 0; i > 10; i--)",
      "for (let i = 0; i < 10; i++)",
      "for (let i = 0; i < 10; i--)",
      "for (let i = 0; i > 10; i++)",
    ],
    "for (let i = 0; i < 10; i++)",
    2000
  ),

  new Question(
    "Welche dieser for loop Arten existiert nicht?",
    ["for...of", "for...in", "for...every", "for...each"],
    "for...every",
    4000
  ),
  new Question(
    "Wie lautet der Fachbegriff dafür, JavaScript Elemente im HTML Dokument zu manipulieren, um sie im Browser anzeigen zu lassen?",
    [
      "HTML manipulation",
      "CSS manipulation",
      "DOM manipulation",
      "JavaScript manipulation",
    ],
    "DOM manipulation",
    8000
  ),
  new Question(
    "Wie lautet das Ergebnis der folgenden ausgeführten Funktion: function mod(a, b) { return a % b; } ... console.log(mod(5, 2));",
    ["1", "2", "3", "4"],
    "1",
    16000
  ),
  new Question(
    "Welche dieser Array Methoden fasst ein Array in einem einzigen Ergebnis zusammen?",
    ["map()", "reduce()", "filter()", "forEach()"],
    "reduce()",
    32000
  ),
  new Question(
    "Mit welcher der folgenden Antworten kann man KEINE Funktion deklarieren?",
    [
      "function myFunction() {}",
      "const myFunction = function() {}",
      "const myFunction = () => {}",
      "const myFunction = []",
    ],
    "const myFunction = []",
    64000
  ),
  new Question(
    "Welche dieser Eigenschaften muss eine pure Funktion erfüllen, um als pure Funktion zu gelten?",
    [
      "Sie darf keinen Rückgabewert haben",
      "Sie darf keine Parameter haben",
      "Sie darf keine Seiteneffekte haben",
      "Sie darf keine Variablen definieren",
    ],
    "Sie darf keine Seiteneffekte haben",
    125000
  ),
  new Question(
    "Ein Array aus Zahlen soll absteigend sortiert werden. Welche der folgenden Methoden ist dafür am besten geeignet?",
    ["sort()", "reverse()", "sort().reverse()", "sort((a, b) => b - a)"],
    "sort((a, b) => b - a)",
    500000
  ),
  new Question(
    "Gegeben ist ein Array aus Zahlen: const numbers = [1, 2, 3, 4, 5]. Wie kann man eine Funktion mit dem Namen doubleAndFilter erstellen, welche jedes Element im Array verdoppelt und dann nur die Zahlen zurückgibt, die größer als 5 sind?",
    [
      "const doubleAndFilter = numbers.map(num => num * 2).filter(num => num > 5)",
      "const doubleAndFilter = numbers.filter(num => num > 5).map(num => num * 2)",
      "const doubleAndFilter = numbers.map(num => num * 2).filter(num => num < 5)",
      "const doubleAndFilter = numbers.filter(num => num < 5).map(num => num * 2)",
    ],
    "const doubleAndFilter = numbers.filter(num => num > 5).map(num => num * 2)",
    1000000
  ),
];

// Variablen für HTML Elemente
// Funktionsweise: HTML Elemente werden in Variablen gespeichert, um sie später im Code wieder zu verwenden
const quizContainer = document.getElementById("quiz-container");
const euroElement = document.getElementById("euro");
const submitButton = document.getElementById("submitButton");
const nextButton = document.getElementById("nextButton");
const messageElement = document.getElementById("message");
const timerElement = document.getElementById("timer");
const newGameButton = document.getElementById("newGameButton");

let currentQuestionIndex = 0;
let euro = 0;
let timer;

// Funktion, die die Fragen aufbaut
// Funktionsweise: Die Funktion baut die Fragen auf, indem sie die Fragen aus dem Array questions nimmt und in HTML Elemente umwandelt
function buildQuiz() {
  const question = questions[currentQuestionIndex];
  const questionElement = document.createElement("div");
  questionElement.innerHTML = `
    <p><strong>Frage für ${question.euro} Euro:</strong> ${question.text}</p>
    <ul style="list-style-type: none;"> <!-- Veränderte Zeile -->
      ${question.choices
        .map(
          (choice, index) =>
            `<li><input type="radio" name="q" value="${choice}"> <strong>${String.fromCharCode(
              65 + index
            )}</strong>: ${choice}</li>`
        )
        .join("")}
    </ul>
  `;
  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);

  submitButton.style.display = "block";
  nextButton.style.display = "none";
  newGameButton.style.display = "none";
  startTimer();
}

// Funktionen für den Submit Button
// Funktionsweise: Die Funktionen prüfen, ob eine Antwort ausgewählt wurde und ob diese richtig ist. Wenn die Antwort richtig ist, wird die Gewinnsumme aktualisiert und der Next Button angezeigt. Wenn die Antwort falsch ist, wird die Gewinnsumme angezeigt und der New Game Button angezeigt.
function submitAnswer() {
  const selectedAnswer = document.querySelector('input[name="q"]:checked');
  if (selectedAnswer) {
    stopTimer(); // Stopp den Timer nur, wenn eine Antwort ausgewählt wurde
    const answer = selectedAnswer.value;
    const question = questions[currentQuestionIndex];
    if (question.isCorrect(answer)) {
      euro = question.euro;
      euroElement.textContent = euro;
      submitButton.style.display = "none";
      nextButton.style.display = "block";
      showMessage(`Richtige Antwort! Du hast ${euro} Euro gewonnen.`);
    } else {
      showMessage(
        `Falsche Antwort. Die richtige Antwort wäre gewesen: ${question.correctAnswer}. Das Spiel ist beendet und du hast ${euro} Euro gewonnen.`
      );
      showCorrectAnswer();
      showNewGameButton();
      submitButton.style.display = "none";
    }
  } else {
    showMessage("Bitte wähle eine Antwort aus!");
  }
}

function showCorrectAnswer() {
  const question = questions[currentQuestionIndex];
  const choices = document.querySelectorAll('input[name="q"]');
  choices.forEach((choice) => {
    const label = choice.parentElement;
    if (choice.value === question.correctAnswer) {
      label.style.color = "green"; // Richtige Antwort in grün anzeigen
    } else if (choice.checked) {
      label.style.color = "red"; // Falsche Antwort in rot anzeigen
    }
  });
}

function resetAnswerStyles() {
  const choices = document.querySelectorAll('input[name="q"]');
  choices.forEach((choice) => {
    const label = choice.parentElement;
    label.style.color = ""; // Zurücksetzen auf Standardfarbe
  });
}

// Funktionen für den Next Button
// Funktionsweise: Die Funktionen erhöhen den Index der aktuellen Frage und prüfen, ob es noch weitere Fragen gibt. Wenn es noch weitere Fragen gibt, wird die nächste Frage aufgebaut und die Nachricht ausgeblendet. Wenn es keine weiteren Fragen gibt, wird die Nachricht angezeigt und der New Game Button angezeigt.
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    buildQuiz();
    hideMessage();
  } else {
    showMessage(`Herzlichen Glückwunsch! Du hast ${euro} Euro gewonnen!`);
    showNewGameButton();
  }
}

// Funktionen für den New Game Button
// Funktionsweise: Die Funktionen setzen den Index der aktuellen Frage und die Gewinnsumme zurück, bauen die Fragen neu auf und blenden den New Game Button aus.
function resetGame() {
  currentQuestionIndex = 0;
  euro = 0;
  buildQuiz();
  hideNewGameButton();
  resetAnswerStyles();
  location.reload();
}

function showMessage(text) {
  messageElement.textContent = text;
}

function hideMessage() {
  messageElement.textContent = "";
}

function showNewGameButton() {
  newGameButton.style.display = "block";
}

function hideNewGameButton() {
  newGameButton.style.display = "none";
}

// Funktionen für den Timer
// Funktionsweise: Die Funktionen starten und stoppen den Timer, der die Zeit für die Beantwortung der Fragen misst.
function startTimer() {
  let timeLeft = 30;
  timer = setInterval(() => {
    timerElement.textContent = `Timer: ${timeLeft}s`;
    if (timeLeft <= 0) {
      showMessage("Die Zeit ist abgelaufen, du hast verloren!");
      stopTimer();
      showNewGameButton();
      submitButton.style.display = "none";
    }
    timeLeft--;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timerElement.textContent = "";
}

// Beim Laden der Seite wird die Funktion buildQuiz ausgeführt, um die Fragen aufzubauen
buildQuiz();
