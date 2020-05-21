"use strict";
var mousePressed;
var keyPressed;
var unks = [];
var mouseCase = 0;
var scene = 0;
var fov = 0;
var name = "";
function preload() {
    for (let i = 0; i < 1; i++) {
        unks[i] = loadImage("unk" + i + ".png");
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
                switch (mouseCase) {
                    case 0:
                        break;
                }
		break;
        }
    }
})();