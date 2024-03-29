/******************************************************
PHAGOCYTOSIS
by Justine Lardeux 40030920

adapted from:
Game - Chaser
Pippin Barr

A simple game showing the process of phagocytosis. Adapted from a game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerRegSpeed = 4;
var playerAcceleration = 2;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = 50;

// Prey position, size, velocity

var preyX;
var preyY;
var preyRadius = 25;
var preyVX;
var preyVY;
var preyMaxSpeed = 10;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 200;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;

// Variables for the noise
var tx = 0;
var ty = 0;

// images
var bg; // bg
var proto; //player
var bacteria //prey

// sounds
var ambiance;
var gobage2;

// The font used
var myFont;

// Levels and life
var level = 1;

// preload()
//
// Preload assets for the game
function preload() {
  myFont = loadFont('assets/LilitaOne-Regular.ttf');

  bg = loadImage('assets/images/P1_bg.gif');
  proto = loadImage('assets/images/P1_proto.png');
  bacteria = loadImage('assets/images/P1_bacteria.png');

  ambiance = loadSound("assets/sounds/ambiance.wav");
  gobage = loadSound("assets/sounds/gobage.mp3");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(1000,600);

  noStroke();
  textFont(myFont);

  setupPrey();
  setupPlayer();

  // Setup Sound
  ambiance.setVolume(0.4);
  ambiance.play();
  ambiance.loop(true);
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(bg);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();

    showLevel();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerRegSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerRegSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerRegSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerRegSpeed;
  }
  else {
    playerVY = 0;
  }

  // Accelerate the speed (2 times more) when the space key is down
  // Make the player lose health faster (2 times faster)
  if (keyIsDown(32)) {
    playerVY *= playerAcceleration;
    playerVX *= playerAcceleration;
    playerHealth = constrain(playerHealth - 1,0,playerMaxHealth);

  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);

  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Make sound effect
      gobage.setVolume(0.7);
      gobage.play();
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
      // Go up one level everytime three prey have died
      if (preyEaten % 3 === 0 && preyEaten != 0) {
        level++
        // Check if the health of the player is more than 100
        if (playerHealth > 100) {
          // If so, lower the life of 10 points each time until 100 points maximum
          playerMaxHealth -= 5;
        }
      }

    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames

    // Set velocity based on random values to get a new direction
    // and speed of movement
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
  preyVX = map(noise(tx),0,1,-preyMaxSpeed,preyMaxSpeed);
  preyVY = map(noise(ty),0,1,-preyMaxSpeed,preyMaxSpeed);

  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;
  tx += 0.01;
  ty += 0.21;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  image(bacteria,preyX,preyY,180,200);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  image(proto,playerX,playerY,150,150);
}

// showLevel()
//
// Display the level and the health
function showLevel() {

  textSize(100);
  fill(255,0,0);
  var levelLife = level;
  text(levelLife,width/10,height/5);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(255,0,0);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You ate " + preyEaten + " prey\n";
  gameOverText += "before you died."
  text(gameOverText,width/2,height/2);
}
