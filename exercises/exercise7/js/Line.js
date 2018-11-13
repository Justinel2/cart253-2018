// Line
//
// A class to define how the lines of the interactive map behave.
//

// Line constructor
//
// Sets the properties with the provided arguments
function Line(x1,y1,x2,y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  // this.angle = angle;
  // this.angleIncrease = angleIncrease;
}

// display()
//
// Display the horizontal and vertical lines depending on the screen
Line.prototype.display = function() {

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
