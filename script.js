
const questionElement = document.getElementById('questions')
const answers = document.getElementById('option')
const nextButton = document.getElementById('next-btn')
const startButton = document.getElementById('start')
const instructions = document.getElementById('instructions')
const timeRemaining = document.getElementById('time')
const endScreen = document.getElementById('end-screen')
const submitBtn = document.getElementById('submit')
const saveResultBtn = document.getElementById('saveResult')
const scoreInitials = document.getElementById('initials')



startButton.addEventListener('click', startQuiz)
saveResultBtn.addEventListener('click', saveResult)
submitBtn.classList.add('hide')

let questionStatus = 0
let score = 0
let timeLeft = 60
let timePenalty = 10
let timer;

// function to begin the quiz and to initialize timer
function startQuiz() {


    timer = setInterval(() => {
        timeLeft--;
       timeRemaining.textContent = timeLeft;
           if (timeLeft <= 0) {
               endQuiz();
           }
        }, 1000);
    questionStatus = 0;
    score = 0;
    startButton.classList.add('hide')
    instructions.remove('hide')
    revealQuestion();
}

// function to reveal the first question 
function revealQuestion() {
    submitBtn.classList.remove('hide')
   questionElement.textContent = Questions[questionStatus].question
    answers.innerHTML = ""
   for (let i = 0; i < Questions[questionStatus].answers.length; i++) {
    const choicesdiv = document.createElement("div");
    const choice = document.createElement("input");
    const choiceLabel = document.createElement("label");

    choice.type = "radio";
    choice.name = "answer";
    choice.value = i;

    choiceLabel.textContent = Questions[questionStatus].answers[i].text;
    choicesdiv.appendChild(choice);
    choicesdiv.appendChild(choiceLabel);
    answers.appendChild(choicesdiv);
}
}

console.log(revealQuestion) // checking function is working
 
 // next question function which iterates through the questions in the array and ends quiz if all questions answered 
function nextQuestion() {
    if (questionStatus < Questions.length - 1) {
        questionStatus++;
        console.log(questionStatus);
        revealQuestion();
    } else {
        endQuiz();
    }
}
console.log(nextQuestion); //checking next question function is working
 // function to reduce timer
function reduceTimer(){
    timeLeft -= 10;
}

// checks if the answer is correct, logs score and if incorrect it implements the timer penalty, then reveals the next question
function checkAns() {
    const selectedAns = parseInt(document.querySelector('input[name="answer"]:checked').value);
 
    if (Questions[questionStatus].answers[selectedAns].correct) {
        score++;
        console.log("Correct")
        nextQuestion();
    } else {
        reduceTimer();
        nextQuestion();
    }
}

// displys the end screen removes the question/amswer elements, displays final score 
function endQuiz() {
    endScreen.classList.remove('hide')
    questionElement.classList.add('hide')
    submitBtn.classList.add('hide')
    answers.classList.add('hide')
    const totalScore = document.getElementById("final-score")
    totalScore.textContent = `You scored ${score} out of ${Questions.length}`
}

// enables the score to be saved into local storage 
function saveResult() {
    let initials = scoreInitials.value
    localStorage.setItem(initials, score);
}

console.log(endQuiz); // check score is tallying

// The questions and answers which are stored as an array 
const Questions = [
    { 
        question: "What best describes a JavaScript array?",
        answers: [
            {text: "A clickable button on the page", correct: false},
            {text: "A type of global object used to store data", correct: true},
            {text: "A selection of numbers", correct: false },

        ]
    },

    { 
        question: "Why is it best practice to put the Javascript file at the bottom of your page?",
        answers: [
            {text: "The CSS is the most important file", correct: false},
            {text: "JavaScript isnt needed for functionality", correct: false},
            {text: "The computer reads from top to bottom and the html should be read first", correct: true},

        ]
    },

    { 
        question: "What best describes a variable?",
        answers: [
            {text: "A container used for storage", correct: true},
            {text: "Varied tools to style the look of a page", correct: false},
            {text: "Styling of elements on a page", correct: false },

        ]
    },
    { 
        question: "What does console.log do?",
        answers: [
            {text: "Shorten the script", correct: false},
            {text: "Writes a message to the console", correct: true},
            {text: "Link to html file", correct: false },

        ]
    },
]