let getQuestion = document.getElementById('getQuestion')
let questionText = document.getElementById('questionText')
// Buttons
let firstAns = document.getElementById('answer1')
let secondAns = document.getElementById('answer2')
let thirdAns = document.getElementById('answer3')
let fourthAns = document.getElementById('answer4')

let random = Math.floor((Math.random() * 10) + 1)

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