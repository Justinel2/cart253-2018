/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;

// Variables for the movements and size of the sausage dog when found
var vx;
var vy;
var speedChange = 1;
var maxSpeed = 4;
var targetHeight = 0;
var targetWidth = 0;

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys = 100;

// Keep track of whether they've won
var gameOver = false;

// The width, height and postion of the rectangle
var rectWidth;
var rectHeight;
var rectX;
var rectY;

// The width and position of the target image as an example
var targetExampleWidth;
var targetExampleHeight;
var rectExampleX;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y);
    }
  }

  // Once we've displayed all decoys, we choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);


  // Set up the velocity of the target to 0
  vx = 0;
  vy = 0;

  // Change position so the target can never be positioned underneath the rectangle
while (targetX >= rectX*2 && targetY <= rectY*2){
  targetX = random(0,widht);
  targetY = random(0,height);
}

  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY);

  // Create a rectangle where the image of the target is shown
  rectMode(CENTER);
  fill(242,89,86);
  noStroke();
  rectWidth = windowWidth/4;
  rectHeight = windowHeight/5;
  rectX = windowWidth-rectWidth/2;
  rectY = rectHeight/2
  rect(rectX,rectY,rectWidth,rectHeight);

  // Display the target image in the center of the rectangle as an example
  imageMode(CENTER);
  targetExampleWidth = rectWidth/2;
  image(targetImage,rectX,rectY+18,targetExampleWidth);

  // Prepare our typography for the target example - CAPTION
  textFont("Helvetica");
  textStyle(BOLD);
  textSize(18);
  textAlign(CENTER,CENTER);
  noStroke();
  fill(45,61,66);
  // Tell them they won!
  text("Where is that dog?",rectX,rectY/4);
}

function draw() {
  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won!
    text("YOU WINNED!",width/2,height/2);

    // Modify the location and the size of the target randomly
    if((targetX > 0 && targetY > 0) && (targetX < windowWidth && targetY < windowHeight)) {

      // Change the size of the target randomly
      targetHeight = random(windowHeight/10,windowHeight/4);
      targetWidth = random(windowWidth/10,windowWidth/4);

      // Move the sausage dog across the screen randomly and stops when out of it
      vx += random(-speedChange,speedChange);
      vy += random(-speedChange,speedChange);
      targetX += vx;
      targetY += vy;

      // Draw the target with random animation and size
      image(targetImage,targetX,targetY,targetWidth,targetHeight);
    }
  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
