// Global variables that gets  HTML id's for manipulation!!
var quizEl = document.querySelector("#quiz");
var resultsEl = document.querySelector("#result");
var finalScoreEl = document.querySelector("#finalScore");
var gameoverEl = document.querySelector("#gameover");
var questionsEl = document.querySelector("#questions");
var quizTimer = document.querySelector("#timer");
var startQuizButton = document.querySelector("#startbtn");
var startQuizDiv = document.querySelector("#startpage");
var highscoreContainer = document.querySelector("#highscoreContainer");
var highscoreDiv = document.querySelector("#high-scorePage");
var highscoreInputName = document.querySelector("#initials");
var highscoreDisplayName = document.querySelector("#highscore-initials");
var endGameBtns = document.querySelector("#endGameBtns");
var submitScoreBtn = document.querySelector("#submitScore");
var highscoreDisplayScore = document.querySelector("#highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz questions
var quizQuestions = [{
        question: "which of the following is an indicater of class in CSS",
        choiceA: "=>",
        choiceB: ".",
        choiceC: "#",
        choiceD: "$",
        correctAnswer: "b"
    },
    {
        question: "What does HTML stand for?",
        choiceA: "Hyper Text mass language",
        choiceB: "Higher Transfering Markup Language ",
        choiceC: "Hyper Text Markup language",
        choiceD: "Hyper-text Transfer Markup Language",
        correctAnswer: "c"
    },
    {
        question: "What is used primarily to style  a web page?",
        choiceA: "HTML",
        choiceB: "CSS",
        choiceC: "Python",
        choiceD: "javascript",
        correctAnswer: "b"
    },

    {
        question: "What code would you use to get an ID from HTML file in Javascript?",
        choiceA: "document.querySelector",
        choiceB: "window.localStorage.getItem",
        choiceC: "document.getElementById",
        choiceD: "A & C",
        correctAnswer: "d"
    },
    {
        question: "what is the main purpose of javascript?",
        choiceA: "to let the website function",
        choiceB: "to style the website",
        choiceC: "to add security to the website",
        choiceD: "none",
        correctAnswer: "a"
    },



];
// Few more global variables
// quiz state variables
var currentQuestionIndex = 0;
var time = questions.length * 10;
//var timerId;
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;



// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion() {
    gameoverEl.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz() {
    gameoverEl.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizEl.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore() {
    quizEl.style.display = "none"
    gameoverEl.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreBtn.addEventListener("click", function highscore() {


    if (highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };

        gameoverEl.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

function clockTick() {
    // deduct time when user select wrong answer
    time--;
    timerEl.textContent = time;

    // end quiz if user ran out of time
    if (time <= 0) {
        quizEnd();
    }
}

function questionClick() {
    // check if user guessed wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
        // penalize time
        time -= 10;
    }

    if (time < 0) {
        time = 0;
    }
}
// This function displays the high scores page while hiding all of the other pages from 
function showHighscore() {
    startQuizDiv.style.display = "none"
    gameoverEl.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz() {
    highscoreContainer.style.display = "none";
    gameoverEl.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    } else {
        showScore();
    }
}

// This button starts the quiz!
startQuizButton.addEventListener("click", startQuiz);