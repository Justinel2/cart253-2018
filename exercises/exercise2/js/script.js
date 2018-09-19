/*********************************************************
Exercise 2 - The Artful Dodger
by Justine Lardeux (40030920)
Starter code for exercise 2 by Pippin Barr.
*********************************************************/

// The image of a shy emoji (the avatar)
var avatar;
// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 50;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;
// How much the size varies at each dodge
var avatarSizeVariation;


// The image of a basketball (the enemy)
var enemy;
// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 50;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 10;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;

// The image of a helmet (an advantage)
var helmet;
// The position and size of the enemy circle
var helmetX;
var helmetY;
var helmetSize = 50;

// How many dodges the player has made
var dodges = 0;

// The font used to display the number of dodges
var myFont;
// The text that displays the number of successful dodges
var typedText;

function preload() {
  //Load the different images from directory
  myFont = loadFont('assets/fonts/Asset-Regular.ttf');
  enemy = loadImage("assets/images/basketball.png");
  avatar = loadImage("assets/images/shy.gif_c200");
  helmet = loadImage("assets/images/helmet.png");
}

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Adjust the text design
  // Adjust the text size (number of dodges)
  textSize(200);
  // Adjust the text alignement (number of dodges)
  textAlign(CENTER,CENTER);
  // Adjust the font
  textFont(myFont);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Set the default size of the basketball image

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // Put the helmet at a random x and y coordinate with the canvas
  helmetX = random(0,width);
  helmetY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A yellow background
  background(250,250,250);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the enemy's size and speed
    enemySize = 50;
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = 50;
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Randomize the size of the avatar
    avatarSize = random(0,200);
    // Randomize the speed of the avatar
    avatarSpeed = random(0,50);
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemySize = enemySize + enemySizeIncrease;
  }

  // Display the current number of successful in the console
  console.log(dodges);
  // Display the number of successful dodges on the screen
  typedText = dodges;
  text(typedText,height/2,width/2.5);
  fill(255, 204, 0);

  // Display the emoji image
  image(avatar,avatarX,avatarY,avatarSize,avatarSize);

  // Display the basketball image
  image(enemy,enemyX,enemyY,enemySize,enemySize);

  // Display the helmet image
  image(helmet,helmetX,helmetY,helmetSize,helmetSize);

}

// mouseClicked()
//
// When the mouse is clicked, check if it was on the helmet
// if it was then give an advantage -> reset the size and speed
function mouseClicked() {
  // Check if the distance between the mouse and the centre of the helmet is less than the circle's radius
  if (dist(mouseX,mouseY,helmetX,helmetY) < helmetSize/2) {
    // Tell the player they got the advantage
    console.log("YOU'VE GOT AN HELMET!");
    // Reset the enemy's size and speed
    enemySize = 50;
    enemySpeed = 5;
    // Reset the location of the helmet randomly
    helmetX = random(0,width);
    helmetY = random(0,height);
  }
}
