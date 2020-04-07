// **************************************************************

// DOM references

// **************************************************************

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// **************************************************************

// Variables

// **************************************************************

// --------------------------------------------------------------
// Constants
// --------------------------------------------------------------

const font = '16px Arial';

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const paddleXStart = (canvasWidth - paddleWidth) / 2;

const PI2 = Math.PI * 2;

const brickColors = ['#343837', '#03719C', '#0F9B8E', '#1F3B4D', '#017374'];
const objectColor = '#0095DD';

// --------------------------------------------------------------
// Variables
// --------------------------------------------------------------

// Initialize the position of the ball and paddle

const ball = {
  x: 0,
  y: 0,
  dx: 0,
  dy: 0,
};

let paddleX;

resetBallAndPaddle();

let score = 0;
let lives = 3;

let rightPressed = false;
let leftPressed = false;

// --------------------------------------------------------------
// Setup Bricks Array
// --------------------------------------------------------------

const bricks = [];

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

// **************************************************************

// Functions

// **************************************************************

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ballRadius, 0, PI2);
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#d400ff';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvasHeight - (paddleHeight + 2), paddleWidth, paddleHeight);
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = '#D0FEFE';
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const brick = bricks[c][r];
      if (brick.status === 1) {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brickWidth, brickHeight);

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
        ctx.fillStyle = brick.color;
        ctx.fill();
        ctx.closePath();
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
  ctx.fillStyle = '#000000';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = font;
  ctx.fillStyle = '#000000';
  ctx.fillText(`Lives: ${lives}`, canvasWidth - 65, 20);
}

function resetBallAndPaddle() {
  ball.x = canvasWidth / 2;
  ball.y = canvasHeight - 30;
  ball.dx = 2;
  ball.dy = -2;
  paddleX = paddleXStart;
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
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
// --------------------------------------------------------------
// Game Loop
// --------------------------------------------------------------

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

// --------------------------------------------------------------
// Event Listeners
// --------------------------------------------------------------

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

// **************************************************************
// Register Events
// **************************************************************

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);


// **************************************************************
// Starts program entry point
// **************************************************************

draw();

/*

* Make these into constants defined at the top.

** This block of code is repeated better to make a function for this.

*** This block of code would be better as a function.

**** Use objects to encapsulate code

*/
