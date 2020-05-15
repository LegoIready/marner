"use strict";
var drawex = [];
var drawwhy = [];
var drawlog = document.getElementById("drawlog");
var scene = 0;
var mouseClicked;
function setup() {
    createCanvas(800, 600);
}
function drawScene() {
    background(0);
    mouseClicked = () => {
        console.log(0);
    };
}
/*function drawlayer() {
    let j = drawex.length;
    fill(255);
    rect(Math.floor(mouseX / 5) * 5, Math.floor(mouseY / 5) * 5, 5, 5);
    for (let i = 0; i <= j; i++) {
        rect(Math.floor(drawex[i] / 5) * 5, Math.floor(drawwhy[i] / 5) * 5, 5, 5);
    }
};
function mouseClicked() {
    if (mouseY >= 0 && mouseY <= 600 && mouseX >= 0 && mouseX <= 800) {
        drawlog.innerHTML += "rect(" + Math.floor(mouseX / 5) * 5 + "," + Math.floor(mouseY / 5) * 5 + ",5,5);";
        drawex.push(mouseX);
        drawwhy.push(mouseY);
    }
};*/
function draw() {
    noStroke();
    drawScene();
    //drawlayer();
}
