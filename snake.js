var snakeSize = 10;
var canvas;
var direction = {};
var food;
var ctx;
var score = 0;

window.onload = ()=>{
    direction.dir = 'r';
    direction.x = snakeSize;
    direction.y = 0;

    food = new Food();
    canvas = document.getElementById('game');
    ctx = canvas.getContext('2d');
    let snk = new Snake();
}

window.onkeydown = (event)=>{
    switch(event.keyCode) {
        case 37:
            direction.dir = 'l';
            direction.x = -snakeSize;
            direction.y = 0;
            break;
        case 38:
            direction.dir = 'u';
            direction.x = 0;
            direction.y = -snakeSize;
            break;
        case 39:
            direction.dir = 'r';
            direction.x = snakeSize;
            direction.y = 0;
            break;
        case 40:
            direction.dir = 'd';
            direction.x = 0;
            direction.y = snakeSize;
            break;
    }
}


class Snake {
    constructor() {
        let canvas = document.getElementById('game');
        this.body = [[canvas.width/2, canvas.height/2]];
        for(let i = 1; i < 4; i++) {
            this.body[i] = [this.body[i-1][0] - snakeSize, this.body[i-1][1]];
        }

        setInterval(updateSnake, 150, this);
    }
}

class Food {
    constructor() {
        this.x = Math.floor(Math.random()*10)*70;
        this.y = Math.floor(Math.random()*10)*50;
    }
}

function updateFood() {
    food.x = Math.floor(Math.random()*10)*70;
    food.y = Math.floor(Math.random()*10)*50;
}

function updateSnake(snake) {

    snake.body.unshift([snake.body[0][0] + direction.x, snake.body[0][1] + direction.y]);
    
    if(snake.body[0][0] == food.x && snake.body[0][1] == food.y) {
        updateFood();
        score+=10;
    }
    else {
        snake.body.pop();
    }


    canvas.width = canvas.width;

    for(let i = 0; i < snake.body.length; i++) {
        drawBlock(snake.body[i][0], snake.body[i][1]);
    }

    drawScore();
    drawBlock(food.x, food.y);

}

function drawBlock(x, y) {
    ctx.fillRect(x - 1, y - 1, snakeSize - 2, snakeSize - 2);
}

function drawScore() {
    let alpha = 0.4;
    ctx.font = "30px Arial";
    ctx.strokeStyle = "rgba(0, 0, 0, " + alpha + ")";
    ctx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";;
    ctx.fillText("Score: " + score, 10, 50);
    ctx.strokeText("Score: " + score, 10, 50);
    ctx.fillStyle = 'black';
}