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


// Variable representing the fonts
var black;
var extraBold;
var bold;

// Array containing the macromolecule icons
var macros = [];

// Array containing the paddles
var paddles = [];

// Variable for temperature and level
// var temp = 37;
var level = 1;
var retry = 0;

// Array containing the points for each macromolecules and gifts
var points = [];

// Array containing the informations about the enzymes
var enzymes = ["SALIVARY AMYLASE SALIVARY AMYLASE SALIVARY AMYLASE SALIVARY AMYLASE SALIVARY AMYLASE SALIVARY AMYLASE SALIVARY AMYLASE SALIVARY AMYLASE SALIVARY AMYLASE ","PEPSIN PEPSIN PEPSIN PEPSIN PEPSIN PEPSIN PEPSIN PEPSIN PEPSIN PEPSIN PEPSIN PEPSIN","PANCREATIC AMYLASE / CARBOPEPTIDASE / NUCLEASE / LIPASE", "DISACCHARIDASE / DIPEPTIDASE, CARBOXYPEPTIDASE + AMINOPEPTIDASE"];

// preload()
//
// Loads the different media
function preload() {
  // Preload images for macromolecules
  macros[0] = loadImage('assets/images/polysac_icon.png');
  macros[1]= loadImage('assets/images/disac_icon.png');
  macros[2] = loadImage('assets/images/lipid_icon.png');
  macros[3] = loadImage('assets/images/protein_icon.png');
  macros[4] = loadImage('assets/images/nuclacid_icon.png');
  macros[5] = loadImage('assets/images/pH_plusOne.png');
  macros[6] = loadImage('assets/images/pH_minusOne.png');
  macros[7] = loadImage('assets/images/T_plus10.png');
  macros[8] = loadImage('assets/images/T_minus10.png');
  macros[9] = loadImage('assets/images/transparent.png');

  // Preload images for paddles
  paddles[0] = loadImage('assets/images/topPaddle.png');
  paddles[1] = loadImage('assets/images/rightPaddle.png');
  paddles[2] = loadImage('assets/images/bottomPaddle.png');
  paddles[3] = loadImage('assets/images/leftPaddle.png');

  // Preload font
  black = loadFont("assets/fonts/WorkSans-Black.ttf");
  extraBold = loadFont("assets/fonts/WorkSans-ExtraBold.ttf");
  bold = loadFont("assets/fonts/WorkSans-Bold.ttf");
}

// setup()
//
// Creates the balls and paddles
function setup() {
  console.log("I'm alive!");
  createCanvas(1035.542,640);
  // Create the interval
  timer = setInterval(generator, interval);
  // Create the balls
  for (var i = 0; i < numBalls; i++) {
    var r = floor(random(0,macros.length-1));
    balls.push(new Ball((width-445.542)/2,height/2,random(-5,5),random(-5,5),50,5,macros[r]));
  }
  // Create the right and left paddle with UP and DOWN as controls
  rightPaddle = new Paddle((width-449.542),height/2,15,150,10,40,38,37,39,paddles[1]);
  leftPaddle = new Paddle(40,height/2,15,150,10,40,38,37,39,paddles[3]);
  // Create the top and bottom paddle with LEFT and RIGHT as controls
  topPaddle = new Paddle((width-395.542)/2,40,150,15,10,40,38,37,39,paddles[0]);
  bottomPaddle = new Paddle((width-395.542)/2,height-54,150,15,10,40,38,37,39,paddles[2]);
  // Create the side board
  board = new Board(width-395.542,0,395.542,height,0,0,0,0,7.0,2.5,7.7,7.7,37,level,255,255,255,255);
}

// generator()
//
//
function generator() {
  var g = floor(random(0,macros.length-1));
  balls.push(new Ball((width-395.542)/2,height/2,random(-5,5),random(-5,5),50,5,macros[g]));
}


// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {

  // if (level <= 0) {
  //   board.startGame();
  // }
  // else {

  board.display();

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

    balls[i].handleCollision(leftPaddle,board);
    balls[i].handleCollision(rightPaddle,board);
    balls[i].handleCollision(topPaddle,board);
    balls[i].handleCollision(bottomPaddle,board);

    balls[i].display();
  }

  board.handlePH();

  leftPaddle.display();
  rightPaddle.display();
  topPaddle.display();
  bottomPaddle.display();
// }
}
