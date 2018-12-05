// Bee
//
// A class to define how the bees are made and behave on the screen.
//

// Bee constructor
//
// Sets the properties with the provided arguments
function Bee(x,y,vx,vy,size,speed,img) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.img = img;
}

// handleWrapping()
//
// Wrap when bee goes off the canvas
Bee.prototype.handleWrapping = function() {
  // if bee goes off on the left side of the canvas
  if (this.x < 0) {
    // Add the widht of the canevas
    this.x += width;
  }
  // if bee goes off on the right side of the canvas
  else if (this.x > width) {
    // Remove the width of the canevas
    this.x -= width;
  }
  // if bee goes off on the top side of the canvas
  if (this.y < 0) {
    // Add the height of the canevas
    this.y += height;
  }
  // if bee goes off on the bottom side of the canvas
  else if (this.y > height) {
    // Remove the height of the canevas
    this.y -= height;
  }
}
