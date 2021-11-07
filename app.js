let getQuestion = document.getElementById('getQuestion')
let questionText = document.getElementById('questionText')
let attempts = document.querySelector('.attempts')
// Overlay
let endMessage = document.querySelector(".end-message")
let resetButton = document.querySelector(".reset-button")
// True / False Buttons
let trueAns = document.getElementById('trueAnswer')
let falseAns = document.getElementById('falseAnswer')

// Set variables
let points = 0
let correctAnswer
let width = 0
let wrong = 3

/// TODO
// Deploy to heroku
// Finalize look

// fetch data from opentdb
function fetchQuestions() {
    fetch('https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean')
        .then(response => response.json())
        .then( (data) => {
            answerQuestion(data)
            correctAnswer = data.results[0].correct_answer
        })
}

// function to get answers and question from fetch
function answerQuestion(data) {
    questionText.innerHTML = data.results[0].question
}

// function to check if True is correct
function checkTrueAnswer() {
    let answered = false;
    if(correctAnswer == "True") {
        points += 1
        answered = true
        updateScore()
        moveBar()
    } else {
        answered = true
        wrong -= 1
        updateScore()
    }
    // if answered move to next question
    if(answered) {
        fetchQuestions()
    }
}

// function to check if False is correct
function checkFalseAnswer() {
    let answered = false;
    if(correctAnswer == "False") {
        points += 1
        answered = true
        updateScore()
        moveBar()
    } else {
        answered = true
        wrong -= 1
        updateScore()
    }
    // if answered move to next question
    if(answered) {
        fetchQuestions()
    }
}

// Function to progress score
function updateScore() {
    attempts.textContent = "Wrong answers remaining.. " + wrong
    if(points === 10) {
        endMessage.textContent = "Congrats, you win!"
        document.body.classList.add("overlay-is-open")
        setTimeout(() => resetButton.focus(), 331)
    }
    if (wrong === 0) {
        endMessage.textContent = "You lose, try again."
        document.body.classList.add("overlay-is-open")
        setTimeout(() => resetButton.focus(), 331)
    }
}

// Function to move progress bar based on score
function moveBar() {
    let scoreBar = document.getElementById("scoreBar")
    width += 10
    scoreBar.style.width = width + "%"
    scoreBar.innerHTML = width + "%"
}

// Function to reset the game and start over after winning or losing
function reset() {
    document.body.classList.remove("overlay-is-open")
    points = 0
    wrong = 3
    attempts.textContent = "Wrong answers remaining.. " + wrong
    width = 0
    let elem = document.getElementById("scoreBar")
    elem.style.width = width + "%"
    elem.innerHTML = width + "%"
}

// Question event listener
getQuestion.addEventListener('click', fetchQuestions)

// Answers event listener
trueAns.addEventListener("click", checkTrueAnswer)
falseAns.addEventListener("click", checkFalseAnswer)
// Restart game event listener
resetButton.addEventListener("click", reset)