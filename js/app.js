const myClickableArea = document.querySelector("map");
const myScore = document.querySelector("#score-number");
const myClock = document.querySelector("#time");
const myClockButton = document.querySelector("#clock");
const myWinningBox = document.querySelector("#winning-box");
const myLosingBox = document.querySelector("#losing-box");
const nextRoundBtn = document.querySelector("#next-round-btn");
const endGame = document.querySelector("#end-game");
const refreshBtn = document.querySelector("#start-again-btn");
const endBtn = document.querySelector("#home-btn");
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

// checks if there is a highest score located in the storage when launching a new game
if (localStorage.getItem("highestScore") > 0) {
  highScoreRecap.innerHTML = localStorage.getItem("highestScore");
  highestScore.innerHTML = localStorage.getItem("highestScore");
  highScoreFinal.innerHTML = localStorage.getItem("highestScore");
} else {
  localStorage.setItem("highestScore", "0");
}

// if the player clicks on Charlie, we alert him that he won
myClickableArea.addEventListener("click", printWin);

// if the player clicks on "next round" on the modal, the modal goes away, the next picture pops-up, the coordinates of the clickable area change, the zoom image changes and the timer starts again
nextRoundBtn.onclick = function () {
  myWinningBox.style.display = "none";
  changeImage();
  zoomImage();
  changeCoords("area-clickable", arrayCoordinates[index]);
  var newStart = startTimer(timerMinutes, myClock);
  intervalID = setInterval(printLose, 1000);
};

// function which changes the image of the game
function changeImage() {
  myImage.setAttribute("src", arrayImages[index]);
}

// function that changes the coordinates of the clickable area on the picture (the area where Charlie is)
function changeCoords(areaID, newCoords) {
  document.getElementById(areaID).coords = newCoords;
  index += 1;
}

// function that enables us to zoom the image
function zoomImage() {
  var evt = new Event(),
    m = new Magnifier(evt);
  m.attach({
    thumb: "#game-img",
    large: (() => arrayImagesCoordinates[index])(),
    mode: "inside",
    zoom: 3,
    zoomable: true,
  });
}


// function that makes the timer of 30 seconds start
function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
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

// when there is only 10 seconds left, there is an animation on the clock
function printFewTimeLeft() {
  if (myClock.innerHTML == "00:10") {
    myClockButton.classList.toggle("vibrate-1");
  }
}

// function which checks if the timer is finished (= 00:00). If so, we display the losing alert box, and we stop the timer
function printLose() {
  if (document.querySelector("#time").textContent === "00:00") {
    myClockButton.classList.toggle("vibrate-1");
    alertLose();
    refreshBtn.addEventListener(
      "click",
      () => (window.location.href = "./index.html")
    );
    clearInterval(myIntervalId);
    clearInterval(intervalID);
    // clearInterval(fewtimeID);
  }
}


// displays the modal "losing box" and stops the zoom on the picture
function alertLose() {
  document.getElementById("game-img-lens").remove();
  scoreRecapLose.innerHTML = score;
  myLosingBox.style.display = "block";
}

//function which is called when the player has found Charlie. If so, we display the winning alert box, and we stop the timer
function printWin() {
  score = Number(myScore.textContent) + Number(myClock.innerHTML.substr(3));
  time = myClock.innerHTML;
  myScore.textContent = score;
  clearInterval(myIntervalId);
  alertWin();
}

//displays the modal "winning box", stops the zoom on the picture. if it is the last picture of the level, displays the end game modal. Otherwise, displays the modal "congrats, next step". also checks if the score is higher than the max score in the local storage.
function alertWin() {
  document.getElementById("game-img-lens").remove();
  if (score > localStorage.getItem("highestScore")) {
    localStorage.setItem("highestScore", score);
    highestScore.innerHTML = localStorage.getItem("highestScore");
  }
  scoreRecap.innerHTML = score;
  scoreFinal.innerHTML = score;
  highScoreRecap.innerHTML = localStorage.getItem("highestScore");
  highScoreFinal.innerHTML = localStorage.getItem("highestScore");
  timingRecap.innerHTML = time;
  index === arrayImages.length
    ? (endGame.style.display = "block")
    : (myWinningBox.style.display = "block");
  endBtn.addEventListener(
    "click",
    () => (window.location.href = "./index.html")
  );
}

// when the page is loading, we get the array of images and the array of coordinates that are related to the level selected on the home page. Then we charge the first image, the first clickable area, and the first zoom image. Then, we start the timer. And every second, we call the function "printFewTimeLeft" and "printLose"
window.onload = function () {
  arrayImages = JSON.parse(localStorage.getItem("theArrayImages"));
  arrayCoordinates = JSON.parse(localStorage.getItem("theArrayCoordinates"));
  arrayImagesCoordinates = JSON.parse(
    localStorage.getItem("theArrayImagesZoom")
  );
  changeImage();
  zoomImage();
  changeCoords("area-clickable", arrayCoordinates[index]);

  var start = startTimer(timerMinutes, myClock);
  var fewtimeID = setInterval(printFewTimeLeft, 1000);
  intervalID = setInterval(printLose, 1000);
  
};
