// ## Task

// **Exercise**: Create a Simple Quiz Game

// ### Task 1: Create a class named Question to represent a quiz question. The class should have the following features:

// - A constructor that accepts the question text and an array of options.
// - A method to display the question and its options.
// - A method to check if the user's choice is correct.

// ### Task 2: Create instances of the Question class for at least three different quiz questions. Be creative with your questions and options.

// ### Task 3: Implement a way for users to answer the questions. You can use the readline library to take input from the user in the terminal. You can use HTML with DOM manipulation, this is something new for you and a good challenge.

// ### Task 4: After the user answers all the questions, display their results. Show how many questions they answered correctly and how many they got wrong.

// ![solution](solution.gif "solution")

// ## Bonus Task 1

// Add a scoring system to your quiz game. Assign points to each question, and keep track of the user's total score. Display the user's final score at the end.

// ## Bonus Task 2

// Add a timer to your quiz game. Give the user a limited amount of time to answer all questions. If they don't answer in time, consider the not answered questions as wrong.

// ![bonus solution](bonus-solution.gif "bonus solution")

// **_Feel free to get creative and customize the quiz game as you like. Have fun coding and learning!_**

//_______________________________________________________________________________________________________________________

// TASK 1

class Question {
  constructor(question, options) {
    this.question = question;
    this.options = options;
  }

  displayQuestion() {
    console.log(this.question);
    this.options.forEach((option) => {
      console.log(option);
    });
  }

  checkAnswer(answer) {
    if (answer === this.options[0]) {
      console.log("Correct!");
    } else {
      console.log("Wrong answer!");
    }
  }
}

// TASK 2

const question1 = new Question("What is the capital of France?", [
  "Paris",
  "Berlin",
  "London",
]);
const question2 = new Question("What is the capital of Germany?", [
  "Paris",
  "Berlin",
  "London",
]);
const question3 = new Question("What is the capital of England?", [
  "Paris",
  "Berlin",
  "London",
]);

// TASK 3

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("What is the capital of France? ", (answer) => {
  question1.checkAnswer(answer);
  readline.close();
});

readline.question("What is the capital of Germany? ", (answer) => {
  question2.checkAnswer(answer);
  readline.close();
});

readline.question("What is the capital of England? ", (answer) => {
  question3.checkAnswer(answer);
  readline.close();
});



