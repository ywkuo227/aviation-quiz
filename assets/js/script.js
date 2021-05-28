var eleTimer = document.getElementById('idTimer');
var eleStartBtn = document.getElementById('idBtnStartQuiz');
var varTimeRemain;

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
    var timeInterval = setInterval(function() {

        if (varTimeRemain >= 1) {
            displayTime();
            varTimeRemain--;
        } else if (varTimeRemain === 0) {
            displayTime();
            clearInterval(timeInterval);
        }
    }, 1000);
}

function populateQuestion(aryQuestions) {
    
}

pageInitialize();

eleStartBtn.addEventListener("click", function() {
    timerCountdown();
    document.getElementById("idIntroSec").style = "display: none;";
    document.getElementById("idQueSec").style = "display: inline;";
    populateQuestion();
});