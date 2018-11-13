// Map
//
// A class to define how the interactive map behaves.
//

// Line constructor
//
// Sets the properties with the provided arguments
function Map(x,y,angle,angleIncrease) {
  this.x = x;
  this.y = y;
}

// display()
//
// Display the horizontal and vertical lines depending on the screen
Map.prototype.display = function() {

  // Attribute the color white to the stroke of the lines
  stroke(255);

  // Create the vertical lines (the angle according to the sun)
  // Vertical lines on the left side of the screen
  var angle = 3.3*PI/4;
  var angleIncrease = 0.01;

  for (var i = 0; i < 58; i++) {
    push();
    translate(width/2,-145);
    var x = 1000 * cos(angle);
    var y = 1000 * sin(angle);
    line(0,0,x,y);
    pop();
    angle += angleIncrease;
    angleIncrease -= 0.001;
  }
  // Vertical lines on the right side of the screen
  for (var i = 0; i < 58; i++) {
    push();
    translate(width/2,-145);
    var x = 1000 * cos(angle);
    var y = 1000 * sin(angle);
    line(0,0,x,y);
    pop();
    angle += angleIncrease;
    angleIncrease += 0.001;
  }

  // Create the lines on the x-coordinate (the distance in meters)
  for (var i = 0; i < 200; i++) {
    line(0,pow(i,1.8)+100,width,pow(i,1.8)+100);
  }

  // Create a rectangle that masks the vertical lines passed the horizon line
  noStroke();
  fill(0);
  rect(0,0,width,100);
}
