// Bee
//
// A class to define how the interactive Area behaves.
//

// Location constructor
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

Bee.prototype.updateBee = function() {
  this.x += this.vx;
  this.y += this.vy;
}

Bee.prototype.jiggling = function(x,y) {
  // Jiggling randomly on the vertical and horizontal axis
  this.x += random(-1, 1);
  this.y += random(-1, 1);
}

// Wrap when player goes off the canvas
Bee.prototype.handleWrapping = function() {
  if (this.x < 0) {
    this.x += width;
  }
  else if (this.x > width) {
    this.x -= width;
  }

  if (this.y < 0) {
    this.y += height;
  }
  else if (this.y > height) {
    this.y -= height;
  }
}

Bee.prototype.displayBee = function() {
  imageMode(CENTER);
  image(this.img,this.x,this.y,this.size,this.size);
}
