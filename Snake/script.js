var snake = [[10, 10], [10, 11], [10, 12]];

var moveEnum = {
    LEFT: 0,
    TOP: 1,
    RIGHT: 2,
    DOWN: 3
}

var timerId = null;
var gameStarted = false;
var move = moveEnum.LEFT;
var moved = false;

function genDivs(v) {
    var e = document.body;
    var cellSize = 25;
    for (var i = 0; i < v; i++) {
        var row = document.createElement("div");
        row.className = "row";
        row.style.height = cellSize + 1 + "px";
        for (var x = 0; x < v; x++) {
            var cell = document.createElement("div");
            cell.className = "gridsquare";
            cell.style.width = cellSize + "px";
            cell.style.height = cellSize + "px";
            cell.id = ((i * v) + x).toString();
            if (snake[0][0] == i && (x > 9 && x < 13))
                cell.style.background = "green";
            else {
                cell.style.background = "white";
            }
            row.appendChild(cell);
        }
        e.appendChild(row);
    }
}

function func() {
    alert("You are dead");
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createApple() {
    while (true) {
        var apple = [0, 0];
        apple[0] = getRandomInt(0, 20);
        apple[1] = getRandomInt(0, 20);
        var id = (apple[0] * 20 + apple[1]).toString();
        var appleCell = document.getElementById(id);
        if (appleCell.style.background != "green" && appleCell.style.background != "black") {
            appleCell.style.background = "red";
            break;
        }
    }
}

function createRocks() {
	var rocks = 7;
    while (true) {
        var trap = [0, 0];
        trap[0] = getRandomInt(0, 20);
        trap[1] = getRandomInt(0, 20);
        var id = (trap[0] * 20 + trap[1]).toString();
        var trapCell = document.getElementById(id);
        if (trapCell.style.background != "green" && trapCell.style.background != "red") {
            trapCell.style.background = "black";
			rocks--;
			if (rocks == 0)
				break;
        }
    }
}
function startMoving() {
    if (gameStarted == true) {
        snake = [[10, 10], [10, 11], [10, 12]];
        var cells = document.getElementsByClassName("gridsquare");
        for (var i = 0; i < cells.length; ++i) {
            if (cells[i].id != "210" && cells[i].id != "211" && cells[i].id != "212")
                cells[i].style.background = "white";
            else
                cells[i].style.background = "green";
        }
        move = moveEnum.LEFT;
        clearInterval(timerId);
    }
    gameStarted = true;
    createApple();
	createRocks();
    timerId = setInterval(function () {
        var x = snake[0][0];
        var y = snake[0][1];
        var dead = false;
        if (move == moveEnum.LEFT) {
            if (y - 1 < 0)
                dead = true;
            else
                snake.unshift([x, y - 1]);
        }
        if (move == moveEnum.RIGHT) {
            if (y + 1 > 19)
                dead = true;
            else
                snake.unshift([x, y + 1]);
        }
        if (move == moveEnum.TOP) {
            if (x - 1 < 0) {
                dead = true;
            }
            else
                snake.unshift([x - 1, y]);
        }
        if (move == moveEnum.DOWN) {
            if (x + 1 > 19)
                dead = true;
            else
                snake.unshift([x + 1, y]);
        }
        var head = snake[0];
        var headCell = document.getElementById(((head[0] * 20) + head[1]).toString());
        if (headCell.style.background == "white") {
            var tail = snake.pop();
            var tailCell = document.getElementById(((tail[0] * 20) + tail[1]).toString());
            tailCell.style.background = "white";
        }
        else if (headCell.style.background == "green" || headCell.style.background == "black") {
            dead = true;
        }
        else if (headCell.style.background == "red") {
            createApple();
        }
        headCell.style.background = "green";
        if (dead == true) {
            clearInterval(timerId);
            setTimeout(func, 10);
        }
        moved = false;
    }, 200);
}
function changeDirection(e) {
    if (moved == false) {
        switch (e.keyCode) {
            case 37:  // если нажата клавиша влево
                if (move != moveEnum.RIGHT)
                    move = moveEnum.LEFT;
                break;
            case 38:   // если нажата клавиша вверх
                if (move != moveEnum.DOWN)
                    move = moveEnum.TOP;
                break;
            case 39:   // если нажата клавиша вправо
                if (move != moveEnum.LEFT)
                    move = moveEnum.RIGHT;
                break;
            case 40:   // если нажата клавиша вниз
                if (move != moveEnum.TOP)
                    move = moveEnum.DOWN;
                break;
        }
        moved = true;
    }
}
addEventListener("keydown", changeDirection);