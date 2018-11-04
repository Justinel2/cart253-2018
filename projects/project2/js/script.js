// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our balls and paddles
var balls = [];
var numBalls = 100;
var leftPaddle;
var rightPaddle;
var topPaddle;
var bottomPaddle;

// setup()
//
// Creates the balls and paddles
function setup() {
  createCanvas(640,480);
  // Create the balls
  for (var i = 0; i < numBalls; i++) {
    balls.push(new Ball(width/2,height/2,random(-5,5),random(-5,5),10,5));
  }
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,40,38,37,39);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,40,38,37,39);
  topPaddle = new Paddle(width/2,0,60,10,10,40,38,37,39);
  bottomPaddle = new Paddle(width/2,height-10,60,10,10,40,38,37,39);
}

// timerFinished
//
//
function timerFinished() {}


// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInputVertical();
  rightPaddle.handleInputVertical();
  topPaddle.handleInputHorizontal();
  bottomPaddle.handleInputHorizontal();

  leftPaddle.update();
  rightPaddle.update();
  topPaddle.update();
  bottomPaddle.update();

  for (var i = 0; i < balls.length; i++) {
    balls[i].update();
    if (balls[i].isOffScreen()) {
      balls[i].reset();
    }
    balls[i].handleCollision(leftPaddle);
    balls[i].handleCollision(rightPaddle);
    balls[i].display();
  }
  
  leftPaddle.display();
  rightPaddle.display();
  topPaddle.display();
  bottomPaddle.display();
}
