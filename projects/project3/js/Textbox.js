// Textbox.js
//
// A class to define how to display the text box (the area dedicated for t
// generated text)
//

// Textbox constructor
//
// Sets the properties with the provided arguments
function Textbox(x,y,w,h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

// display()
//
// Display the black rectangle that will be used as the section
// for the generated text
Textbox.prototype.display = function() {
  fill(0);
  stroke(255);
  rect(this.x,this.y,this.w,this.h);
}
