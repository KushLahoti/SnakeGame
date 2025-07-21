let isGameStarted = false;
const gameArena = document.getElementById('board');
const arenaSize = 600;
const cellSize = 20;
let score = 0;
let food = { x: 300, y: 200 };
let snake = [{ x: 160, y: 200 }, { x: 140, y: 200 }, { x: 120, y: 200 }];
let dx = cellSize;
let dy = 0;
let gameSpeed = 500;

export function resetGame() {
    score = 0;
    food = { x: 300, y: 200 };
    snake = [{ x: 160, y: 200 }, { x: 140, y: 200 }, { x: 120, y: 200 }];
    dx = cellSize;
    dy = 0;
    gameSpeed = 500;
    isGameStarted = false;
    const gameArena = document.getElementById('board');
    if (gameArena) {
        gameArena.innerHTML = '';
    }
    initiateGame();
}

export function changeDir(e) {
    console.log(e, e.keyCode);

    const LEFT_KEY = 37;
    const TOP_KEY = 38;
    const RIGHT_KEY = 39;
    const BOTTOM_KEY = 40;

    const keyPressed = e.keyCode;

    const isGoingUp = dy == -cellSize;
    const isGoingDown = dy == cellSize;
    const isGoingLeft = dx == -cellSize;
    const isGoingRight = dx == cellSize;

    if (keyPressed == LEFT_KEY && !isGoingRight) { dy = 0; dx = -cellSize; }

    if (keyPressed == RIGHT_KEY && !isGoingLeft) { dy = 0; dx = cellSize; }

    if (keyPressed == TOP_KEY && !isGoingDown) { dy = -cellSize; dx = 0; }

    if (keyPressed == BOTTOM_KEY && !isGoingUp) { dy = cellSize; dx = 0; }
}

export function drawDiv(x, y, className) {
    const div = document.createElement('div');
    div.classList.add(className);
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    return div;
}

export function drawfoodAndsnake() {
    const gameArena = document.getElementById('board');
    if (!gameArena) return;

    gameArena.innerHTML = '';

    snake.forEach((snakeCell) => {
        const ele = drawDiv(snakeCell.x, snakeCell.y, 'snake');
        gameArena.appendChild(ele);
    })

    const foodEle = drawDiv(food.x, food.y, 'food-ele');
    gameArena.appendChild(foodEle);
}

export function drawScoreBoard() {
    const scoreBoard = document.getElementById('score-board');
    scoreBoard.textContent = `Score: ${score}`;
}

export function moveFood() {
    let newX, newY;
    do {
        newX = Math.floor(Math.random() * ((arenaSize - cellSize) / cellSize)) * cellSize;
        newY = Math.floor(Math.random() * ((arenaSize - cellSize) / cellSize)) * cellSize;
    } while (snake.some(snakeCell => snakeCell.x === newX && snakeCell.y === newY));
    food = { x: newX, y: newY };
}

export function updateSnake() {
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy }
    snake.unshift(newHead);
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        if (gameSpeed > 250) {
            clearInterval(gameInterval);
            gameSpeed -= 30;
            gameLoop();
        }
        moveFood();
    } else {
        snake.pop();
    }
}

export function isGameOver() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) return true;
    }
    const isHittingLeftWall = snake[0].x < 0;
    const isHittingTopWall = snake[0].y < 0;
    const isHittingRightWall = snake[0].x >= arenaSize;
    const isHittingBottomWall = snake[0].y >= arenaSize;
    return isHittingLeftWall || isHittingTopWall || isHittingRightWall || isHittingBottomWall;
}

let gameInterval = null;
export function gameLoop() {
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        if (isGameOver()) {
            isGameStarted = false;
            alert(`Game Over, Score: ${score}`);
            resetGame();
            return;
        }
        updateSnake();
        drawScoreBoard();
        drawfoodAndsnake();
    }, gameSpeed);
}

export function runGame() {
    if (!isGameStarted) {
        isGameStarted = true;
        gameLoop();
        document.addEventListener('keydown', changeDir);
    }
}

export function initiateGame() {
    console.log(document.querySelector('.StartButton'));
    if (document.querySelector('.StartButton')) return; // Prevent duplicate button creation

    const startButton = document.createElement('button');
    startButton.textContent = 'Start Game';
    startButton.classList.add("StartButton");
    document.body.appendChild(startButton);

    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        const scoreBoard = document.getElementById('score-board');
        if (scoreBoard) {
            scoreBoard.style.visibility = "visible";
            scoreBoard.textContent = `Score : ${score}`;
        }
        runGame();
    });
}

