// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey,leftKey,rightKey,img) {
  this.x = x;               // the x-coordinate of the paddle
  this.y = y;               // the y-coordinate of the paddle
  this.vx = 0;              // the velocity on the x-axis of the paddle
  this.vy = 0;              // the velocity on the y-axis of the paddle
  this.w = w;               // the width of the paddle
  this.h = h;               // the height of the paddle
  this.speed = speed;       // the speed the paddle moves
  this.downKey = downKey;   // the control key to go down (vertical paddles only)
  this.upKey = upKey;       // the control key to go up (vertical paddles only)
  this.leftKey = leftKey;   // the control key to go left (horizontal paddles only)
  this.rightKey = rightKey; // the control key to go right (horizontal paddles only)
  this.img = img;           // the image associated to the paddle
}

// handleInputVertical()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInputVertical = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

// handleInputHorizontal()
//
// Check if the left or right keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInputHorizontal = function() {
  if (keyIsDown(this.leftKey)) {
    this.vx = -this.speed;
  }
  else if (keyIsDown(this.rightKey)) {
    this.vx = this.speed;
  }
  else {
    this.vx = 0;
  }
}

// update()
//
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);

  this.x += this.vx;
  this.x = constrain(this.x,0,(width-395.542)-this.w);
}

// display()
//
// Draw the paddle with the image on the screen
Paddle.prototype.display = function() {
  image(this.img,this.x,this.y,this.w,this.h);
}
