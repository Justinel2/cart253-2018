// Debugging - Exercise 6
// By Justine Lardeux 40030920
// Implemented from
// Broken Basic OO Pong
// by Pippin Barr
//
// A broken (now repaired) primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
//////////////// FIXED
// Syntax error - changed "bal" to "ball" so it fits with the name used elsewhere in the script
var ball;
var leftPaddle;
var rightPaddle;

// setup()
//
// Creates the ball and paddles
function setup() {
  //
  //////////////// FIXED
  // Syntax error - changed "crateCanvas" to "createCanvas"
  createCanvas(640,480);
  noStroke();
  // Create a ball
  ball = new Ball(width/2,height/2,50,50,10,50);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,600,10,UP_ARROW,DOWN_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  //
  //////////////// FIXED
  // Syntax error - added a closing parenthesis at "Paddle(0,height/2,10,60,10,83,87"
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);


// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update;
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffTheScreen())
    reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();

  //////////////// FIXED
  // Syntax error - added a missing closing parenthesis at "rightPaddle.display("
  rightPaddle.display();
}
