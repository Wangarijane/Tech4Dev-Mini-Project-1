const quizQuestions = [
  {
    question: "1. Which HTTP method is used to retrieve data?",
    answers: { a: "POST", b: "GET", c: "PUT", d: "DELETE" },
    correctAnswer: "b"
  },
  {
    question: "2. Which database is document-oriented?",
    answers: { a: "MySQL", b: "PostgreSQL", c: "MongoDB", d: "Oracle" },
    correctAnswer: "c"
  },
  {
    question: "3. In Node.js, which module creates a server?",
    answers: { a: "http", b: "fs", c: "path", d: "url" },
    correctAnswer: "a"
  },
  {
    question: "4. What does REST stand for?",
    answers: { a: "Representational State Transfer", b: "Random Execution Stack Table", c: "Remote Execution Secure Transfer", d: "Reliable System Transaction" },
    correctAnswer: "a"
  },
  {
    question: "5. Which status code means 'Not Found'?",
    answers: { a: "200", b: "301", c: "404", d: "500" },
    correctAnswer: "c"
  }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quiz");
const nextButton = document.getElementById("next");
const resultsContainer = document.getElementById("results");
const restartButton = document.getElementById("restart");

function showQuestion(index) {
  const question = quizQuestions[index];
  const answers = [];

  for (let letter in question.answers) {
    answers.push(
      `<label>
        <input type="radio" name="question${index}" value="${letter}">
        ${question.answers[letter]}
      </label>`
    );
  }

  quizContainer.innerHTML = `
    <div class="question">${question.question}</div>
    <div class="answers">${answers.join("")}</div>
  `;
}

function showResults() {
  quizContainer.style.display = "none";
  nextButton.style.display = "none";
  restartButton.style.display = "block";

  resultsContainer.innerHTML =
    `✅ You scored <span style="color:#b8860b">${score}</span> out of <span style="color:#b8860b">${quizQuestions.length}</span>`;
}

function checkAnswer() {
  const answerContainer = quizContainer.querySelector(".answers");
  const selector = `input[name=question${currentQuestion}]:checked`;
  const userAnswer = (answerContainer.querySelector(selector) || {}).value;

  if (userAnswer === quizQuestions[currentQuestion].correctAnswer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    showQuestion(currentQuestion);
  } else {
    showResults();
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizContainer.style.display = "block";
  nextButton.style.display = "block";
  restartButton.style.display = "none";
  resultsContainer.innerHTML = "";
  showQuestion(currentQuestion);
}

nextButton.addEventListener("click", checkAnswer);
restartButton.addEventListener("click", restartQuiz);

// Start the quiz
showQuestion(currentQuestion);

