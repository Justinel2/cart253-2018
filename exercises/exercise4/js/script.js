// Pong - Exercise 5
// Justine Lardeux 40030920
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.

// Game colors
var bgColor = 255;
var fgColor = (255,255,255);

// BALL

// Basic definition of a ball object with its key properties of
// position, size, velocity, and speed
var ball = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  speed: 5
}

// PADDLES

// How far in from the walls the paddles should be drawn on x
var paddleInset = 50;

// LEFT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
var leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vx: 0,
  vy: 0,
  speed: 5,
  upKeyCode: 87, // The key code for W
  downKeyCode: 83, // The key code for S
  score: 0,
  c: fgColor
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
var rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vx: 0,
  vy: 0,
  speed: 5,
  upKeyCode: 38, // The key code for the UP ARROW
  downKeyCode: 40, // The key code for the DOWN ARROW
  score: 0,
  c: fgColor
}

// A variable to hold the camera sound we will play on bouncing
var cameraSFX;

// preload()
//
// Loads the camera audio for the sound of bouncing
function preload() {
  cameraSFX = new Audio("assets/sounds/camera.mp3");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640,480);
  rectMode(CENTER);
  stroke(255);
  strokeWeight(0.5);

  setupPaddles();
  setupBall();
}

// setupPaddles()
//
// Sets the positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle
  leftPaddle.x = paddleInset;
  leftPaddle.y = height/2;

  // Initialise the right paddle
  rightPaddle.x = width - paddleInset;
  rightPaddle.y = height/2;
}

// setupBall()
//
// Sets the position and velocity of the ball
function setupBall() {
  ball.x = width/2;
  ball.y = height/2;
  ball.vx = ball.speed;
  ball.vy = ball.speed;
}

// draw()
//
// Calls the appropriate functions to run the game
function draw() {
  // Fill the background
  background(random(0,255), 12);

  // Handle input
  // Notice how we're using the SAME FUNCTION to handle the input
  // for the two paddles!
  handleInput(leftPaddle);
  handleInput(rightPaddle);

  // Update positions of all objects
  // Notice how we're using the SAME FUNCTION to handle the input
  // for all three objects!
  updatePosition(leftPaddle);
  updatePosition(rightPaddle);
  updatePosition(ball);

  // Handle collisions
  handleBallWallCollision();
  handleBallPaddleCollision(leftPaddle);
  handleBallPaddleCollision(rightPaddle);

  // Handle the ball going off screen
  handleBallOffScreen();

  // Fill the paddles
  displayScore(leftPaddle);
  displayScore(rightPaddle);

  // Display the paddles and ball
  fill(leftPaddle.c);
  displayPaddle(leftPaddle);
  fill(rightPaddle.c);
  displayPaddle(rightPaddle);
  fill(255);
  displayBall();
  displayTrace();

}


// handleInput(paddle)
//
// Updates the paddle's velocity based on whether one of its movement
// keys are pressed or not.
// Takes one parameter: the paddle to handle.
function handleInput(paddle) {

  // Set the velocity based on whether one or neither of the keys is pressed

  // NOTE how we can change properties in the object, like .vy and they will
  // actually CHANGE THE OBJECT PASSED IN, this allows us to change the velocity
  // of WHICHEVER paddle is passed as a parameter by changing it's .vy.

  // UNLIKE most variables passed into functions, which just pass their VALUE,
  // when we pass JAVASCRIPT OBJECTS into functions it's the object itself that
  // gets passed, so we can change its properties etc.

  // Check whether the upKeyCode is being pressed
  // NOTE how this relies on the paddle passed as a parameter having the
  // property .upKey
  if (keyIsDown(paddle.upKeyCode)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the .downKeyCode is being pressed
  else if (keyIsDown(paddle.downKeyCode)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePosition(object)
//
// Sets the position of the object passed in based on its velocity
// Takes one parameter: the object to update, which will be a paddle or a ball
//
// NOTE how this relies on the object passed in have .x, .y, .vx, and .vy
// properties, which is true of both the two paddles and the ball
function updatePosition(object) {
  object.x += object.vx;
  object.y += object.vy;
}

// handleBallWallCollision()
//
// Checks if the ball has overlapped the upper or lower 'wall' (edge of the screen)
// and is so reverses its vy
function handleBallWallCollision() {

  // Calculate edges of ball for clearer if statement below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Check for ball colliding with top and bottom
  if (ballTop < 0 || ballBottom > height) {
    // If it touched the top or bottom, reverse its vy
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    cameraSFX.currentTime = 0;
    cameraSFX.play();
  }
}

// handleBallPaddleCollision(paddle)
//
// Checks if the ball overlaps the specified paddle and if so
// reverses the ball's vx so it bounces
function handleBallPaddleCollision(paddle) {

  // Calculate edges of ball for clearer if statements below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Calculate edges of paddle for clearer if statements below
  var paddleTop = paddle.y - paddle.h/2;
  var paddleBottom = paddle.y + paddle.h/2;
  var paddleLeft = paddle.x - paddle.w/2;
  var paddleRight = paddle.x + paddle.w/2;

  // First check it is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle so reverse its vx
      ball.vx = -ball.vx;
      // In case the ball had a different y velocity, reset the velocity
      reset();
      // Play our bouncing sound effect by rewinding and then playing
      cameraSFX.currentTime = 0;
      cameraSFX.play();
    }
  }
}

// handleBallOffScreen()
//
// Checks if the ball has gone off screen to the left or right
// and moves it back to the centre if so
function handleBallOffScreen() {

  // Calculate edges of ball for clearer if statement below
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Check for ball going off the sides
  if (ballRight < 0 || ballLeft > width) {
    // If it went off either side, reset it to the centre
    ball.x = width/2;
    ball.y = height/2;
    // Reverse it's vx
    ball.vx = -ball.vx;
    // Randomize its vy
    ball.vy = random(-10,10);

    // Checking which side of the screen the ball as left
    if (ballLeft < width/2) {       //If the ball left on the left side
      rightPaddle.score++;          //The right paddle gets one point
      console.log(rightPaddle.score);
    }
    else if (ballRight > width/2) { //If the ball left on the right side
      leftPaddle.score++;           //The left paddle gets one point
      console.log(leftPaddle.score);
    }
  }
}
// reset()
// Reset the y velocity of the ball
function reset() {
  ball.vy = ball.speed;
}

// displayScore()
// Changes the color of the paddle depending on the score of each
function displayScore() {
rightPaddle.c = color(rightPaddle.score*5,leftPaddle.score*5,0);
console.log(rightPaddle.c);
leftPaddle.c = color(leftPaddle.score*5,rightPaddle.score*5,0);
console.log(leftPaddle.c);
}

// displayTrace()
//
// Trace the path of the ball
function displayTrace() {
  line(ball.x, ball.y);
}

// displayBall()
//
// Draws ball on screen based on its properties
function displayBall() {
  rect(ball.x,ball.y,ball.size,ball.size);
}

// displayPaddle(paddle)
//
// Draws the specified paddle on screen based on its properties
function displayPaddle(paddle) {
  rect(paddle.x,paddle.y,paddle.w,paddle.h);
}
