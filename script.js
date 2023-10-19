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

const questions = [
  new Question(
    "Wie kann ich in JavaScript eine Variable definieren, die später nicht mehr verändert werden kann?",
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

const quizContainer = document.getElementById("quiz-container");
const euroElement = document.getElementById("euro");
const submitButton = document.getElementById("submitButton");
const nextButton = document.getElementById("nextButton");
const messageElement = document.getElementById("message");

let currentQuestionIndex = 0;
let euro = 0;

function buildQuiz() {
  const question = questions[currentQuestionIndex];
  const questionElement = document.createElement("div");
  questionElement.innerHTML = `
            <p><strong>Frage für ${question.euro} Euro:</strong> ${
    question.text
  }</p>
            <ul>
              ${question.choices
                .map(
                  (choice) =>
                    `<li><input type="radio" name="q" value="${choice}">${choice}</li>`
                )
                .join("")}
            </ul>
          `;
  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);

  submitButton.style.display = "block";
  nextButton.style.display = "none";
}

function submitAnswer() {
  const selectedAnswer = document.querySelector('input[name="q"]:checked');
  if (selectedAnswer) {
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
        `Falsche Antwort. Das Spiel ist beendet und du hast ${euro} Euro gewonnen.`
      );
      resetGame();
    }
  } else {
    showMessage("Bitte wähle eine Antwort aus!");
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    buildQuiz();
    hideMessage();
  } else {
    showMessage(`Herzlichen Glückwunsch! Du hast ${euro} Euro gewonnen!`);
    resetGame();
  }
}

function resetGame() {
  currentQuestionIndex = 0;
  euro = 0;
  buildQuiz();
}

function showMessage(text) {
  messageElement.textContent = text;
}

function hideMessage() {
  messageElement.textContent = "";
}

buildQuiz();
