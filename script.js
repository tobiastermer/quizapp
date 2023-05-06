let questions = [];
let currentQuestion = 0;
let questionAnswered = false;
let rightQuestions = 0;
var audio_success = new Audio('./audio/right.mp3');
var audio_fail = new Audio('./audio/wrong.mp3');

function init() {
    loadCategories();
    showStartScreen();
}

function showStartScreen() {
    resetGame();
    document.getElementById('card-image').src = './img/start.jpg';
    let card = document.getElementById('card');
    card.innerHTML = '';
    card.innerHTML += generateHTMLCardStartScreen();
}

function loadCategories() {
    let navSidebar = document.getElementById('sidebar-categories');
    let navHeader = document.getElementById('header-categories');
    navSidebar.innerHTML = '';
    navHeader.innerHTML = '';

    for (i = 0; i < data.length; i++) {
        const category = data[i]["category"];
        navSidebar.innerHTML += generateHTMLAddCategorySidebar(i, category);
        navHeader.innerHTML += generateHTMLAddCategoryHeader(i, category);
    }
}

function chooseCategory(category) {
    questions = data[category]["questions_and_answers"];
    currentQuestion = 0;
    document.getElementById('card-image').src = './img/background.jpg';
    showCard(currentQuestion);
    showProgressBar();
}

function showCard(currentQuestion) {
    questionAnswered = false;
    let card = document.getElementById('card');
    card.innerHTML = '';

    showCardQuestion(card);
    showCardAnswers(card);
    showCardFooter(card);
}

function showCardQuestion(card) {
    const question = questions[currentQuestion]['question'];
    card.innerHTML += generateHTMLCardQuestion(question);
}

function showCardAnswers(card) {
    const answers = [
        questions[currentQuestion]['answer_1'], 
        questions[currentQuestion]['answer_2'], 
        questions[currentQuestion]['answer_3'], 
        questions[currentQuestion]['answer_4']
    ];

    for (i = 0; i < answers.length; i++) {
        const answerNumber = i + 1;
        const answerString = answers[i];
        card.innerHTML += generateHTMLCardAnswer(answerNumber, answerString);
    };
}

function showCardFooter(card) {
    card.innerHTML += generateHTMLCardFooter(currentQuestion, questions.length);
}

function answerQuestion(givenAnswerNumber) {
    const rightAnswerNumber = questions[currentQuestion]['right_answer'];
    if (questionAnswered == false) { // wenn die aktuelle Frage noch nicht beantwortet worden ist (benötigt, um nach beantworteter Frage keine Aktionen mehr bei Klick auf Antworten auszulösen)
        if (answerIsRight(givenAnswerNumber, rightAnswerNumber)) {
            actionRightAnswer(givenAnswerNumber);
        } else {
            actionWrongAnswer(givenAnswerNumber, rightAnswerNumber);
        }
        blockHoverEffects();
        document.getElementById('next-button').disabled = false;
        showProgressBar();
    }
}

function answerIsRight(givenAnswerNumber, rightAnswerNumber) {
    return givenAnswerNumber == rightAnswerNumber;
}

function actionRightAnswer(givenAnswerNumber) {
    document.getElementById(`answer-${givenAnswerNumber}`).classList.add('bg-success');
    audio_success.play();
    rightQuestions++;
}

function actionWrongAnswer(givenAnswerNumber, rightAnswerNumber) {
    document.getElementById(`answer-${givenAnswerNumber}`).classList.add('bg-danger');
    document.getElementById(`answer-${rightAnswerNumber}`).classList.add('bg-success');
    audio_fail.play();
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
    } else if (questionAnswered == false && questions.length > 0) {
        progress = Math.round((currentQuestion) / questions.length * 100);
    } else {
        progress = 0;
    }
    document.getElementById('progress-bar').style = `width: ${progress}%`;
    document.getElementById('progress-bar').innerHTML = `${progress}%`;
}

function restartGame() {
    resetGame();
    document.getElementById('card-image').src = './img/background.jpg';
    showCard(currentQuestion);
}

function resetGame() {
    questionAnswered = false;
    currentQuestion = 0;
    rightQuestions = 0;
    showProgressBar();
}