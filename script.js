let currentQuestion = 0;

function init() {
    showCard(currentQuestion);
}

function showCard(currentQuestion) {
    let card = document.getElementById('card');
    card.innerHTML = '';

    const question = questions[currentQuestion]['question'];
    const answers = [
        questions[currentQuestion]['answer_1'], 
        questions[currentQuestion]['answer_2'], 
        questions[currentQuestion]['answer_3'], 
        questions[currentQuestion]['answer_4']
    ];
    const length = questions.length;

    card.innerHTML += generateHTMLCardQuestion(question);
    for (i = 0; i < answers.length; i++) {
        const answerNumber = i + 1;
        const answerString = answers[i];
        card.innerHTML += generateHTMLCardAnswer(answerNumber, answerString);
    };
    card.innerHTML += generateHTMLCardFooter(currentQuestion, length);
}

function answerQuestion(question) {
    let card = document.getElementById(`answer-${question}`);
    const right_answer = questions[currentQuestion]['right_answer'];

    if (question == right_answer) {
        card.classList.add('quiz-answer-right');
    } else {
        card.classList.add('quiz-answer-wrong');
        document.getElementById(`answer-${right_answer}`).classList.add('quiz-answer-right');
    }
}

function nextQuestion() {
    currentQuestion = currentQuestion + 1
    showCard(currentQuestion);
}