const easyBtn = document.querySelector("#easy");
const mediumBtn = document.querySelector("#medium");
const difficultBtn = document.querySelector("#difficult");
let myArrayImages = [];
let myArrayImagesZoom =[];
let myArrayCoordinates = [];



function openEasyGame () {

myArrayImages = ["/images/first-round.png","/images/fifth round eausy.png","/images/third-round.png" ];
myArrayImagesZoom = ["/images/first-round-zoom.png","/images/fifth round eausy-zoom.png","/images/third-round-zoom.png" ];
myArrayCoordinates = ["126,517 162,517 162,575 126,575", "317,508 350,508 350,547 317,547", "1033,136 1069,136 1069,182 1033,182 "];
localStorage.setItem("theArrayImages", JSON.stringify(myArrayImages));
localStorage.setItem("theArrayCoordinates", JSON.stringify(myArrayCoordinates));
localStorage.setItem("theArrayImagesZoom", JSON.stringify(myArrayImagesZoom));
window.location.href='./home.html';
}

function openMediumGame () {
    myArrayImages = [ "/images/sixth-round-easy.png", "/images/medium.png", "/images/fourth-round.png"];
    myArrayImagesZoom = [ "/images/sixth-round-easy-zoom.png", "/images/medium-zoom.png", "/images/fourth-round-zoom.png"];
    myArrayCoordinates = [ "1057,505 1098,505 1098,558 1057,505", "495,629 531,629 531,667 495,667","314,457 343,457 343,494 314,494"];
    localStorage.setItem("theArrayImages", JSON.stringify(myArrayImages));
localStorage.setItem("theArrayCoordinates", JSON.stringify(myArrayCoordinates));
localStorage.setItem("theArrayImagesZoom", JSON.stringify(myArrayImagesZoom));
    window.location.href='./home.html';
}

function openDifficultGame () {
    myArrayImages = ["/images/seventh-round.png","/images/eight-round.png","/images/ninth-round.png"];
    myArrayImagesZoom = ["/images/seventh-round-zoom.png","/images/eight-round-zoom.png","/images/ninth-round-zoom.png"];
    myArrayCoordinates = ["913,361 940,36 940,392 913,392","1050,379 1079,379 1079,408 1050,408","662,245 702,245 702,285 662,285"];
    localStorage.setItem("theArrayImages", JSON.stringify(myArrayImages));
localStorage.setItem("theArrayCoordinates", JSON.stringify(myArrayCoordinates));
localStorage.setItem("theArrayImagesZoom", JSON.stringify(myArrayImagesZoom));
    window.location.href='./home.html';
}
easyBtn.addEventListener("click", openEasyGame);
mediumBtn.addEventListener("click", openMediumGame);
difficultBtn.addEventListener("click", openDifficultGame);
