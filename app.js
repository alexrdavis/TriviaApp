let getQuestion = document.getElementById('getQuestion')
let questionText = document.getElementById('questionText')
let answerText = document.getElementById('answerText')
let score = document.getElementById('score')
// Buttons
let firstAns = document.getElementById('answer1')
let secondAns = document.getElementById('answer2')
let thirdAns = document.getElementById('answer3')
let fourthAns = document.getElementById('answer4')

// Randomize questions
let random = Math.floor((Math.random() * 10) + 1)
// Track points
let points = 0

// fetch data from opentdb
function fetchQuestions() {
    fetch('https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple')
        .then(response => response.json())
        .then(data => answerQuestion(data))
}

// function to get answers and question from fetch
function answerQuestion(data) {
    firstAns.innerHTML = data.results[random].correct_answer
    secondAns.innerHTML = data.results[random].incorrect_answers[0]
    questionText.innerHTML = data.results[random].question
    thirdAns.innerHTML = data.results[random].incorrect_answers[1]
    fourthAns.innerHTML = data.results[random].incorrect_answers[2]
}

// Question event listener
getQuestion.addEventListener('click', fetchQuestions)

// Answers event listener
firstAns.addEventListener('click', () => {
    answerText.innerHTML = "Correct!"
    points += 1;
    score.innerHTML = points;
})