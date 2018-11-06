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
var numBalls = 2;
var leftPaddle;
var rightPaddle;
var topPaddle;
var bottomPaddle;
var board;
var timer;
var interval = 5000;

// Variable containing the macromolecule icons
var macros = [];


// preload()
//
// Loads the different media
function preload() {
  macros[0] = loadImage('assets/images/polysac_icon.png');
  macros[1]= loadImage('assets/images/disac_icon.png');
  macros[2] = loadImage('assets/images/monosac_icon.png');
  macros[3] = loadImage('assets/images/lipid_icon.png');
  macros[4] = loadImage('assets/images/protein_icon.png');
  macros[5] = loadImage('assets/images/nuclacid_icon.png');
}

// setup()
//
// Creates the balls and paddles
function setup() {
  createCanvas(1035.542,640);
  // Create the interval
  timer = setInterval(generator, interval);
  // Create the balls
  for (var i = 0; i < numBalls; i++) {
    var r = floor(random(0,macros.length));
    balls.push(new Ball((width-445.542)/2,height/2,random(-5,5),random(-5,5),50,5,macros[r]));
  }
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle((width-445.542),height/2,10,60,10,40,38,37,39);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(40,height/2,10,60,10,40,38,37,39);
  topPaddle = new Paddle((width-395.542)/2,40,60,10,10,40,38,37,39);
  bottomPaddle = new Paddle((width-395.542)/2,height-50,60,10,10,40,38,37,39);
  board = new Board((width-395.542),0,395.542,height);
}

// generator()
//
//
function generator() {
  var g = floor(random(0,macros.length));
  balls.push(new Ball((width-395.542)/2,height/2,random(-5,5),random(-5,5),50,5,macros[g]));
}


// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(255);
  // background(5,161,105);
  // fill(255);
  // rect(40,40,560,560);
  fill(0);
  line(0,0,640,640);
  line(0,640,640,0);

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
    balls[i].handleCollision(topPaddle);
    balls[i].handleCollision(bottomPaddle);
    balls[i].display();
  }

  leftPaddle.display();
  rightPaddle.display();
  topPaddle.display();
  bottomPaddle.display();
  board.display();
}
