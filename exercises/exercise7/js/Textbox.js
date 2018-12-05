// Textbox.js
//
// A class to define how the interactive Area behaves.
//

// Location constructor
//
// Sets the properties with the provided arguments
function Textbox(x,y,w,h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

Textbox.prototype.display = function() {
  fill(0);
  stroke(255);
  rect(this.x,this.y,this.w,this.h);
}
