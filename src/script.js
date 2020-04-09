import Ball from './ball';
import Brick from './brick';
import Paddle from './paddle';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const font = '16px Arial';
const black = '#000000';

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const brickRowCount = 3;
const brickColumnCount = 5;

const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const paddleXStart = (canvasWidth - paddleWidth) / 2;

const PI2 = Math.PI * 2;

const brickColors = ['#343837', '#03719C', '#0F9B8E', '#1F3B4D', '#017374'];

let ball = new Ball();

let paddleX;

resetBallAndPaddle();

let score = 0;
let lives = 3;

let rightPressed = false;
let leftPressed = false;


// Setup Bricks Array
const bricks = [];



// Functions

function initBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r += 1) {
      bricks[c][r] = {
        x: 0,
        y: 0,
        status: 1,
        // color: brickColors[r]  // colors by row
        color: brickColors[c], // color by colums
      };

      bricks[c][r].x = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
      bricks[c][r].y = (r * (brickHeight + brickPadding)) + brickOffsetTop;
    }
  }
}

initBricks();




function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const brick = bricks[c][r];
      if (brick.status === 1) {

      }
    }
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
          ball.dy = -ball.dy;
          b.status = 0;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            // eslint-disable-next-line no-alert
            alert('YOU WIN, CONGRATULATIONS!'); // * Could be good as a constant
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = font;
  ctx.fillStyle = black;
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = font;
  ctx.fillStyle = black;
  ctx.fillText(`Lives: ${lives}`, canvasWidth - 65, 20);
}

function resetBallAndPaddle() {
  ball.x = canvasWidth / 2;
  ball.y = canvasHeight - 30;
  ball.dx = 2;
  ball.dy = -2;
  paddleX = paddleXStart;
}



function movePaddle() {
  // Check for arrow keys
  if (rightPressed && paddleX < canvasWidth - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

function collisionsWithCanvasAndPaddle() {
  // Bounce the ball off the left and right of the canvas
  if (ball.x + ball.dx > canvasWidth - ballRadius || ball.x + ball.dx < ballRadius) {
    ball.dx = -ball.dx;
  }

  // Bounce the ball off the top, paddle, or hit the bottom of the canvas
  if (ball.y + ball.dy < ballRadius) {
    // hit the top
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvasHeight - ballRadius) {
    // hit the bottom
    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
      // Hit the paddle
      ball.dy = -ball.dy;
    } else {
      // Lose a life
      lives -= 1;
      if (!lives) {
        // Game Over
        // eslint-disable-next-line no-alert
        alert('GAME OVER'); // * Could be good as a constant
        ball.x = 200; // ???????
        ball.y = 200;
        document.location.reload();
      } else {
        // Start the over you hit the bottom
        resetBallAndPaddle();
      }
    }
  }
}

// Game Loop
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // Call helper functions
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  moveBall();
  movePaddle();
  collisionsWithCanvasAndPaddle();

  // Draw the screen again
  requestAnimationFrame(draw);
}


// Event Listeners
function keyDownHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvasWidth) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// Register Events
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

// Starts program entry point
draw();
