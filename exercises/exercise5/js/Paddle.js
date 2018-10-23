// Paddle constructor
//
// Sets the properties with the provided arguments or defaults

///////// NEW /////////
function Paddle(x,y,w,h,speed,downKey,upKey,score) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.score = 0;
  this.c = (255,255,255);
}
/////// END NEW ///////

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
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

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);
}

///////// NEW /////////
// updateScore()
//
//Updating score  by adding one point each time
Paddle.prototype.updateScore = function() {
  this.score++;
}

//displayScore()
//
//Display the current score
Paddle.prototype.displayScore = function() {
  this.c = 255 - (this.score*15);
  }

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  fill(this.c);
  strokeWeight(2);
  stroke(255);
  rect(this.x,this.y,this.w,this.h);
}
/////// END NEW ///////
