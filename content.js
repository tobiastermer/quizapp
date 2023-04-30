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
                <button onclick="nextQuestion(); return false" class="btn btn-primary">Nächste Frage</button>
            </div>`
}