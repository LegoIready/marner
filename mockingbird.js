"use strict";
var mousePressed;
var keyPressed;
var mocks = [];
var mouseCase = 0;
var scene = 0;
var fov = 0;
var name = "";
function preload() {
    for (let i = 0; i < 1; i++) {
        mocks[i] = loadImage("mock" + i + ".png");
    }
}
function setup() {
    if (localStorage.key(0)==="save") { saveGame(1); }
    setInterval(saveGame, 30000, 0);
    createCanvas(800, 600);
    document.getElementsByTagName("canvas")[0].insertAdjacentHTML("afterend", '<br><input id="savelog"><button onclick="saveGame(2)">SAVE</button><button onclick="saveGame(3)">LOAD</button><button onclick="saveGame(4)">RESET</button>');
    noSmooth();
    noStroke();
    textFont("Courier New");
    textSize(20);
}
function saveGame(man) {
    const saveLog = document.getElementById("savelog");
    const saveValue = btoa([mouseCase,scene,fov,name].join(','));
    switch (man) {
        case 0:
            localStorage.setItem("save", saveValue);
            break;
        case 1:
            const j = atob(localStorage.getItem("save")).split(",");
            mouseCase = parseInt(j[0]);
            scene = parseInt(j[1]);
            fov = parseInt(j[2]);
            name = j[3];
            break;
        case 2:
            saveLog.value = saveValue;
            saveLog.select();
            document.execCommand('copy');
            saveGame(0);
            break;
        case 3:
            const l = atob(saveLog.value).split(",");
            saveLog.value = "";
            mouseCase = parseInt(l[0]);
            scene = parseInt(l[1]);
            fov = parseInt(l[2]);
            name = l[3];
            saveGame(0);
            break;
        case 4:
            const m = confirm("Are you sure you want to erase all game data?");
            if (m === true) {
                localStorage.removeItem("save");
                mouseCase = 0;
                scene = 0;
                fov = 0;
                name = "";
                saveGame(0);
            }
            break;
    }
}
function dialogue(msg, scn, msc, sender) {
    textFont("Courier New");
    textSize(20);
    mousePressed = function () {
        if (scene === scn && mouseCase === msc && mouseY <= 600) {
            mouseCase += 1;
        }
        return false;
    }
    if (sender) {
        fill(42, 0, 54);
        rect(40, 470, sender.length * 12 + 20, 30);
        rect(45, 465, sender.length * 12 + 10, 5);
        fill(209, 154, 4);
        text(sender, 50, 485);
    }
    fill(42, 0, 54);
    rect(20, 495, 760, 90);
    fill(58, 0, 74);
    rect(15, 500, 770, 80);
    fill(255);
    text(msg, 30, 520);
}
function choices(msg, scn, msc, sender) {
    textFont("Courier New");
    textSize(20);
    const j = msg.length;
    msg.reverse();
    mousePressed = function () {
        if (j === 1) {
            if (scene === scn && mouseCase === msc && mouseX >= 15 && mouseX <= 785 && mouseY >= 545 && mouseY <= 585) {
                mouseCase += 1;
            }
        } else if (j === 2) {
            if (scene === scn && mouseCase === msc && mouseX >= 15 && mouseX <= 785 && mouseY >= 505 && mouseY <= 545) {
                mouseCase += 1;
            }
            if (scene === scn && mouseCase === msc && mouseX >= 15 && mouseX <= 785 && mouseY >= 545 && mouseY <= 585) {
                mouseCase += 2;
            }
        } else if (j === 3) {
            if (scene === scn && mouseCase === msc && mouseX >= 15 && mouseX <= 785 && mouseY >= 455 && mouseY <= 495) {
                mouseCase += 1;
            }
            if (scene === scn && mouseCase === msc && mouseX >= 15 && mouseX <= 785 && mouseY >= 505 && mouseY <= 545) {
                mouseCase += 2;
            }
            if (scene === scn && mouseCase === msc && mouseX >= 15 && mouseX <= 785 && mouseY >= 545 && mouseY <= 585) {
                mouseCase += 3;
            }
        } else if (j === 4) {
            if (scene === scn && mouseCase === msc && mouseX >= 15 && mouseX <= 785 && mouseY >= 425 && mouseY <= 465) {
                mouseCase += 1;
            }
            if (scene === scn && mouseCase === msc && mouseX >= 15 && mouseX <= 785 && mouseY >= 465 && mouseY <= 505) {
                mouseCase += 2;
            }
            if (scene === scn && mouseCase === msc && mouseX >= 15 && mouseX <= 785 && mouseY >= 505 && mouseY <= 545) {
                mouseCase += 3;
            }
            if (scene === scn && mouseCase === msc && mouseX >= 15 && mouseX <= 785 && mouseY >= 545 && mouseY <= 585) {
                mouseCase += 4;
            }
        }
        return false;
    }
    if (sender) {
        fill(42, 0, 54);
        rect(20, 545 - j * 40, 760, (j + 1) * 40);
        fill(58, 0, 74);
        rect(15, 550 - j * 40, 770, 30);
        fill(209, 154, 4);
        text(sender, 30, 570 - j * 40);
    } else {
        fill(42, 0, 54);
        rect(20, 545 - (j - 1) * 40, 760, j * 40);
    }
    for (let i = 0; i < j; i++) {
        fill(58, 0, 74);
        rect(15, 550 - i * 40, 770, 30);
        fill(255);
        text(msg[i], 30, 570 - i * 40);
    }
}
var drawLayer = (function () {
    var saveLog;
    const drawX = [];
    const drawY = [];
    const reflect = 0;
    return function () {
        saveLog = document.getElementById("savelog");
        let j = drawX.length;
        const h = Math.floor(mouseX / 5) * 5;
        const k = Math.floor((mouseY + fov) / 5) * 5;
        const l = (h < 400) ? (395 - h) + 400 : 400 - (h - 395);
        if (mouseIsPressed && mouseButton === LEFT && mouseY <= 600 && !saveLog.value.includes("(" + h + "," + k)) {
            saveLog.value += "square(" + h + "," + k + ",5);";
            drawX.push(h);
            drawY.push(k);
            if (reflect === 1) {
                saveLog.value += "square(" + l + "," + k + ",5);";
                drawX.push(l);
                drawY.push(k);
            }
        }
        keyPressed = function () {
            drawX.pop();
            drawY.pop();
            j = drawX.length;
            saveLog.value = "";
            for (let i = 0; i < j; i++) {
                saveLog.value += "square(" + drawX[i] + "," + drawY[i] + ",5);";
            }
        }
        fill(255);
        square(h, k, 5);
        if (reflect === 1) { square(l, k, 5); }
        for (let i = 0; i < j; i++) {
            square(drawX[i], drawY[i], 5);
        }
    }
})();
var draw = (function () {
    var bar0 = 255;
    var bar1 = 0;
    var bar2 = 0;
    var bar3 = 0;
    var bar4 = 0;
    var bar5 = 0;
    return function () {
        switch (scene) {
            case 0:
                background(104, 177, 204);
                fill(156, 124, 73);//ground
                rect(0, 450, 800, 150);
                fill(184, 147, 88);//road
                rect(0, 350, 800, 100);
                if (bar1 === 0) {
                    bar2 = Date.now();
                    bar1 = 1;
                    bar3 = (bar3 === 0) ? 1 : 0;
                }
                if (Date.now() - bar2 >= 1000) {
                    bar1 = 0;
                }
                if (bar3 === 0) {
                    square(0, 445, 5); square(5, 450, 5); square(10, 455, 5); square(15, 455, 5); square(20, 450, 5); square(20, 455, 5); square(25, 455, 5); square(35, 455, 5); square(40, 450, 5); square(45, 450, 5); square(45, 455, 5); square(50, 455, 5); square(55, 455, 5); square(60, 455, 5); square(65, 455, 5); square(65, 460, 5); square(70, 460, 5); square(75, 460, 5); square(80, 460, 5); square(85, 455, 5); square(90, 450, 5); square(95, 450, 5); square(100, 450, 5); square(100, 455, 5); square(105, 455, 5); square(110, 460, 5); square(115, 460, 5); square(125, 460, 5); square(130, 455, 5); square(135, 455, 5); square(140, 455, 5); square(145, 455, 5); square(145, 460, 5); square(150, 460, 5); square(150, 465, 5); square(155, 465, 5); square(160, 465, 5); square(165, 460, 5); square(165, 455, 5); square(165, 450, 5); square(170, 450, 5); square(175, 450, 5); square(180, 450, 5); square(185, 450, 5); square(190, 445, 5); square(195, 445, 5); square(195, 440, 5); square(200, 440, 5); square(205, 440, 5); square(210, 445, 5); square(220, 445, 5); square(225, 445, 5); square(230, 445, 5); square(235, 450, 5); square(240, 450, 5); square(245, 450, 5); square(250, 445, 5); square(255, 445, 5); square(260, 450, 5); square(265, 450, 5); square(270, 450, 5); square(275, 455, 5); square(280, 455, 5); square(285, 455, 5); square(290, 455, 5); square(295, 455, 5); square(295, 460, 5); square(300, 460, 5); square(305, 460, 5); square(310, 455, 5); square(315, 455, 5); square(320, 450, 5); square(325, 450, 5); square(330, 450, 5); square(335, 450, 5); square(340, 450, 5); square(340, 455, 5); square(345, 460, 5); square(350, 465, 5); square(355, 465, 5); square(360, 470, 5); square(365, 470, 5); square(370, 465, 5); square(370, 460, 5); square(375, 460, 5); square(375, 455, 5); square(380, 455, 5); square(385, 455, 5); square(390, 455, 5); square(395, 455, 5); square(400, 455, 5); square(405, 455, 5); square(410, 450, 5); square(415, 450, 5); square(420, 450, 5); square(425, 450, 5); square(430, 450, 5); square(435, 450, 5); square(440, 450, 5); square(445, 450, 5); square(450, 450, 5); square(455, 445, 5); square(460, 445, 5); square(465, 450, 5); square(470, 455, 5); square(475, 455, 5); square(480, 455, 5); square(480, 450, 5); square(485, 450, 5); square(490, 450, 5); square(495, 450, 5); square(500, 450, 5); square(505, 450, 5); square(510, 450, 5); square(515, 455, 5); square(520, 455, 5); square(525, 455, 5); square(525, 450, 5); square(530, 450, 5); square(535, 450, 5); square(540, 450, 5); square(545, 450, 5); square(550, 450, 5); square(555, 450, 5); square(560, 450, 5); square(565, 450, 5); square(570, 455, 5); square(575, 455, 5); square(580, 455, 5); square(585, 460, 5); square(590, 460, 5); square(595, 460, 5); square(595, 455, 5); square(600, 455, 5); square(605, 460, 5); square(610, 460, 5); square(615, 465, 5); square(620, 465, 5); square(620, 460, 5); square(625, 460, 5); square(625, 455, 5); square(630, 455, 5); square(635, 455, 5); square(635, 460, 5); square(640, 460, 5); square(645, 455, 5); square(650, 455, 5); square(650, 450, 5); square(655, 450, 5); square(660, 445, 5); square(665, 445, 5); square(670, 445, 5); square(675, 445, 5); square(680, 445, 5); square(680, 440, 5); square(685, 440, 5); square(690, 440, 5); square(695, 440, 5); square(700, 440, 5); square(705, 440, 5); square(710, 440, 5); square(715, 445, 5); square(720, 445, 5); square(725, 445, 5); square(725, 450, 5); square(730, 450, 5); square(735, 450, 5); square(740, 450, 5); square(745, 450, 5); square(745, 445, 5); square(750, 445, 5); square(755, 445, 5); square(760, 445, 5); square(765, 445, 5); square(770, 445, 5); square(770, 450, 5); square(775, 450, 5); square(775, 455, 5); square(780, 460, 5); square(785, 460, 5); square(790, 455, 5); square(795, 455, 5); square(800, 455, 5); square(15, 450, 5); square(10, 450, 5); square(25, 450, 5); square(30, 450, 5); square(35, 450, 5); square(50, 450, 5); square(55, 450, 5); square(60, 450, 5); square(65, 450, 5); square(70, 450, 5); square(75, 450, 5); square(80, 450, 5); square(85, 450, 5); square(70, 455, 5); square(75, 455, 5); square(80, 455, 5); square(105, 450, 5); square(110, 450, 5); square(115, 450, 5); square(120, 450, 5); square(125, 450, 5); square(130, 450, 5); square(135, 450, 5); square(140, 450, 5); square(145, 450, 5); square(150, 450, 5); square(155, 450, 5); square(160, 450, 5); square(110, 455, 5); square(115, 455, 5); square(120, 455, 5); square(125, 455, 5); square(150, 455, 5); square(155, 455, 5); square(160, 455, 5); square(160, 460, 5); square(155, 460, 5); square(275, 450, 5); square(280, 450, 5); square(285, 450, 5); square(290, 450, 5); square(295, 450, 5); square(300, 450, 5); square(305, 450, 5); square(310, 450, 5); square(315, 450, 5); square(300, 455, 5); square(305, 455, 5); square(345, 450, 5); square(350, 450, 5); square(355, 450, 5); square(360, 450, 5); square(365, 450, 5); square(370, 450, 5); square(375, 450, 5); square(380, 450, 5); square(385, 450, 5); square(390, 450, 5); square(395, 450, 5); square(400, 450, 5); square(405, 450, 5); square(345, 455, 5); square(350, 455, 5); square(355, 455, 5); square(360, 455, 5); square(365, 455, 5); square(370, 455, 5); square(350, 460, 5); square(355, 460, 5); square(360, 460, 5); square(365, 460, 5); square(360, 465, 5); square(365, 465, 5); square(470, 450, 5); square(475, 450, 5); square(515, 450, 5); square(520, 450, 5); square(570, 450, 5); square(575, 450, 5); square(580, 450, 5); square(585, 450, 5); square(590, 450, 5); square(595, 450, 5); square(600, 450, 5); square(605, 450, 5); square(610, 450, 5); square(615, 450, 5); square(620, 450, 5); square(625, 450, 5); square(630, 450, 5); square(635, 450, 5); square(640, 450, 5); square(645, 450, 5); square(640, 455, 5); square(605, 455, 5); square(610, 455, 5); square(615, 455, 5); square(620, 455, 5); square(615, 460, 5); square(585, 455, 5); square(590, 455, 5); square(780, 450, 5); square(785, 450, 5); square(790, 450, 5); square(795, 450, 5); square(780, 455, 5); square(785, 455, 5);
                } else {
                    square(0, 450, 5); square(10, 450, 5); square(15, 455, 5); square(25, 455, 5); square(35, 455, 5); square(45, 455, 5); square(50, 455, 5); square(55, 455, 5); square(60, 455, 5); square(65, 455, 5); square(70, 455, 5); square(75, 460, 5); square(85, 460, 5); square(100, 455, 5); square(110, 455, 5); square(120, 450, 5); square(125, 450, 5); square(130, 450, 5); square(135, 450, 5); square(140, 450, 5); square(140, 455, 5); square(145, 455, 5); square(150, 455, 5); square(155, 460, 5); square(160, 460, 5); square(170, 460, 5); square(175, 455, 5); square(185, 450, 5); square(190, 450, 5); square(195, 450, 5); square(200, 450, 5); square(205, 455, 5); square(210, 460, 5); square(215, 465, 5); square(225, 465, 5); square(230, 470, 5); square(240, 470, 5); square(245, 470, 5); square(255, 470, 5); square(260, 465, 5); square(270, 465, 5); square(275, 460, 5); square(280, 455, 5); square(285, 455, 5); square(290, 460, 5); square(295, 460, 5); square(300, 460, 5); square(310, 455, 5); square(315, 450, 5); square(325, 445, 5); square(330, 445, 5); square(335, 445, 5); square(340, 445, 5); square(345, 445, 5); square(345, 450, 5); square(350, 450, 5); square(355, 450, 5); square(360, 450, 5); square(365, 450, 5); square(370, 450, 5); square(375, 450, 5); square(380, 450, 5); square(390, 450, 5); square(395, 450, 5); square(400, 450, 5); square(410, 450, 5); square(415, 450, 5); square(420, 450, 5); square(425, 450, 5); square(430, 455, 5); square(435, 455, 5); square(445, 460, 5); square(450, 460, 5); square(455, 460, 5); square(460, 460, 5); square(465, 460, 5); square(470, 455, 5); square(480, 455, 5); square(485, 450, 5); square(490, 450, 5); square(495, 450, 5); square(500, 450, 5); square(510, 455, 5); square(515, 460, 5); square(520, 465, 5); square(530, 465, 5); square(535, 465, 5); square(540, 465, 5); square(545, 460, 5); square(545, 455, 5); square(550, 455, 5); square(550, 450, 5); square(555, 455, 5); square(560, 455, 5); square(565, 455, 5); square(570, 455, 5); square(575, 455, 5); square(585, 450, 5); square(590, 450, 5); square(600, 450, 5); square(605, 450, 5); square(610, 450, 5); square(615, 450, 5); square(620, 450, 5); square(625, 450, 5); square(630, 450, 5); square(635, 450, 5); square(640, 450, 5); square(645, 450, 5); square(650, 450, 5); square(655, 450, 5); square(660, 450, 5); square(665, 450, 5); square(670, 450, 5); square(675, 450, 5); square(680, 450, 5); square(685, 450, 5); square(690, 450, 5); square(695, 450, 5); square(700, 450, 5); square(705, 450, 5); square(710, 455, 5); square(710, 460, 5); square(715, 465, 5); square(720, 460, 5); square(725, 450, 5); square(725, 445, 5); square(730, 445, 5); square(735, 445, 5); square(740, 445, 5); square(745, 445, 5); square(750, 445, 5); square(755, 450, 5); square(760, 450, 5); square(765, 455, 5); square(770, 455, 5); square(770, 460, 5); square(775, 460, 5); square(780, 465, 5); square(780, 460, 5); square(785, 460, 5); square(785, 455, 5); square(790, 450, 5); square(795, 450, 5); square(795, 455, 5); square(15, 450, 5); square(20, 450, 5); square(25, 450, 5); square(30, 450, 5); square(35, 450, 5); square(40, 450, 5); square(45, 450, 5); square(50, 450, 5); square(55, 450, 5); square(60, 450, 5); square(65, 450, 5); square(70, 450, 5); square(75, 450, 5); square(80, 450, 5); square(85, 450, 5); square(85, 445, 5); square(90, 445, 5); square(95, 445, 5); square(100, 445, 5); square(105, 445, 5); square(100, 450, 5); square(95, 450, 5); square(90, 450, 5); square(105, 450, 5); square(110, 450, 5); square(115, 450, 5); square(80, 455, 5); square(75, 455, 5); square(85, 455, 5); square(90, 455, 5); square(95, 455, 5); square(145, 450, 5); square(150, 450, 5); square(155, 450, 5); square(160, 450, 5); square(165, 450, 5); square(170, 450, 5); square(175, 450, 5); square(180, 450, 5); square(155, 455, 5); square(160, 455, 5); square(165, 455, 5); square(170, 455, 5); square(205, 450, 5); square(215, 450, 5); square(220, 450, 5); square(225, 450, 5); square(230, 450, 5); square(210, 450, 5); square(225, 455, 5); square(220, 455, 5); square(215, 455, 5); square(210, 455, 5); square(230, 455, 5); square(235, 455, 5); square(240, 455, 5); square(240, 450, 5); square(235, 450, 5); square(245, 450, 5); square(250, 450, 5); square(255, 450, 5); square(245, 455, 5); square(250, 455, 5); square(255, 455, 5); square(260, 455, 5); square(260, 450, 5); square(265, 450, 5); square(265, 455, 5); square(270, 455, 5); square(275, 450, 5); square(270, 450, 5); square(275, 455, 5); square(280, 450, 5); square(285, 450, 5); square(290, 450, 5); square(295, 450, 5); square(300, 450, 5); square(305, 450, 5); square(310, 450, 5); square(300, 455, 5); square(305, 455, 5); square(295, 455, 5); square(290, 455, 5); square(215, 460, 5); square(220, 460, 5); square(225, 460, 5); square(230, 460, 5); square(235, 460, 5); square(240, 460, 5); square(245, 460, 5); square(250, 460, 5); square(255, 460, 5); square(260, 460, 5); square(265, 460, 5); square(270, 460, 5); square(230, 465, 5); square(235, 465, 5); square(240, 465, 5); square(245, 465, 5); square(250, 465, 5); square(255, 465, 5); square(430, 450, 5); square(435, 450, 5); square(440, 450, 5); square(445, 450, 5); square(450, 450, 5); square(455, 450, 5); square(460, 450, 5); square(465, 450, 5); square(470, 450, 5); square(475, 450, 5); square(480, 450, 5); square(440, 455, 5); square(445, 455, 5); square(450, 455, 5); square(455, 455, 5); square(460, 455, 5); square(465, 455, 5); square(505, 450, 5); square(510, 450, 5); square(515, 450, 5); square(520, 450, 5); square(525, 450, 5); square(530, 450, 5); square(535, 450, 5); square(540, 450, 5); square(545, 450, 5); square(515, 455, 5); square(520, 455, 5); square(525, 455, 5); square(530, 455, 5); square(535, 455, 5); square(540, 455, 5); square(540, 460, 5); square(535, 460, 5); square(530, 460, 5); square(525, 460, 5); square(520, 460, 5); square(555, 450, 5); square(560, 450, 5); square(565, 450, 5); square(570, 450, 5); square(575, 450, 5); square(580, 450, 5); square(710, 450, 5); square(715, 450, 5); square(715, 455, 5); square(720, 455, 5); square(720, 450, 5); square(715, 460, 5); square(765, 450, 5); square(770, 450, 5); square(775, 450, 5); square(780, 450, 5); square(785, 450, 5); square(775, 455, 5); square(780, 455, 5);
                }
                fill(207);//rv bottom
                rect(235, 355, 330, 50);
                fill(118, 171, 133);//rv top
                rect(235, 280, 330, 75);
                square(235, 275, 5); square(240, 275, 5); square(245, 270, 5); square(250, 265, 5); square(255, 265, 5); square(260, 265, 5); square(260, 260, 5); square(265, 260, 5); square(270, 260, 5); square(275, 260, 5); square(275, 255, 5); square(280, 255, 5); square(285, 255, 5); square(290, 255, 5); square(290, 250, 5); square(295, 250, 5); square(300, 250, 5); square(305, 250, 5); square(310, 250, 5); square(315, 250, 5); square(320, 250, 5); square(325, 250, 5); square(330, 250, 5); square(330, 255, 5); square(335, 255, 5); square(340, 255, 5); square(345, 255, 5); square(350, 255, 5); square(355, 255, 5); square(360, 255, 5); square(365, 255, 5); square(370, 255, 5); square(375, 255, 5); square(380, 255, 5); square(385, 255, 5); square(385, 250, 5); square(390, 250, 5); square(395, 250, 5); square(400, 250, 5); square(405, 250, 5); square(410, 250, 5); square(415, 250, 5); square(420, 250, 5); square(425, 250, 5); square(430, 250, 5); square(435, 250, 5); square(435, 255, 5); square(440, 255, 5); square(445, 255, 5); square(450, 255, 5); square(455, 255, 5); square(460, 255, 5); square(465, 255, 5); square(470, 255, 5); square(475, 255, 5); square(480, 255, 5); square(485, 255, 5); square(490, 255, 5); square(495, 255, 5); square(500, 255, 5); square(505, 255, 5); square(510, 255, 5); square(510, 260, 5); square(515, 260, 5); square(520, 260, 5); square(525, 260, 5); square(525, 265, 5); square(530, 265, 5); square(535, 265, 5); square(540, 265, 5); square(550, 270, 5); square(555, 270, 5); square(555, 275, 5); square(560, 275, 5); square(545, 265, 5); square(335, 250, 5); square(340, 250, 5); square(345, 250, 5); square(350, 250, 5); square(355, 250, 5); square(360, 250, 5); square(365, 250, 5); square(370, 250, 5); square(375, 250, 5); square(380, 250, 5); square(400, 255, 5); square(405, 255, 5); square(410, 255, 5); square(440, 250, 5); square(445, 250, 5); square(450, 250, 5); square(455, 250, 5); square(460, 250, 5); square(465, 250, 5); square(470, 250, 5); square(475, 250, 5); square(480, 250, 5); square(485, 250, 5); square(490, 250, 5); square(495, 250, 5); square(500, 250, 5); square(505, 250, 5); square(515, 255, 5); square(520, 255, 5); square(530, 260, 5); square(535, 260, 5); square(245, 275, 5); square(250, 275, 5); square(255, 275, 5); square(260, 275, 5); square(265, 275, 5); square(270, 275, 5); square(275, 275, 5); square(280, 275, 5); square(285, 275, 5); square(290, 275, 5); square(295, 275, 5); square(300, 275, 5); square(305, 275, 5); square(310, 275, 5); square(315, 275, 5); square(320, 275, 5); square(325, 275, 5); square(330, 275, 5); square(335, 275, 5); square(340, 275, 5); square(345, 275, 5); square(350, 275, 5); square(355, 275, 5); square(360, 275, 5); square(365, 275, 5); square(370, 275, 5); square(375, 275, 5); square(380, 275, 5); square(385, 275, 5); square(390, 275, 5); square(395, 275, 5); square(400, 275, 5); square(405, 275, 5); square(410, 275, 5); square(415, 275, 5); square(420, 275, 5); square(425, 275, 5); square(430, 275, 5); square(435, 275, 5); square(440, 275, 5); square(445, 275, 5); square(450, 275, 5); square(455, 275, 5); square(460, 275, 5); square(465, 275, 5); square(470, 275, 5); square(475, 275, 5); square(480, 275, 5); square(485, 275, 5); square(490, 275, 5); square(495, 275, 5); square(500, 275, 5); square(505, 275, 5); square(510, 275, 5); square(515, 275, 5); square(520, 275, 5); square(525, 275, 5); square(530, 275, 5); square(535, 275, 5); square(540, 275, 5); square(545, 275, 5); square(550, 275, 5); square(545, 270, 5); square(540, 270, 5); square(535, 270, 5); square(530, 270, 5); square(525, 270, 5); square(520, 270, 5); square(515, 270, 5); square(510, 270, 5); square(505, 270, 5); square(500, 270, 5); square(495, 270, 5); square(505, 265, 5); square(510, 265, 5); square(515, 265, 5); square(520, 265, 5); square(505, 260, 5); square(500, 260, 5); square(490, 260, 5); square(485, 260, 5); square(480, 260, 5); square(475, 260, 5); square(470, 260, 5); square(465, 260, 5); square(460, 260, 5); square(455, 260, 5); square(450, 260, 5); square(445, 260, 5); square(440, 260, 5); square(435, 260, 5); square(430, 255, 5); square(425, 255, 5); square(420, 255, 5); square(415, 255, 5); square(395, 255, 5); square(390, 255, 5); square(325, 255, 5); square(320, 255, 5); square(315, 255, 5); square(310, 255, 5); square(305, 255, 5); square(300, 255, 5); square(295, 255, 5); square(290, 260, 5); square(285, 260, 5); square(280, 260, 5); square(280, 265, 5); square(275, 265, 5); square(270, 265, 5); square(265, 265, 5); square(260, 270, 5); square(255, 270, 5); square(250, 270, 5); square(265, 270, 5); square(270, 270, 5); square(285, 265, 5); square(290, 265, 5); square(285, 270, 5); square(275, 270, 5); square(280, 270, 5); square(290, 270, 5); square(295, 270, 5); square(300, 270, 5); square(305, 270, 5); square(310, 265, 5); square(305, 265, 5); square(300, 265, 5); square(295, 265, 5); square(300, 260, 5); square(305, 260, 5); square(295, 260, 5); square(310, 270, 5); square(315, 270, 5); square(315, 265, 5); square(315, 260, 5); square(320, 260, 5); square(310, 260, 5); square(320, 265, 5); square(325, 265, 5); square(325, 260, 5); square(320, 270, 5); square(325, 270, 5); square(330, 270, 5); square(330, 265, 5); square(335, 265, 5); square(340, 265, 5); square(345, 265, 5); square(345, 270, 5); square(340, 270, 5); square(335, 270, 5); square(330, 260, 5); square(335, 260, 5); square(340, 260, 5); square(345, 260, 5); square(350, 260, 5); square(355, 260, 5); square(360, 260, 5); square(365, 260, 5); square(370, 260, 5); square(375, 260, 5); square(380, 260, 5); square(385, 260, 5); square(390, 260, 5); square(395, 260, 5); square(400, 260, 5); square(405, 260, 5); square(410, 260, 5); square(415, 260, 5); square(420, 260, 5); square(425, 260, 5); square(430, 260, 5); square(455, 265, 5); square(460, 265, 5); square(465, 265, 5); square(470, 265, 5); square(475, 265, 5); square(480, 265, 5); square(485, 265, 5); square(490, 265, 5); square(495, 265, 5); square(500, 265, 5); square(495, 260, 5); square(490, 270, 5); square(485, 270, 5); square(480, 270, 5); square(475, 270, 5); square(470, 270, 5); square(465, 270, 5); square(460, 270, 5); square(450, 265, 5); square(445, 265, 5); square(445, 270, 5); square(440, 270, 5); square(450, 270, 5); square(455, 270, 5); square(435, 270, 5); square(430, 270, 5); square(430, 265, 5); square(425, 265, 5); square(420, 265, 5); square(415, 265, 5); square(410, 265, 5); square(405, 265, 5); square(400, 265, 5); square(395, 265, 5); square(395, 270, 5); square(390, 270, 5); square(385, 270, 5); square(380, 270, 5); square(375, 270, 5); square(375, 265, 5); square(370, 265, 5); square(365, 265, 5); square(360, 265, 5); square(355, 265, 5); square(350, 265, 5); square(350, 270, 5); square(355, 270, 5); square(360, 270, 5); square(365, 270, 5); square(370, 270, 5); square(380, 265, 5); square(390, 265, 5); square(400, 270, 5); square(385, 265, 5); square(405, 270, 5); square(410, 270, 5); square(415, 270, 5); square(420, 270, 5); square(425, 270, 5); square(435, 265, 5); square(440, 265, 5);
                fill(76, 186, 217);//windows
                rect(530, 300, 35, 70);
                rect(350, 300, 90, 40);
                fill(104, 196, 222);
                square(560, 325, 5); square(555, 330, 5); square(550, 330, 5); square(550, 335, 5); square(545, 335, 5); square(545, 340, 5); square(540, 340, 5); square(540, 345, 5); square(535, 345, 5); square(535, 350, 5); square(530, 350, 5); square(530, 355, 5); square(555, 325, 5); square(560, 320, 5); square(415, 300, 5); square(415, 305, 5); square(410, 305, 5); square(410, 310, 5); square(405, 310, 5); square(405, 315, 5); square(400, 315, 5); square(400, 320, 5); square(395, 320, 5); square(395, 325, 5); square(390, 325, 5); square(390, 330, 5); square(385, 330, 5); square(385, 335, 5); square(380, 335, 5); square(420, 300, 5);
                fill(168);//door
                square(450, 400, 5); square(450, 395, 5); square(450, 390, 5); square(450, 385, 5); square(450, 380, 5); square(450, 375, 5); square(450, 370, 5); square(450, 365, 5); square(450, 360, 5); square(450, 355, 5); square(450, 350, 5); square(450, 345, 5); square(450, 340, 5); square(450, 335, 5); square(450, 330, 5); square(450, 325, 5); square(450, 320, 5); square(455, 320, 5); square(460, 320, 5); square(465, 320, 5); square(470, 320, 5); square(475, 320, 5); square(480, 320, 5); square(485, 320, 5); square(485, 400, 5); square(485, 395, 5); square(485, 390, 5); square(485, 385, 5); square(485, 380, 5); square(485, 375, 5); square(485, 370, 5); square(485, 365, 5); square(485, 360, 5); square(485, 355, 5); square(485, 350, 5); square(485, 345, 5); square(485, 340, 5); square(485, 335, 5); square(485, 330, 5); square(485, 325, 5); square(455, 400, 5); square(460, 400, 5); square(465, 400, 5); square(470, 400, 5); square(475, 400, 5); square(480, 400, 5);
                fill(0);//wheels
                circle(510, 405, 30);
                circle(300, 405, 30);
                fill(255, bar0);
                rect(0, 0, 800, 600);
                fill(255, bar5);
                rect(0, 0, 800, 600);
                if (bar0 > 0) {
                    bar0 -= 1;
                    bar4 = Date.now();
                }
                if (Date.now() - bar4 >= 5000) {
                    bar5 += 1;
                }
                if (Date.now() - bar4 >= 9250) {
                    bar0 = 0;
                    bar1 = 0;
                    bar2 = 0;
                    bar3 = 0;
                    bar4 = 0;
                    bar5 = 0;
                    scene += 1;
                }
                break;
            case 1:
                background(104, 177, 204);
                image(mocks[0], 0, 0, 800, 600);
                switch (mouseCase) {
                    case 0:
                        break;
                    case 1:
                        break;
                }
                break;
        }
        drawLayer();
    }
})();
