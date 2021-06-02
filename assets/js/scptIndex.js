// Variables for HTML elements
var eleTimer = document.getElementById("idTimer");
var eleStartBtn = document.getElementById("idBtnStartQuiz");
var eleQuestion = document.getElementById("idQuestion");
var eleChoices = document.getElementById("idChoices");
var eleResponse = document.getElementById("idResponseDisplay");
var eleUserInptSec = document.getElementById("idUserInput");
var eleUsrInitial = document.getElementById("userInitial");
var eleUsrInptSubBtn = document.getElementById("idSubmitBtn");
// Variables
var idxQueNum;
var varTimeRemain;
var timeInterval;

// Function to display the remining time to answer the questions.
// It also assess if the display should display second"s" or second.
function displayTime() {

    if (varTimeRemain > 1) {
        eleTimer.textContent = varTimeRemain + " seconds";
    } else if (varTimeRemain <= 1) {
        eleTimer.textContent = varTimeRemain + " second";   
    }

}

// Function to initialize the page.
// Setting variables to default value at start and display the time as 0 second.
// Ensure the Intro section is shown.
function pageInitialize() {
    varTimeRemain = 0;
    idxQueNum = 0;
    displayTime();
    document.getElementById("idIntroSec").style.display = "inline";
}

// Start the timer countdown (using setInterval) and display the time. Show the User Input section if the timer reached zero.
function timerCountdown() {
    varTimeRemain = 75;
    timeInterval = setInterval(function() {

        if (varTimeRemain >= 1) {
            displayTime();
            varTimeRemain--;
        } else if ((varTimeRemain === 0) || (varTimeRemain < 0)) {
            
            if (varTimeRemain < 0) {
                varTimeRemain = 0;
            }

            document.getElementById("idQueSec").style.display = "none";
            clearInterval(timeInterval);
            displayTime();
            document.getElementById("idScore").textContent = varTimeRemain;
            eleUserInptSec.style.display = "inline";
        }

    }, 1000);

}

// Function to populate and cycle through the questions.
// This will pull in and populate the questions and answers from an array of objects to the Question section.
function populateQuestion() {
    eleQuestion.textContent = aryQuestions[idxQueNum].question;

    while (eleChoices.hasChildNodes()) {
        eleChoices.removeChild(eleChoices.firstChild);
    }

    for (var idxChoice = 0; idxChoice <= 3; idxChoice++) {
        var choice = document.createElement("button");
        choice.textContent = (idxChoice+1) + ". " + aryQuestions[idxQueNum].choices[idxChoice];
        choice.setAttribute("class", "clsChoice");
        choice.setAttribute("value", aryQuestions[idxQueNum].choices[idxChoice]);
        eleChoices.appendChild(choice);
    }

}

// Call to initialize the page at start.
pageInitialize();

// Hide the Intro section and display Question section when Start Quiz button is clicked. Then call to start populate the question.
eleStartBtn.addEventListener("click", function() {
    timerCountdown();
    document.getElementById("idIntroSec").style.display = "none";
    document.getElementById("idQueSec").style.display = "inline";
    populateQuestion();
});

// Once user clicked an answer, check if the clicked answer is the correct answer or the wrong answer.
// Show the Response Display for half a second to tell if the user clicked the right answer or the wrong answer before moving on to the next question.
// After user answered the last question and the response is validated, display the User Input section.
eleChoices.addEventListener("click", function(event) {
    var response = "";
    var varRspDispTime = 1;

    if (event.target.nodeName === "BUTTON") {

        if (event.target.value === aryQuestions[idxQueNum].answer) {
            response = "Correct!";
        } else if (event.target.value !== aryQuestions[idxQueNum].answer) {
            varTimeRemain = varTimeRemain - 10;
            response = "Wrong!";
        }

        document.getElementById("idResponse").textContent = response;
        eleResponse.style.display = "inline";

        if (idxQueNum < (aryQuestions.length-1)) {
            idxQueNum++;

            var varRspTimeIntvl = setInterval(function() {

                if (varRspDispTime === 1) {
                    varRspDispTime--;
                } else if (varRspDispTime === 0) {
                    eleResponse.style.display = "none";
                    clearInterval(varRspTimeIntvl);
                    populateQuestion();
                }
        
            }, 500);

        } else if (idxQueNum === (aryQuestions.length-1)) {
            
            var varRspTimeIntvl = setInterval(function() {

                if (varRspDispTime === 1) {
                    varRspDispTime--;
                } else if (varRspDispTime === 0) {
                    document.getElementById("idQueSec").style.display = "none";
                    eleResponse.style.display = "none";
                    clearInterval(varRspTimeIntvl);
                    clearInterval(timeInterval);
                    displayTime();
                    document.getElementById("idScore").textContent = varTimeRemain;
                    eleUserInptSec.style.display = "inline";
                }
        
            }, 500);
            
        }

    } else {}
    
});

// When user clicked Submit in the User Input section, assess if there is high scores stored in the local storage.
// If yes, pull the array of past high scores into private array, inject the new high score to the private array, sort it by high to low score, post them back to local storage.
// Once everything is done. Reset everything and re-intialize the page.
eleUsrInptSubBtn.addEventListener("click", function(){
    var aryInitialScore = [];

    if ((JSON.parse(localStorage.getItem("highscores"))) !== null) {
        aryInitialScore = JSON.parse(localStorage.getItem("highscores"));
    } else {}

    aryInitialScore.push({
        initialScore: (eleUsrInitial.value + " - " + varTimeRemain),
        score: varTimeRemain
    });

    aryInitialScore.sort((a, b) => b.score - a.score);
    localStorage.setItem("highscores", JSON.stringify(aryInitialScore));
    eleUserInptSec.style.display = "none";
    eleUsrInitial.value = "";
    pageInitialize();
});