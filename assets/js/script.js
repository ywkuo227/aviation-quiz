var eleTimer = document.getElementById("idTimer");
var eleStartBtn = document.getElementById("idBtnStartQuiz");
var eleQuestion = document.getElementById("idQuestion");
var eleChoices = document.getElementById("idChoices");
var eleResponse = document.getElementById("idResponseDisplay");
var eleUserInptSec = document.getElementById("idUserInput");
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
            document.getElementById("idQueSec").style = "display: none";
            clearInterval(timeInterval);
            displayTime();
            document.getElementById("idScore").textContent = varTimeRemain;
            eleUserInptSec.style = "display: inline;";
        }

    }, 1000);
}

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

    if (event.target.nodeName === "BUTTON") {

        if (event.target.value === aryQuestions[idxQueNum].answer) {
            response = "Correct!";
        } else if (event.target.value !== aryQuestions[idxQueNum].answer) {
            varTimeRemain = varTimeRemain - 10;
            response = "Wrong!";
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
        
            }, 500);

        } else if (idxQueNum === (aryQuestions.length-1)) {
            
            var varRspTimeIntvl = setInterval(function() {

                if (varRspDispTime === 1) {
                    varRspDispTime--;
                } else if (varRspDispTime === 0) {
                    document.getElementById("idQueSec").style = "display: none";
                    clearInterval(varRspTimeIntvl);
                    clearInterval(timeInterval);
                    displayTime();
                    document.getElementById("idScore").textContent = varTimeRemain;
                    eleUserInptSec.style = "display: inline;";
                }
        
            }, 500);
            
        }

    } else {}
    
});