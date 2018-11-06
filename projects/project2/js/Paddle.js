// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey,leftKey,rightKey) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.leftKey = leftKey;
  this.rightKey = rightKey;
}

// handleInputVertical()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInputVertical = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
    console.log(this.vy);
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
// Check if the leftright or right keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInputHorizontal = function() {
  if (keyIsDown(this.leftKey)) {
    this.vx = -this.speed;
    console.log(this.vx);
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
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  fill(255);
  rect(this.x,this.y,this.w,this.h);
}
