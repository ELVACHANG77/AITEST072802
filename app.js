
let quizData = [];
let currentIndex = -1;
let wrongQuestions = [];
let onlyWrong = false;

async function loadQuizData() {
  const response = await fetch('quiz_data.json');
  quizData = await response.json();
  nextQuestion();
}

function showQuestion(index) {
  const q = quizData[index];
  document.getElementById('question-title').textContent = q.question;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  [q.option1, q.option2, q.option3, q.option4].forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i + 1, q);
    optionsDiv.appendChild(btn);
  });
  document.getElementById('result').textContent = '';
}

function checkAnswer(selected, question) {
  const resultDiv = document.getElementById('result');
  if (selected == question.answer) {
    resultDiv.textContent = '✅ 答對了！' + (question.explanation ? ' 解釋：' + question.explanation : '');
  } else {
    resultDiv.textContent = '❌ 答錯了！正確答案是：' + question['option' + question.answer] + (question.explanation ? '。解釋：' + question.explanation : '');
    wrongQuestions.push(question);
  }
}

function nextQuestion() {
  const pool = onlyWrong ? wrongQuestions : quizData;
  if (pool.length === 0) {
    document.getElementById('question-title').textContent = '沒有更多題目了。';
    document.getElementById('options').innerHTML = '';
    return;
  }
  currentIndex = Math.floor(Math.random() * pool.length);
  showQuestion(currentIndex);
}

function toggleWrongMode() {
  onlyWrong = !onlyWrong;
  nextQuestion();
}

loadQuizData();
