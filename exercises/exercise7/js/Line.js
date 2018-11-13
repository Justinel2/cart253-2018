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
  // Create the lines on the x-coordinate (the distance in meters)
  for (var i = 0; i < 200; i++) {
    line(0,pow(i,1.8)+100,width,pow(i,1.8)+100);
  }
  // // Create the lines on the y-coordinate (the angles from north)
  // for (var i = 0; i < 200; i++) {
  //   line(width/2,0,(width/2)-pow(i,1.8),height);
  // }
}
