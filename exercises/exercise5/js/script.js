// Basic OO Pong - Exercise 5
// Justine Lardeux
// by Pippin Barr
//
// A primitive implementation of Pong with a scoring system
// with the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

///////// NEW /////////
// A variable to hold the camera sound we will play on bouncing
var cameraSFX;

// preload()
//
// Loads the camera audio for the sound of bouncing
function preload() {
  cameraSFX = new Audio("assets/sounds/camera.mp3");
}
/////// END NEW ///////

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW,0);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87,0,255);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(random(0,200),12);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  ///////// NEW /////////
  if (ball.isOffScreen() === "left") {
    rightPaddle.updateScore();
    ball.reset();
  }
  else if (ball.isOffScreen() === "right") {
    leftPaddle.updateScore();
    ball.reset();
  }
  /////// END NEW ///////

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ///////// NEW /////////
  leftPaddle.displayScore();
  rightPaddle.displayScore();
  /////// END NEW ///////

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}
