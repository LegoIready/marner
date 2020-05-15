"use strict";
var mouseClicked;
var mouseCase = 0;
var scene = 0;
var fov = 0;
function setup() {
    if (localStorage.key(0)==="save") { saveGame(1); }
    setInterval(saveGame(0), 30000);
    createCanvas(800, 600);
    document.body.appendChild(document.createElement("br"));
    let bar0 = document.createElement("input");
    bar0.id = "savelog";
    document.body.appendChild(bar0);
    bar0 = document.createElement("button");
    bar0.setAttribute("onclick", "saveGame(2)");
    bar0.innerText = "SAVE";
    document.body.appendChild(bar0);
    bar0 = document.createElement("button");
    bar0.setAttribute("onclick", "saveGame(3)");
    bar0.innerText = "LOAD";
    document.body.appendChild(bar0);
    noStroke();
    textFont("Courier New");
    textSize(20);
}
function saveGame(man) {
    const saveLog = document.getElementById("savelog");
    switch (man) {
        case 0:
            localStorage.setItem("save", btoa(mouseCase + "," + scene + "," + fov));
            break;
        case 1:
            const j = atob(localStorage.getItem("save")).split(",");
            mouseCase = parseInt(j[0]);
            scene = parseInt(j[1]);
            fov = parseInt(j[2]);
            break;
        case 2:
            saveLog.value = btoa(mouseCase + "," + scene + "," + fov);
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
            saveGame(0);
            break;
    }
}
function dialogue(msg, scn, msc, sender) {
    textFont("Courier New");
    textSize(20);
    mouseClicked = function () {
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
    mouseClicked = function () {
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
function prompt() {

}
var drawLayer = (function () {
    var saveLog;
    const drawX = [];
    const drawY = [];
    const reflect = 1;
    return function () {
        saveLog = document.getElementById("savelog");
        const h = Math.floor(mouseX / 5) * 5;
        const k = Math.floor((mouseY + fov) / 5) * 5;
        const l = (h < 400) ? (395 - h) + 400 : 400 - (h - 395);
        if (mouseIsPressed && mouseY <= 600 && !saveLog.value.includes("(" + h + "," + k)) {
            saveLog.value += "rect(" + h + "," + k + ",5,5);";
            drawX.push(h);
            drawY.push(k);
            if (reflect === 1) {
                saveLog.value += "rect(" + l + "," + k + ",5,5);";
                drawX.push(l);
                drawY.push(k);
            }
        }
        const j = drawX.length;
        fill(0);
        rect(h, k, 5, 5);
        if (reflect === 1) { rect(l, k, 5, 5); }
        for (let i = 0; i <= j; i++) {
            rect(drawX[i], drawY[i], 5, 5);
        }
    }
})();
function draw() {
    switch (scene) {
        case 0:
            background(0);
            switch (mouseCase) {
                case 0:
                    dialogue("asdf", 0, 0,"Thoraxis");
                    break;
            }
            break;
        case 1:
            background(0);
            switch (mouseCase) {
                case 0:
                    break;
            }
            break;
    }
    drawLayer();
}
