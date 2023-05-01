let currentQuestion = 0;
let questionAnswered = false;
let rightQuestions = 0;

function init() {
    showCard(currentQuestion);
}

function showCard(currentQuestion) {
    questionAnswered = false;

    let card = document.getElementById('card');
    const question = questions[currentQuestion]['question'];
    const answers = [
        questions[currentQuestion]['answer_1'],
        questions[currentQuestion]['answer_2'],
        questions[currentQuestion]['answer_3'],
        questions[currentQuestion]['answer_4']
    ];
    const length = questions.length;

    // showProgressBar();

    card.innerHTML = '';
    card.innerHTML += generateHTMLCardQuestion(question);
    for (i = 0; i < answers.length; i++) {
        const answerNumber = i + 1;
        const answerString = answers[i];
        card.innerHTML += generateHTMLCardAnswer(answerNumber, answerString);
    };
    card.innerHTML += generateHTMLCardFooter(currentQuestion, length);
}

function answerQuestion(answerNumber) {
    let card = document.getElementById(`answer-${answerNumber}`);
    const right_answer = questions[currentQuestion]['right_answer'];

    if (questionAnswered == false) {
        if (answerNumber == right_answer) {
            card.classList.add('bg-success');
            rightQuestions++;
        } else {
            card.classList.add('bg-danger');
            document.getElementById(`answer-${right_answer}`).classList.add('bg-success');
        }
        blockHoverEffects();
        document.getElementById('next-button').disabled = false;
        showProgressBar();
    }
}

function blockHoverEffects() {
    for (i = 1; i <= 4; i++) {
        document.getElementById(`answer-${i}`).classList.remove('quiz-answer-card');
    }
    questionAnswered = true;
}

function nextQuestion() {
    currentQuestion = currentQuestion + 1
    if (currentQuestion < questions.length) {
        showCard(currentQuestion);
    } else {
        showEndScreen();
    }
}

function showEndScreen() {
    document.getElementById('card-image').src = './img/win.png';
    let card = document.getElementById('card');
    card.innerHTML = '';
    card.innerHTML += generateHTMLCardEndScreen();
}

function showProgressBar() {
    let progress;
    if (questionAnswered == true) {
        progress = Math.round((currentQuestion + 1) / questions.length * 100);
    } else {
        progress = Math.round((currentQuestion) / questions.length * 100);
    }
    document.getElementById('progress-bar').style = `width: ${progress}%`;
    document.getElementById('progress-bar').innerHTML = `${progress}%`;
}

function restartGame() {
    currentQuestion = 0;
    rightQuestions = 0;
    document.getElementById('card-image').src = './img/background.jpg';
    showCard(currentQuestion);
    showProgressBar();
}