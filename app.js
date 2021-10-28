let getQuestion = document.getElementById('getQuestion')
let questionText = document.getElementById('questionText')
let score = document.getElementById('score')
// Buttons
let trueAns = document.getElementById('trueAnswer')
let falseAns = document.getElementById('falseAnswer')

// Set variables
let points = 0
let correctAnswer
let width = 0

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
    } else {
        answered = true
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
    } else {
        answered = true
    }
    // if answered move to next question
    if(answered) {
        fetchQuestions()
    }
}

// Function to progress score
function updateScore() {
    score.innerHTML = points
    moveBar()
    if(score === 10) {
        alert("You win!")
    }
}

// Function to move progress bar based on score
function moveBar() {
    let scoreBar = document.getElementById("scoreBar")
    width += 10
    scoreBar.style.width = width + "%"
    scoreBar.innerHTML = width + "%"
}

// Question event listener
getQuestion.addEventListener('click', fetchQuestions)

// Answers event listener
trueAns.addEventListener("click", checkTrueAnswer)
falseAns.addEventListener("click", checkFalseAnswer)