import Ball from './ball.js';
import Brick from './brick.js';
import Bricks from './bricks.js';
import Paddle from './paddle.js';
import Score from './score.js';
import Lives from './lives.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const paddleHeight = 10;
const paddleWidth = 75;
const padXStart = (canvas.width - paddleWidth) / 2;
const padYStart = (canvas.height - 12);
const paddleColor = '#D0FEFE';

const black = '#000000';
const brickColors = ['#343837', '#03719C', '#0F9B8E', '#1F3B4D', '#017374'];

const livesPosition = canvasWidth - 65;

const ball = new Ball();
const paddle = new Paddle(padXStart, padYStart, paddleWidth, paddleHeight, black, paddleColor);

resetBallAndPaddle();

const score = new Score();
const lives = new Lives(0, livesPosition, 3, black);

let rightPressed = false;
let leftPressed = false;

// Setup Bricks Array
const bricks = new Bricks(brickColumnCount, brickRowCount);

function collisionDetection() {
  for (let c = 0; c < bricks.cols; c += 1) {
    for (let r = 0; r < bricks.rows; r += 1) {
      const b = bricks.bricks[c][r];
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
          ball.dy = -ball.dy;
          b.status = 0;
          score.increase();
          if (score === bricks.rows * bricks.cols) {
            // eslint-disable-next-line no-alert
            // alert('YOU WIN, CONGRATULATIONS!'); // * Could be good as a constant
            document.location.reload();
          }
        }
      }
    }
  }
}

function movePaddle() {
  // Check for arrow keys
  if (rightPressed && paddle.x < canvasWidth - paddle.width) {
    paddle.x += 7;
  } else if (leftPressed && paddle.x > 0) {
    paddle.x -= 7;
  }
}

function resetBallAndPaddle() {
  ball.x = canvasWidth / 2;
  ball.y = canvasHeight - 30;
  ball.dx = 2;
  ball.dy = -2;
  paddle.x = padXStart;
}

function collisionsWithCanvasAndPaddle() {
  // Bounce the ball off the left and right of the canvas
  if (ball.x + ball.dx > canvasWidth - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }

  // Bounce the ball off the top, paddle, or hit the bottom of the canvas
  if (ball.y + ball.dy < ball.radius) {
    // hit the top
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvasHeight - ball.radius) {
    // hit the bottom
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      // Hit the paddle
      ball.dy = -ball.dy;
    } else {
      // Lose a life
      lives.decrease();
      if (!lives) {
        // Game Over
        // eslint-disable-next-line no-alert
        // alert('GAME OVER'); // * Could be good as a constant
        ball.x = 200; // ???????
        ball.y = 200;
        // document.location.reload();
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
  ball.render(ctx);
  paddle.render(ctx);
  score.render(ctx);
  lives.render(ctx);
  bricks.render(ctx);
  collisionDetection();
  ball.move(ctx);
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
    paddle.x = relativeX - paddle.width / 2;
  }
}

// Register Events
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

// Starts program entry point
draw();
