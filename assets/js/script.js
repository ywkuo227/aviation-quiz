var eleTimer = document.getElementById("idTimer");
var eleStartBtn = document.getElementById("idBtnStartQuiz");
var eleQuestion = document.getElementById("idQuestion");
var eleChoices = document.getElementById("idChoices");
var eleResponse = document.getElementById("idResponseDisplay");
var idxQueNum = 0;
var varTimeRemain;
var timeInterval;


function displayTime() {

    if (varTimeRemain > 1) {
        eleTimer.textContent = varTimeRemain + " seconds";
    } else if (varTimeRemain <= 1) {
        eleTimer.textContent = varTimeRemain + " second";   
    }
}

function pageInitialize() {
    varTimeRemain = 0;
    displayTime();
}

function timerCountdown() {
    varTimeRemain = 75;
    timeInterval = setInterval(function() {

        if (varTimeRemain >= 1) {
            displayTime();
            varTimeRemain--;
        } else if (varTimeRemain === 0) {
            displayTime();
            clearInterval(timeInterval);
        }

    }, 1000);
}

function populateQuestion() {
    eleQuestion.textContent = aryQuestions[idxQueNum].question;

    while (eleChoices.hasChildNodes()) {
        eleChoices.removeChild(eleChoices.firstChild);
    }

    for (var idxChoice = 0; idxChoice <= 3; idxChoice++) {
        var choices = document.createElement("button");
        choices.textContent = aryQuestions[idxQueNum].choices[idxChoice];
        choices.setAttribute("class", "clsChoice");
        var listChoice = document.createElement("li");
        listChoice.appendChild(choices);
        eleChoices.appendChild(listChoice);
    }
}

pageInitialize();

eleStartBtn.addEventListener("click", function() {
    timerCountdown();
    document.getElementById("idIntroSec").style = "display: none;";
    document.getElementById("idQueSec").style = "display: inline;";
    populateQuestion();
});

eleChoices.addEventListener("click", function(event) {
    var response = "";
    var varRspDispTime = 1;

    if (event.target.textContent === aryQuestions[idxQueNum].answer) {
        response = "Correct!"
    } else if (event.target.textContent != aryQuestions[idxQueNum].answer) {
        response = "Wrong!"
        varTimeRemain = varTimeRemain - 10;
    }

    document.getElementById("idResponse").textContent = response;
    eleResponse.style = "display: inline;";

    if (idxQueNum < (aryQuestions.length-1)) {
        idxQueNum++;

        var varRspTimeIntvl = setInterval(function() {

            if (varRspDispTime === 1) {
                varRspDispTime--;
            } else if (varRspDispTime === 0) {
                eleResponse.style = "display: none;";
                clearInterval(varRspTimeIntvl);
                populateQuestion();
            }
    
        }, 1000);

    } else if (idxQueNum === (aryQuestions.length-1)) {
        clearInterval(timeInterval);
    }
    
});