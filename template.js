function generateHTMLCardQuestion(question) {
    return `<h5 class="card-title">${question}</h5>`
}

function generateHTMLCardAnswer(answerNumber, answerString) {
    return `<div class="card mb-2 quiz-answer-card" id="answer-${answerNumber}" onclick="answerQuestion(${answerNumber}); return false">
                <div class="card-body">
                    ${answerString}
                </div>
            </div>`
}

function generateHTMLCardFooter(currentQuestion, length) {
    currentQuestion = currentQuestion + 1

    return `<div class="question-footer">
                <p><b>${currentQuestion}</b> von ${length} Fragen</p>
                <button onclick="nextQuestion(); return false" class="btn btn-primary" id="next-button" disabled>Nächste Frage</button>
            </div>`
}

function generateHTMLCardEndScreen() {
    return `<div class="fs-38 text-center">Quiz beendet!</div>
        <p class="text-center">Du hast ${rightQuestions} von ${questions.length} Fragen richtig beantwortet.</p>
        <div class="button-center">
            <button onclick="restartGame(); return false" class="btn btn-primary" id="restart-button">Erneut spielen</button>
        </div>
    `
}