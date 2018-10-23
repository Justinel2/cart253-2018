//////////////// FIXED
// Paddle constructor should be a comment, so preceded by "//"
// Paddle constructor
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

//////////////// FIXED
// The next line of comment should be preceded by "//"
//Sets the properties with the provided arguments or defaults
//
//////////////// FIXED
// Syntax error - changed "Pladdle" to "Paddle"
function Paddle(x,y,w,h,speed,downKey,upKey) {
  this.x = x;
  this.y = y;
  this.xv = 0;
  this.yv = 0;
  this.w = w;
  this.h = h;
  //////////////// FIXED
  // Syntax error - removed the extra e in "speeed" to "speed"
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
//
//////////////// FIXED
// Syntax error - changed "proto" to "prototype"
// Logical error - changed "keyIsDown" instead of keyDown so the movement stops when the key is not pressed
Paddle.prototype.handleInput = function() {
  if (keyIsDown(upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(downKey)) {
    this.vy = -this.speed;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constraint(this.y,0,hight-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
//
//////////////// FIXED
// Syntax errors - changed "disploy" to "display" and removed an extra closing parenthese at "function()"
Paddle.prototype.display = function() {
  //////////////// FIXED
  // Syntax error - changed "rectangle" to "rect"
  rect(this.x,this.y,this.w,this.h);
}
