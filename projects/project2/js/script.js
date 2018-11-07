// MACROMOLECULES OF LIFE
// By Justine Lardeux 40030920
// Adapted from Pong
// by Pippin Barr
//
// An implementation of the game Pong. The game serves as a primitive simulation of
// the human organism digestion of the four macromolecules of life: carbohydrates, lipides
// proteins and nuclear acids. The four paddle represents the different enzymes present in
// the four main locations of digestion in our body. The success of the player depends not only
// on bouncing these macromolecules to the right paddle; the player also needs to maintain a basic
// homeostasis in the virtual body. This will be deranged by different modifiers that alterate the
// pH of each specific section and the overall body temperature. To succeed a level, the player needs
// to digest what is required of each macromolecules to live without running out of the constantly randomly
// generated macromolecules and without disbalancing the body temperature to the extreme.
//
// This game has been entirely written, designed and illustrated by me. It is based on real
// biological values and realities.
//
// Arrow keys control the different paddles.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our balls and paddles
var balls = [];   // Array containing the macromolecules
var numBalls = 2; // The number of balls intially
var leftPaddle;   // The paddle on the left side
var rightPaddle;  // The paddle on the right side
var topPaddle;    // The paddle on the top side
var bottomPaddle; // The paddle on the bottom side
var board;        // The different game informations and the side board
var timer;        // The timer that represents every generation of macromolecules

// The total of macromolecules generated
var totalMacros = 2;

// Variable representing the fonts
var black;
var extraBold;
var bold;

// Array containing the macromolecule icons and gifts
var macros = [];

// Array containing the paddles
var paddles = [];

// Array containing the informations about the enzymes
var enzymes = ["SALIVARY AMYLASE SALIVARY AMYLASE SALIVARY AMYLASE SALIVARY AMYLASE SALIVARY AMYLASE SALIVARY AMYLASE SALIVARY AMYLASE SALIVARY AMYLASE SALIVARY AMYLASE ","PEPSIN PEPSIN PEPSIN PEPSIN PEPSIN PEPSIN PEPSIN PEPSIN PEPSIN PEPSIN PEPSIN PEPSIN","PANCREATIC AMYLASE / CARBOPEPTIDASE / NUCLEASE / LIPASE", "DISACCHARIDASE / DIPEPTIDASE, CARBOXYPEPTIDASE + AMINOPEPTIDASE"];

// preload()
//
// Loads the different media
function preload() {
  // Preload images for macromolecules
  macros[0] = loadImage('assets/images/polysac_icon.png');  // polysaccharide icon
  macros[1] = loadImage('assets/images/disac_icon.png');    // disaccharide icon
  macros[2] = loadImage('assets/images/lipid_icon.png');    // lipid icon
  macros[3] = loadImage('assets/images/protein_icon.png');  // protein icon
  macros[4] = loadImage('assets/images/nuclacid_icon.png'); // nuclear acid icon
  macros[5] = loadImage('assets/images/pH_plusOne.png');    // pH +1 icon
  macros[6] = loadImage('assets/images/pH_minusOne.png');   // pH -1 icon
  macros[7] = loadImage('assets/images/T_plus10.png');      // T +1 icon
  macros[8] = loadImage('assets/images/T_minus10.png');     // T -1 icon
  macros[9] = loadImage('assets/images/transparent.png');   // transparent icon

  // Preload images for paddles
  paddles[0] = loadImage('assets/images/topPaddle.png');    // top paddle image with enzimes
  paddles[1] = loadImage('assets/images/rightPaddle.png');  // right paddle image with enzimes
  paddles[2] = loadImage('assets/images/bottomPaddle.png'); // bottom paddle image with enzimes
  paddles[3] = loadImage('assets/images/leftPaddle.png');   // left paddle image with enzimes

  // Preload font
  black = loadFont("assets/fonts/WorkSans-Black.ttf");
  extraBold = loadFont("assets/fonts/WorkSans-ExtraBold.ttf");
  bold = loadFont("assets/fonts/WorkSans-Bold.ttf");
}

// setup()
//
// Creates the balls and paddles
function setup() {
  createCanvas(1035.542,640);

  // Generate the initial macromolecules and gifts randomly with the array indexes (excluding the transparent icon)
  for (var i = 0; i < numBalls; i++) {
    var r = floor(random(0,macros.length-1));
    balls.push(new Ball((width-445.542)/2,height/2,random(-7,7),random(-7,7),50,5,macros[r]));
  }
  // Create the right and left paddle with UP and DOWN as controls
  rightPaddle = new Paddle((width-449.542),height/2,15,150,10,40,38,37,39,paddles[1]);
  leftPaddle = new Paddle(40,height/2,15,150,10,40,38,37,39,paddles[3]);
  // Create the top and bottom paddle with LEFT and RIGHT as controls
  topPaddle = new Paddle((width-395.542)/2,40,150,15,10,40,38,37,39,paddles[0]);
  bottomPaddle = new Paddle((width-395.542)/2,height-54,150,15,10,40,38,37,39,paddles[2]);
  // Create the informations and the side board
  board = new Board(width-395.542,0,395.542,height,0,0,0,0,7.0,2.5,7.7,7.7,37,0,255,255,255,255,1,1,1,1,50,5000,0);

  // Create the timer that generates the macromolecules and gifts, the time depends on the level in Board.js
  timer = setInterval(generator, board.interval);
}

// generator()
//
// This function generates a new macromolecule each time the timer ends, which the time depends on the level
function generator() {
  var g = floor(random(0,macros.length-1));
  balls.push(new Ball((width-395.542)/2,height/2,random(-5,5),random(-5,5),50,5,macros[g]));
  //Add one macromolecule to the total
  totalMacros++;
}


// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {

  // The function startGame() of Board.js runs if the level is equal to zero
  // The welcome page is displayed
  if (board.level === 0) {
    board.startGame();
    // Reset the number of macromolecules in total
    totalMacros = 2;
  }

  //If the level is greater than zero, run the game
  else {

    // Display the informations about the game, like the level, the enzymes,...
    board.display(totalMacros);

    // Handle the keyboard inputs for each paddle
    leftPaddle.handleInputVertical();
    rightPaddle.handleInputVertical();
    topPaddle.handleInputHorizontal();
    bottomPaddle.handleInputHorizontal();

    // Update the position of each paddle
    leftPaddle.update();
    rightPaddle.update();
    topPaddle.update();
    bottomPaddle.update();

    // Update the position of each macromolecules
    for (var i = 0; i < balls.length; i++) {
      balls[i].update();

      // Handle the collision of each macromolecule depending on each paddle
      balls[i].handleCollision(leftPaddle,board);
      balls[i].handleCollision(rightPaddle,board);
      balls[i].handleCollision(topPaddle,board);
      balls[i].handleCollision(bottomPaddle,board);

      // Display each macromolecule
      balls[i].display();
    }

    // Update the current level, its objective and its difficulties
    board.updateLevel();
    if (board.control === 1) {
      // Reset the total of macromolecules
      totalMacros = 2;
      board.control = 0;
    }

    // Handle the different pH for each section of the organism and its consequences
    board.handlePH();

    // Display each paddle
    leftPaddle.display();
    rightPaddle.display();
    topPaddle.display();
    bottomPaddle.display();

    //Reset the game if the temperature is too high (>60), too low (<0) or if the objective of the
    //level is not reached within the amount of macromolecules given
    if (board.temp < 0 || board.temp > 60 || totalMacros >= board.max) {
      board.resetGame();
    }
  }
}
