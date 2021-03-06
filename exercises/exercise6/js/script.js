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
  //////////////// FIXED
  // Behavioural error - changed the vx, vy and speed from 50 to 5 so it makes the game more playable
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  //////////////// FIXED
  // Behavioural error - Changed height (was 600) to 60 so it is the same size as the leftPaddle
  // Behavioural error - Exchanged downKey and upKey keys (UP_ARROW <-> DOWN_ARROW)
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  //
  //////////////// FIXED
  // Syntax error - added a closing parenthesis at "Paddle(0,height/2,10,60,10,83,87"
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);

//////////////// FIXED
// Syntax error - added a Missing closing curly bracket after the setup() function
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  //////////////// FIXED
  // Behavioural error - We want to call a function, so ball.update needs () at the end - fixed
  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  //////////////// FIXED
  // Behaviour error - changed "ball.isOffTheScreen" to "ball.isOffScreen" since it is the way it is written in Ball.js
  if (ball.isOffScreen()) {
    //////////////// FIXED
    // Behaviour error - We want to call a function reset() from ball, it then needs to be ball.reset() and not reset()
      ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();

  //////////////// FIXED
  // Syntax error - added a missing closing parenthesis at "rightPaddle.display("
  rightPaddle.display();
}
