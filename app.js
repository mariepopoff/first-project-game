const myClickableArea = document.querySelector("map");
const myScore = document.querySelector("#score-number");
const myClock = document.querySelector("#time");
const myClockButton = document.querySelector("#clock");
const myWinningBox = document.querySelector("#winning-box");
const myLosingBox = document.querySelector("#losing-box");
const nextRoundBtn = document.querySelector("#next-round-btn");
const endGame = document.querySelector("#end-game");
const refreshBtn = document.querySelector("#start-again-btn");
const endBtn = document.querySelector("#home-btn")
const myImage = document.querySelector("#game-img");
const scoreRecap = document.querySelector(".score-number-recap");
const scoreFinal = endGame.querySelector(".score-number-recap");
const highScoreRecap = document.querySelector(".high-score-number-recap");
const highScoreFinal = endGame.querySelector(".high-score-number-recap");
const scoreRecapLose = myLosingBox.querySelector(".score-number-recap");
const timingRecap = document.querySelector(".time-number-recap");
const highestScore = document.querySelector("#high-score span");
var span = document.getElementsByClassName("close")[0];
let score = 0;
let time;
let timerMinutes = 30;
let myIntervalId;
let intervalID;
let index = 0;
let arrayImages = [];
let arrayCoordinates = [];
let arrayImagesCoordinates = [];
if (localStorage.getItem("highestScore") > 0) {
    highScoreRecap.innerHTML = localStorage.getItem("highestScore");
    highestScore.innerHTML = localStorage.getItem("highestScore");
    highScoreFinal.innerHTML = localStorage.getItem("highestScore");
} else {
    localStorage.setItem("highestScore", "0");
}




myClickableArea.addEventListener("click", printWin);



nextRoundBtn.onclick = function() {
    myWinningBox.style.display = "none";
    changeImage();
    console.log(arrayImagesCoordinates[index]);
    zoomImage();
    changeCoords("area-clickable", arrayCoordinates[index]);
    var newStart = startTimer(timerMinutes, myClock);
    intervalID = setInterval(printLose,1000);
    
  }



function alertWin () {
    if (score > localStorage.getItem("highestScore")) {
        localStorage.setItem("highestScore", score);
        highestScore.innerHTML = localStorage.getItem("highestScore");
    }
    scoreRecap.innerHTML = score;
    
scoreFinal.innerHTML = score;
highScoreRecap.innerHTML = localStorage.getItem("highestScore");
highScoreFinal.innerHTML = localStorage.getItem("highestScore");
timingRecap.innerHTML = time;

(index === arrayImages.length) ? endGame.style.display = "block" : myWinningBox.style.display ="block";
endBtn.addEventListener("click", () => window.location.href='/home.html');
}

function alertLose () {
    scoreRecapLose.innerHTML = score;
    myLosingBox.style.display ="block";
}

function changeCoords (areaID, newCoords) {
document.getElementById(areaID).coords = newCoords;
index += 1;
}

function printWin() {
    score = Number(myScore.textContent) + Number(myClock.innerHTML.substr(3));
    time = myClock.innerHTML;
    myScore.textContent = score;
   
    clearInterval(myIntervalId);
    alertWin();
}

function printFewTimeLeft() {
    if (myClock.innerHTML == "00:10") {
        myClockButton.classList.toggle("vibrate-1");
    }
}

function changeImage () {
    
    myImage.setAttribute("src", arrayImages[index]);
}


function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    myIntervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    arrayImages = JSON.parse(localStorage.getItem("theArrayImages"));
    arrayCoordinates = JSON.parse(localStorage.getItem("theArrayCoordinates"));
    arrayImagesCoordinates = JSON.parse(localStorage.getItem("theArrayImagesZoom"));
    changeImage();
    zoomImage();
    changeCoords("area-clickable",arrayCoordinates[index]);
   
    
    
    var start = startTimer(timerMinutes, myClock);
    intervalID = setInterval(printLose,1000);
    var fewtimeID = setInterval(printFewTimeLeft,1000);
};

function printLose () {
    if (document.querySelector('#time').textContent === "00:00") {
        myClockButton.classList.toggle("vibrate-1");
        alertLose();
        refreshBtn.addEventListener("click", () => window.location.href='/home.html');
        clearInterval(myIntervalId);
        clearInterval(intervalID);
        clearInterval(fewtimeID);
        
    }
}

function zoomImage () {
    console.log(arrayImagesCoordinates[index]);
    var evt = new Event(),
    m = new Magnifier(evt);
    m.attach({
        thumb: '#game-img',
        large: arrayImagesCoordinates[index],
        mode: 'inside',
        zoom : 3,
        // zoomable: true
    });

}


