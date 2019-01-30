var snakeSize = 10;
var canvas;
var direction = {};
var food;
var ctx;
var score = 0;
var gameover = false;

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

        setTimeout(updateSnake, 120, this);
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

    let temp_x = snake.body[0][0] + direction.x;
    let temp_y = snake.body[0][1] + direction.y;
    
    if(temp_x >= 700) {
        temp_x = 0;
    }
    if(temp_x < 0) {
        temp_x = 700 - snakeSize;
    }
    
    if(temp_y >= 500) {
        temp_y = 0;
    }
    if(temp_y < 0) {
        temp_y = 500 - snakeSize;
    }
    
    snake.body.unshift([temp_x, temp_y]);
    
    checkGameOver(snake.body);
    
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
    
    if(!gameover) {
        setTimeout(updateSnake, 120, snake);
    }
    else{
        // drawGameOver();
    }

}

// function drawGameOver() {
//     let img = document.getElementById('gameover');
//     ctx.drawImage(img, 100, 20, 500, 500);
// }

function checkGameOver(body) {
    for(let i = 1; i < body.length; i++) {
        if(body[0][0] == body[i][0] && body[0][1] == body[i][1])
            gameover = true;
    }
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
