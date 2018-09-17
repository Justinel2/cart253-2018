// Exercise 1 - Moving pictures
// Pippin Barr
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

// The image of a Pacman ghost
var ghostImage;
// The current position of the ghost
var ghostImageX;
var ghostImageY;

// The image of an emoji
var emojiImage;
// The current position of the emoji
var emojiImageX;
var emojiImageY;

// preload()
//
// Load the two images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  ghostImage = loadImage("assets/images/ghost.png");
  emojiImage = loadImage("assets/images/emoji.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // Start the ghost image at the left side of the canvas
  ghostImageX = 0;
  ghostImageY = height/2;

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {

  // Move the ghost image to the right by increasing its x position
  ghostImageX += 1;

  // Display the ghost image
  image(ghostImage,ghostImageX,ghostImageY);

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistanceClown = mouseX - clownImageX;
  var yDistanceClown = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistanceClown/10;
  clownImageY = clownImageY + yDistanceClown/10;

  // Display the clown image
  image(clownImage,clownImageX,clownImageY);

  // Move the emoji by moving it so it is always displayed at the current mouse location

  // Calculate the distance in X and in Y
  var xDistanceEmoji = mouseX;
  var yDistanceEmoji = mouseY;
  // Add the x and y distance to the clown's current (x,y) location
  emojiImageX = xDistanceEmoji;
  emojiImageY = yDistanceEmoji;

  // Display the emoji
  image(emojiImage,emojiImageX,emojiImageY);
}
