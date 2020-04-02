// JavaScript code goes here
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

const ballRadius = 10;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const brickRowCount = 4;
const brickColumnCount = 6;
const brickWidth = 62.5;
const brickHeight = 15;
const brickPadding = 8.5;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const brickColors = ['#343837', '#03719C', '#0F9B8E', '#1F3B4D', '#017374'];

const bricks = [];

let score = 0;
let lives = 3;

for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
    const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

    bricks[c][r] = {
      bx: brickX,
      by: brickY,
      status: 1,
      // color: brickColors[r]  // colors by row
      color: brickColors[c], // color by colums
    };
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.bx && x < b.bx + brickWidth && y > b.by && y < b.by + brickHeight) {
          dy = -dy;
          b.status = 0;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            // alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#000000';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#000000';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#d400ff';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - (paddleHeight + 2), paddleWidth, paddleHeight);
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = '#D0FEFE';
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const {
        bx, by, status, color,
      } = bricks[c][r]; // this syntax is deconstruction
      // creates local variable with properties

      if (status === 1) {
        ctx.beginPath();
        ctx.rect(bx, by, brickWidth, brickHeight);

        // Gradient Color
        // let gradient = ctx.createLinearGradient(0, 0, 720, 0);
        // gradient.addColorStop(0, 'red');
        // gradient.addColorStop(1 / 6, 'orange');
        // gradient.addColorStop(2 / 6, 'yellow');
        // gradient.addColorStop(3 / 6, 'green');
        // gradient.addColorStop(4 / 6, 'blue');
        // gradient.addColorStop(5 / 6, 'indigo');
        // gradient.addColorStop(1, 'violet');
        // ctx.fillStyle = gradient;

        // Different color by row
        ctx.fillStyle = color;

        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  // For left/right canvas walls
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  // For top/bottom canvas walls
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives -= 1;
      if (!lives) {
        // alert('GAME OVER');
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
