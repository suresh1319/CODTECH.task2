const startButton = document.getElementById('start-btn');
const quizContent = document.getElementById('quiz-content');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const answersReviewElement = document.getElementById('answers-review');
let shuffledQuestions, currentQuestionIndex;
let score = 0;
let userAnswers = [];
const questions = [
  {
    question: 'Which company developed JavaScript?',
    answers: [
      { text: 'Microsoft', correct: false },
      { text: 'Netscape', correct: true },
      { text: 'Google', correct: false },
      { text: 'IBM', correct: false }
    ]
  },
  {
    question: 'What is the correct syntax to create a function in JavaScript?',
    answers: [
      { text: 'function myFunction()', correct: true },
      { text: 'def myFunction()', correct: false },
      { text: 'function:myFunction()', correct: false },
      { text: 'create function myFunction()', correct: false }
    ]
  },
  {
    question: 'Which operator is used to compare values and types in JavaScript?',
    answers: [
      { text: '==', correct: false },
      { text: '===', correct: true },
      { text: '!=', correct: false },
      { text: '<=>', correct: false }
    ]
  }
];
startButton.addEventListener('click', startQuiz);
function startQuiz() {
  startButton.classList.add('hidden');
  resultContainer.classList.add('hidden');
  quizContent.classList.remove('hidden');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  setNextQuestion();
}
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer));
    answerButtonsElement.appendChild(button);
  });
}
function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
function selectAnswer(answer) {
  userAnswers.push({
    question: shuffledQuestions[currentQuestionIndex].question,
    selected: answer.text,
    correctAnswer: shuffledQuestions[currentQuestionIndex].answers.find(a => a.correct).text,
    isCorrect: answer.correct
  });
  if (answer.correct) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    setNextQuestion();
  } else {
    showResult();
  }
}
function showResult() {
  quizContent.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  scoreElement.innerText = `${score} / ${questions.length}`;
  answersReviewElement.innerHTML = '';
  userAnswers.forEach(answer => {
    const answerReview = document.createElement('div');
    answerReview.classList.add('answer-review');
    const questionElement = document.createElement('p');
    questionElement.innerText = `Q: ${answer.question}`;
    answerReview.appendChild(questionElement);
    const selectedAnswerElement = document.createElement('p');
    selectedAnswerElement.innerText = `Your Answer: ${answer.selected}`;
    selectedAnswerElement.classList.add(answer.isCorrect ? 'correct' : 'wrong');
    answerReview.appendChild(selectedAnswerElement);
    const correctAnswerElement = document.createElement('p');
    correctAnswerElement.innerText = `Correct Answer: ${answer.correctAnswer}`;
    correctAnswerElement.classList.add('correct');
    answerReview.appendChild(correctAnswerElement);
    answersReviewElement.appendChild(answerReview);
  });
  startButton.innerText = 'Restart Quiz';
  startButton.classList.remove('hidden');
}
