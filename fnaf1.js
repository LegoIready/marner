var night = 1;
var power = 100;
var timeHour = 0;
var timeMinute = 0;
var doorL = 0;
var doorR = 0;
var lightL = 0;
var lightR = 0;
var counting = 0;
var now;
var then;
var dead = 0;
var posFreddy = 0;
var posBonnie = 0;
var posChica = 0;
var posFoxy = 0;
var xFoxy = 500;
function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
};
var door = function (lr) {
    fill(255, 0, 0);
    if (lr === 0) {
        rect(0, 150, 50, 50);
        if (mouseX <= 50 && mouseY >= 150 && mouseY <= 200) {
            mouseClicked = function () {
                if (doorL === 0) {
                    doorL = 1;
                }
                else if (doorL === 1) {
                    doorL = 0;
                }
            };
        }
        else {
            mouseClicked = function () { };
        }
    }
    if (lr === 1) {
        rect(350, 150, 50, 50);
        if (mouseX >= 350 && mouseY >= 150 && mouseY <= 200) {
            mouseClicked = function () {
                if (doorR === 0) {
                    doorR = 1;
                }
                else if (doorR === 1) {
                    doorR = 0;
                }
            };
        }
        else {
            mouseClicked = function () { };
        }
    }
};
var light = function (lr) {
    fill(120, 120, 120);
    if (lr === 0) {
        rect(0, 200, 50, 50);
        if (mouseX <= 50 && mouseY >= 200 && mouseY <= 250 && mouseIsPressed) {
            lightL = 1;
            if (posBonnie === 6) {
                fill(49, 32, 81);
                rect(155, 60, 40, 40);
                rect(165, 100, 20, 20);
                rect(150, 110, 50, 40);
                rect(155, 50, 15, 10);
                rect(180, 50, 15, 10);
            }
        }
        else {
            lightL = 0;
        }
    }
    if (lr === 1) {
        rect(350, 200, 50, 50);
        if (mouseX >= 350 && mouseY >= 200 && mouseY <= 250 && mouseIsPressed) {
            lightR = 1;
            if (posChica === 6) {
                fill(138, 124, 36);
                rect(205, 60, 40, 40);
                rect(215, 100, 20, 20);
                rect(200, 110, 50, 40);
                fill(255, 255, 255);
                rect(205, 110, 40, 40);
            }
        }
        else {
            lightR = 0;
        }
    }
};
var timer = function () {
    then = millis();
    if (counting === 0) {
        now = millis();
        counting = 1;
    }
    else if (counting === 1 && (then - now) >= 10000) {
        timeMinute += 1;
        if (timeMinute === 7) {
            timeMinute = 0;
            timeHour++;
        }
        power--;
        if (doorL === 1) {
            power -= 2;
        }
        if (doorR === 1) {
            power -= 2;
        }
        if (lightL === 1) {
            power--;
        }
        if (lightR === 1) {
            power--;
        }
        if (mouseY >= 350) {
            power--;
        }
        var randomPower = round(random(0, 9));
        if (power < 0 && randomPower === 0) {
            posFreddy = 6;
        }
        if (night === 1) {
            var randomMove = round(random(0, 4));
            if (randomMove === 0) {
                posBonnie++;
            }
        }
        if (night === 2) {
            var randomMove = round(random(0, 4));
            if (randomMove === 0) {
                posBonnie++;
            }
            else if (randomMove === 1) {
                posChica++;
            }
            randomMove = round(random(0, 9));
            if (randomMove === 0) {
                posFoxy++;
            }
        }
        if (night === 3) {
            var randomMove = round(random(0, 4));
            if (randomMove === 0) {
                posBonnie++;
            }
            else if (randomMove === 1) {
                posChica++;
            }
            else if (randomMove === 2) {
                posFreddy++;
            }
            randomMove = round(random(0, 9));
            if (randomMove === 0) {
                posFoxy++;
            }
        }
        if (night === 4) {
            var randomMove = round(random(0, 3));
            if (randomMove === 0) {
                posBonnie++;
            }
            else if (randomMove === 1) {
                posChica++;
            }
            else if (randomMove === 2) {
                posFreddy++;
            }
            randomMove = round(random(0, 8));
            if (randomMove === 0) {
                posFoxy++;
            }
        }
        if (night === 5) {
            var randomMove = round(random(0, 2));
            if (randomMove === 0) {
                posBonnie++;
            }
            else if (randomMove === 1) {
                posChica++;
            }
            else if (randomMove === 2) {
                posFreddy++;
            }
            randomMove = round(random(0, 7));
            if (randomMove === 0) {
                posFoxy++;
            }
        }
        if (night === 6) {
            var randomMove = round(random(0, 2));
            if (randomMove === 0) {
                posBonnie++;
            }
            else if (randomMove === 1) {
                posChica++;
            }
            else if (randomMove === 2) {
                posFreddy++;
            }
            randomMove = round(random(0, 6));
            if (randomMove === 0) {
                posFoxy++;
            }
        }
        counting = 0;
    }
    fill(255, 255, 255);
    text(power + "%", 10, 20);
    var timeHourDisplay;
    if (timeHour === 0) {
        timeHourDisplay = 12;
    }
    else {
        timeHourDisplay = timeHour;
    }
    text(timeHourDisplay + ":00", 10, 35);
    if (power < 0) {
        doorL = 0;
        doorR = 0;
        background(0, 0, 0);
        fill(255, 255, 255);
        ellipse(35, 140, 20, 20);
        ellipse(65, 140, 20, 20);
        fill(0, 0, 0);
        ellipse(35, 140, 5, 5);
        ellipse(65, 140, 5, 5);
        rect(25, 130, 20, 5);
        rect(55, 130, 20, 5);
    }
};
var cams = function () {
    if (posFoxy === 3) {
        xFoxy -= 5;
    }
    if (mouseY >= 350) {
        background(51, 51, 51);
        if (mouseX <= 40) {//1A
            fill(255, 255, 255);
            rect(0, 195, 400, 100);
            fill(0);
            rect(0, 195, 50, 50);
            rect(100, 195, 50, 50);
            rect(200, 195, 50, 50);
            rect(300, 195, 50, 50);
            rect(50, 245, 50, 50);
            rect(150, 245, 50, 50);
            rect(250, 245, 50, 50);
            rect(350, 245, 50, 50);
            if (posFreddy === 0) {
                fill(82, 55, 31);
                rect(268, 176, 80, 227);
                rect(250, 176, 117, 78);
                rect(286, 161, 47, 40);
                rect(273, 101, 73, 63);
                fill(0);
                rect(263, 95, 92, 18);
                rect(273, 56, 70, 42);
                rect(275, 245, 9, 9);
                fill(122, 122, 122);
                rect(250, 245, 25, 9);
            }
            if (posBonnie === 0) {
                fill(49, 31, 82);
                rect(26, 176, 80, 227);
                rect(7, 176, 117, 78);
                rect(40, 161, 47, 40);
                rect(28, 101, 73, 63);
                rect(33, 65, 28, 73);
                rect(68, 65, 28, 73);
                fill(186, 0, 0);
                rect(72, 189, 40, 123);
                rect(56, 264, 69, 62);
            }
            if (posChica === 0) {
                fill(138, 124, 36);
                rect(154, 176, 80, 227);
                rect(137, 176, 117, 78);
                rect(174, 161, 47, 40);
                rect(161, 101, 73, 63);
                fill(255, 255, 255);
                rect(155, 176, 84, 64);
            }
        }
        else if (mouseX >= 40 && mouseX <= 80) {//1B
            fill(196, 196, 196);
            rect(10, 230, 368, 126);
            fill(227, 185, 59);
            rect(149, 197, 67, 41);
            fill(214, 34, 34);
            rect(176, 177, 16, 20);
            if (posFreddy === 1) {
                fill(255, 255, 255);
                rect(250, 100, 5, 5);
                rect(268, 100, 5, 5);
            }
            if (posBonnie === 1) {
                fill(49, 31, 82);
                rect(226, 176, 80, 227);
                rect(207, 176, 117, 78);
                rect(240, 161, 47, 40);
                rect(228, 101, 73, 63);
                rect(233, 65, 28, 73);
                rect(268, 65, 28, 73);
            }
            if (posChica === 1) {
                fill(138, 124, 36);
                rect(54, 176, 80, 227);
                rect(37, 176, 117, 78);
                rect(74, 161, 47, 40);
                rect(61, 101, 73, 63);
                fill(255, 255, 255);
                rect(55, 176, 84, 64);
            }
        }
        else if (mouseX >= 80 && mouseX <= 120) {//5
            fill(38, 38, 38);
            rect(330, 56, 100, 300);
            rect(-12, 246, 200, 200);
            fill(184, 184, 184);
            rect(24, 204, 50, 50);
            fill(36, 23, 61);
            rect(101, 204, 50, 50);
            rect(103, 175, 21, 50);
            rect(127, 175, 21, 50);
            if (posBonnie === 2) {
                fill(49, 31, 82);
                rect(226, 176, 80, 227);
                rect(207, 176, 117, 78);
                rect(240, 161, 47, 40);
                rect(228, 101, 73, 63);
                rect(233, 65, 28, 73);
                rect(268, 65, 28, 73);
            }
        }
        else if (mouseX >= 120 && mouseX <= 160) {//1C
            fill(83, 0, 138);
            rect(0, 0, 190, 400);
            rect(210, 0, 190, 400);
            fill(201, 201, 201);
            rect(56, 250, 100, 65);
            fill(0);
            text("OUT OF ORDER", 59, 275);
            fill(59, 33, 13);
            rect(90, 315, 24, 47);
            if (posFoxy === 1) {
                fill(51, 51, 51);
                rect(210, 0, 59, 400);
                fill(135, 43, 43);
                rect(166, 119, 74, 74);
                rect(190, 203, 40, 171);
                rect(190, 182, 29, 40);
                rect(190, 225, 90, 40);
                push();
                rotate(-45);
                rect(18, 182, 30, 51);
                rotate(90);
                rect(240, -108, 30, 51);
                pop();
                fill(79, 79, 79);
                rect(280, 230, 24, 11);
                rect(297, 230, 11, 24);
                fill(0);
                rect(175, 130, 30, 12);
            }
            if (posFoxy === 2) {
                fill(51, 51, 51);
                rect(160, 0, 145, 400);
                fill(135, 43, 43);
                rect(115, 207, 100, 100);
                rect(0, 198, 97, 128);
                rect(71, 225, 90, 69);
                push();
                rotate(-45);
                rect(-79, 344, 30, 51);
                rotate(90);
                rect(281, -30, 30, 51);
                pop();
                fill(0);
                rect(181, 218, 12, 30);
            }
            if (posFoxy === 3) {
                fill(51, 51, 51);
                rect(160, 0, 145, 400);
            }
        }
        else if (mouseX >= 160 && mouseX <= 200) {//3
            fill(255, 255, 255);
            rect(0, 195, 400, 100);
            fill(0);
            rect(0, 195, 50, 50);
            rect(100, 195, 50, 50);
            rect(200, 195, 50, 50);
            rect(300, 195, 50, 50);
            rect(50, 245, 50, 50);
            rect(150, 245, 50, 50);
            rect(250, 245, 50, 50);
            rect(350, 245, 50, 50);
            fill(122, 122, 122);
            rect(180, 0, 20, 50);
            fill(255, 255, 255);
            rect(180, 50, 20, 20);
            if (posBonnie === 3) {
                fill(49, 31, 82);
                rect(26, 176, 80, 227);
                rect(7, 176, 117, 78);
                rect(40, 161, 47, 40);
                rect(28, 101, 73, 63);
                rect(33, 65, 28, 73);
                rect(68, 65, 28, 73);
            }
        }
        else if (mouseX >= 200 && mouseX <= 240) {//2A
            fill(255, 255, 255);
            rect(0, 195, 400, 100);
            fill(0);
            rect(0, 195, 50, 50);
            rect(100, 195, 50, 50);
            rect(200, 195, 50, 50);
            rect(300, 195, 50, 50);
            rect(50, 245, 50, 50);
            rect(150, 245, 50, 50);
            rect(250, 245, 50, 50);
            rect(350, 245, 50, 50);
            if (posBonnie === 4) {
                fill(20, 20, 20);
                rect(326, 176, 80, 227);
                rect(307, 176, 117, 78);
                rect(340, 161, 47, 40);
                rect(328, 101, 73, 63);
                rect(333, 65, 28, 73);
                rect(368, 65, 28, 73);
            }
            if (posFoxy === 3) {
                fill(135, 43, 43);
                rect(xFoxy + 66, 119, 74, 74);
                rect(xFoxy + 64, 203, 77, 171);
                rect(xFoxy + 90, 182, 29, 40);
                rect(xFoxy + 106, 225, 90, 40);
                rect(xFoxy + 8, 225, 90, 40);
                fill(79, 79, 79);
                rect(xFoxy + 195, 230, 24, 11);
                rect(xFoxy + 211, 230, 11, 24);
                fill(0);
                rect(xFoxy + 75, 130, 30, 12);
            }
        }
        else if (mouseX >= 240 && mouseX <= 280) {//2B
            fill(255, 255, 255);
            rect(0, 195, 400, 100);
            fill(0);
            rect(0, 195, 50, 50);
            rect(100, 195, 50, 50);
            rect(200, 195, 50, 50);
            rect(300, 195, 50, 50);
            rect(50, 245, 50, 50);
            rect(150, 245, 50, 50);
            rect(250, 245, 50, 50);
            rect(350, 245, 50, 50);
            if (posBonnie === 5) {
                fill(49, 31, 82);
                rect(26, 176, 80, 227);
                rect(7, 176, 117, 78);
                rect(40, 161, 47, 40);
                rect(28, 101, 73, 63);
                rect(33, 65, 28, 73);
                rect(68, 65, 28, 73);
            }
        }
        else if (mouseX >= 280 && mouseX <= 320) {//7
            fill(38, 38, 38);
            rect(72, 50, 131, 400);
            rect(283, 50, 131, 400);
            fill(201, 201, 201);
            rect(9, 184, 50, 50);
            rect(220, 184, 50, 50);
            fill(0);
            ellipse(35, 197, 20, 20);
            triangle(15, 225, 55, 225, 35, 190);
            rect(25, 222, 20, 9);
            ellipse(245, 197, 20, 20);
            rect(231, 203, 27, 20);
            rect(235, 211, 20, 20);
            if (posFreddy === 2) {
                fill(255, 255, 255);
                rect(91, 151, 5, 5);
                rect(120, 151, 5, 5);
            }
            if (posChica === 2) {
                fill(138, 124, 36);
                rect(154, 176, 80, 227);
                rect(137, 176, 117, 78);
                rect(174, 161, 47, 40);
                rect(161, 101, 73, 63);
                fill(255, 255, 255);
                rect(155, 176, 84, 64);
            }
        }
        else if (mouseX >= 320 && mouseX <= 360) {//4A
            fill(255, 255, 255);
            rect(0, 195, 400, 100);
            fill(0);
            rect(0, 195, 50, 50);
            rect(100, 195, 50, 50);
            rect(200, 195, 50, 50);
            rect(300, 195, 50, 50);
            rect(50, 245, 50, 50);
            rect(150, 245, 50, 50);
            rect(250, 245, 50, 50);
            rect(350, 245, 50, 50);
            if (posFreddy === 4) {
                fill(20, 20, 20);
                rect(-12, 176, 80, 227);
                rect(-30, 176, 117, 78);
                rect(6, 161, 47, 40);
                rect(-7, 101, 73, 63);
                rect(-17, 95, 92, 18);
                rect(-7, 56, 70, 42);
            }
            if (posChica === 4) {
                fill(138, 124, 36);
                rect(254, 176, 80, 227);
                rect(237, 176, 117, 78);
                rect(274, 161, 47, 40);
                rect(261, 101, 73, 63);
                fill(255, 255, 255);
                rect(255, 176, 84, 64);
            }
        }
        else if (mouseX >= 360) {//4B
            fill(255, 255, 255);
            rect(0, 195, 400, 100);
            fill(0);
            rect(0, 195, 50, 50);
            rect(100, 195, 50, 50);
            rect(200, 195, 50, 50);
            rect(300, 195, 50, 50);
            rect(50, 245, 50, 50);
            rect(150, 245, 50, 50);
            rect(250, 245, 50, 50);
            rect(350, 245, 50, 50);
            if (posFreddy === 5) {
                fill(20, 20, 20);
                rect(268, 176, 80, 227);
                rect(250, 176, 117, 78);
                rect(286, 161, 47, 40);
                rect(273, 101, 73, 63);
                rect(263, 95, 92, 18);
                rect(273, 56, 70, 42);
            }
            if (posChica === 5) {
                fill(138, 124, 36);
                rect(254, 176, 80, 227);
                rect(237, 176, 117, 78);
                rect(274, 161, 47, 40);
                rect(261, 101, 73, 63);
                fill(255, 255, 255);
                rect(255, 176, 84, 64);
            }
        }
    }
    fill(255, 111, 0);
    rect(0, 350, 400, 50);
    fill(255, 140, 0);
    rect(40, 350, 40, 50);
    rect(120, 350, 40, 50);
    rect(200, 350, 40, 50);
    rect(280, 350, 40, 50);
    rect(360, 350, 40, 50);
    fill(0, 0, 0);
    text("1A", 10, 375);
    text("1B", 50, 375);
    text("5", 90, 375);
    text("1C", 130, 375);
    text("3", 170, 375);
    text("2A", 210, 375);
    text("2B", 250, 375);
    text("7", 290, 375);
    text("4A", 330, 375);
    text("4B", 370, 375);
};
var death = function () {
    if (posFreddy >= 6) {
        if (doorR === 0) {
            push();
            rotate(-45);
            fill(82, 55, 31);
            rect(-150, 150, 300, 300);
            rect(-100, 450, 200, 115);
            fill(0);
            rect(-100, 300, 200, 100);
            rect(-75, 200, 50, 50);
            rect(25, 200, 50, 50);
            rect(-200, 0, 500, 175);
            fill(255, 255, 255);
            rect(-100, 300, 200, 20);
            rect(-100, 380, 200, 20);
            rect(-55, 220, 10, 10);
            rect(45, 220, 10, 10);
            pop();
            dead = 1;
        }
        else if (doorR === 1) {
            posFreddy = round(random(1, 5));
        }
    }
    else if (timeHour >= 6) {
        background(0, 0, 0);
        fill(255, 255, 255);
        text("CONGRATULATIONS!", 140, 200);
        fill(43, 255, 0);
        rect(100, 230, 200, 50);
        fill(0);
        text("NEXT NIGHT", 165, 260);
        if (mouseX >= 100 && mouseX <= 300 && mouseY >= 230 && mouseY <= 280) {
            mouseClicked = function () {
                night++;
                dead = 0;
                posBonnie = 0;
                posChica = 0;
                posFreddy = 0;
                posFoxy = 0;
                power = 100;
                doorL = 0;
                doorR = 0;
                timeHour = 0;
                timeMinute = 0;
                mouseClicked = function () { };
            };
        }
        dead = 1;
    }
    else if (posBonnie >= 7) {
        if (doorL === 0) {
            push();
            rotate(15);
            fill(49, 32, 81);
            rect(100, 0, 300, 300);
            rect(150, 300, 200, 115);
            rect(125, -60, 100, 100);
            rect(275, -105, 100, 142);
            fill(112, 28, 28);
            rect(150, 150, 200, 100);
            fill(255, 255, 255);
            rect(175, 50, 50, 50);
            rect(275, 50, 50, 50);
            rect(150, 150, 200, 20);
            rect(150, 230, 200, 20);
            fill(255, 0, 255);
            rect(190, 65, 20, 20);
            rect(290, 65, 20, 20);
            pop();
            dead = 1;
        }
        else if (doorL === 1) {
            posBonnie = round(random(1, 6));
        }
    }
    else if (posChica >= 7) {
        if (doorR === 0) {
            push();
            rotate(-70);
            fill(196, 167, 22);
            rect(-275, 100, 300, 300);
            rect(-225, 400, 200, 115);
            rect(-139, 60, 50, 50);
            fill(112, 28, 28);
            rect(-225, 250, 200, 100);
            fill(255, 255, 255);
            rect(-200, 150, 50, 50);
            rect(-100, 150, 50, 50);
            rect(-279, 435, 262, 115);
            fill(255, 140, 0);
            rect(-225, 250, 200, 20);
            rect(-225, 330, 200, 20);
            fill(255, 0, 255);
            rect(-185, 165, 20, 20);
            rect(-85, 165, 20, 20);
            pop();
            push();
            rotate(-45);
            fill(196, 167, 22);
            rect(-45, 96, 20, 50);
            pop();
            push();
            rotate(-90);
            fill(196, 167, 22);
            rect(-187, 15, 20, 50);
            pop();
            dead = 1;
        }
        else if (doorR === 1) {
            posChica = round(random(1, 6));
        }
    }
    else if (xFoxy <= -300) {
        if (doorL === 0) {
            push();
            rotate(45);
            fill(135, 43, 43);
            rect(125, -150, 300, 300);
            rect(175, 150, 200, 158);
            fill(0, 0, 0);
            rect(175, 0, 200, 100);
            rect(200, -125, 50, 15);
            fill(255, 255, 255);
            rect(200, -100, 50, 50);
            rect(300, -100, 50, 50);
            rect(225, 0, 20, 20);
            rect(175, 80, 200, 20);
            fill(255, 170, 0);
            rect(300, 0, 20, 20);
            rect(215, -85, 20, 20);
            rect(315, -85, 20, 20);
            pop();
            fill(135, 43, 43);
            rect(150, 0, 100, 50);
            rect(350, 150, 50, 100);
            dead = 1;
        }
        else if (doorL === 1) {
            xFoxy = 500;
            posFoxy = 0;
        }
    }
};
var office = function () {
    background(77, 77, 77);
    fill(43, 43, 43);
    rect(0, 200, 400, 200);
    if (mouseX <= 100) {
        if (doorL === 0) {
            fill(0, 0, 0);
        }
        else if (doorL === 1) {
            fill(99, 99, 99);
        }
        rect(50, 0, 100, 400);
        fill(77, 77, 77);
        rect(0, 0, 50, 400);
        if (lightL === 0) {
            fill(56, 56, 56);
        }
        else if (lightL === 1) {
            fill(186, 186, 186);
        }
        rect(150, 50, 50, 100);
        door(0);
        light(0);
    }
    if (mouseX >= 300) {
        if (doorR === 0) {
            fill(0, 0, 0);
        }
        else if (doorR === 1) {
            fill(99, 99, 99);
        }
        rect(250, 0, 100, 400);
        fill(77, 77, 77);
        rect(350, 0, 50, 400);
        if (lightR === 0) {
            fill(56, 56, 56);
        }
        else if (lightR === 1) {
            fill(186, 186, 186);
        }
        rect(200, 50, 50, 100);
        door(1);
        light(1);
    }
    if (mouseX >= 100 && mouseX <= 300) {
        if (doorL === 0) {
            fill(0, 0, 0);
        }
        else if (doorL === 1) {
            fill(99, 99, 99);
        }
        rect(0, 0, 50, 400);
        if (doorR === 0) {
            fill(0, 0, 0);
        }
        else if (doorR === 1) {
            fill(99, 99, 99);
        }
        rect(350, 0, 50, 400);
        fill(56, 56, 56);
        rect(50, 50, 50, 100);
        rect(300, 50, 50, 100);
    }
    cams();
};
function draw() {
    noStroke();
    if (dead === 0) {
        office();
        timer();
    }
    death();
};
