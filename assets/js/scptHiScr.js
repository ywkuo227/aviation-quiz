// Variable for HTML element
var eleScoreList = document.getElementById("idScoreList");

// Function to render the highest scores to the screen.
// This is done by pulling the stored highest scores from local storage.
// Create the unordered list as the function runs. Populate the text of the list. Append it to the High score section of the page.
function renderHiScore () {
    var highscores;
    highscores = JSON.parse(localStorage.getItem("highscores"));
    
    for (i = 0; i < highscores.length; i++) {
        var scores = document.createElement("li");
        scores.textContent = highscores[i].initialScore;
        scores.setAttribute("class","clsScores");
        eleScoreList.appendChild(scores);
    }

}

// Render the highest scores upon page load.
renderHiScore();

// Purge local storage and remove high scores from the screen when clicked.
document.getElementById("idClrHiScorBtn").addEventListener("click", function() {
    localStorage.removeItem("highscores");
    localStorage.clear();
    while (eleScoreList.hasChildNodes()) {
        eleScoreList.removeChild(eleScoreList.firstChild);
    }
});