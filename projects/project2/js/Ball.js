// Ball
//
// A class to define how the balls behaves. Including going off the top, bottom, left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x,y,vx,vy,size,speed,img) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.img = img;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  if (this.x + this.size < 0 || this.x > (width-395.542) || this.y < 0 || this.y > height) {
    return true;
  }
  else {
    return false;
  }
}

// display()
//
// Draw the ball as an icon on the screen
Ball.prototype.display = function () {
  image(this.img,this.x,this.y,this.size,this.size);
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle,board) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      // Reverse y velocity to bounce
      this.vy = -this.vy;

      // Check if there has been a contact from a molecule to a paddle,
      // check which paddle and return a number
      //
      // If the paddle is the top one
      if (paddle.h === 15 && paddle.y === 40) {
        if (this.img === macros[0]){
          this.img = macros[1];
        }
        else if (this.img === macros[1]) {
          this.img = macros[5];
          board.c++
        }
      }
      // If the paddle is the bottom one
      else if (paddle.h === 15 && paddle.y === height-50){
        // If the macromolecule is a polysaccharide, change the icon for a disaccharide
        if (this.img === macros[0]){
          this.img = macros[1];
        }
        // If the macromolecule is a lipid, a protein or a nuclear acid, change the icon for transparency
        else if (this.img === macros[2]) {
          this.img = macros[5];
          board.l++;
        }
        else if (this.img === macros[3]) {
          this.img = macros[5];
          board.p++;
        }
        else if (this.img === macros[4]) {
          this.img = macros[5];
          board.n++;
        }
      }
      // If the paddle is the left one
      else if (paddle.h === 150 && paddle.x === 40) {
        // If the macromolecule is a disaccharide or a protein, change the icon for transparency
        if (this.img === macros[1]){
          this.img = macros[5];
          board.c++;
        }
        else if (this.img === macros[3]) {
          this.img = macros[5];
          board.p++;
        }
      }
      // If the paddle is the right one
      else {
        // If the macromolecule is a protein, change the icon for transparency
        if (this.img === macros[3]){
          this.img = macros[5];
          board.p++;
        }
      }
    }
  }
}


// reset()
//
// Set position back to the middle of the screen
Ball.prototype.reset = function() {
  image(0);
}
