// Line
//
// A class to define how the lines of the interactive map behave.
//

// Line constructor
//
// Sets the properties with the provided arguments
function Line(x,y) {
  this.x = x;
  this.y = y;
}

// display()
//
// Display the horizontal and vertical lines depending on the screen
Line.prototype.display = function() {
  // Attribute the color white to the stroke of the lines
  stroke(255)
  // Create the lines on the x-coordinate
  for (i = 0; i <= height; i += height/12) {
    line(0,i,width,i);
  }
}
