// Area
//
// A class to define how the interactive Area behaves. It is a map with the coordonates corresponding
// to the latitude and longitude.
//
// Area constructor
//
// Sets the properties with the provided arguments
function Area(x,y,size,color) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color;
}


// displayArea()
//
// Display the horizontal and vertical lines depending on the screen so
// it represents, as a perspective grid, the latitude and longitude.
Area.prototype.display = function(hiveX,hiveY) {

  // Create and display the vertical lines (the angle according to the sun)
  // Attribute the color white to the stroke of the lines
  stroke(255);

  // Vertical lines on the left side of the screen
  var angle = 3.3*PI/4;
  var angleIncrease = 0.01;

  for (var i = 0; i < 58; i++) {
    push();
    translate(width/2-80,-315);
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
    translate(width/2-80,-315);
    var x = 1000 * cos(angle);
    var y = 1000 * sin(angle);
    line(0,0,x,y);
    pop();
    angle += angleIncrease;
    angleIncrease += 0.001;
  }

  // Create and display the lines on the x-coordinate (the distance in meters)
  for (var i = 0; i < 200; i++) {
    line(0,pow(i,1.8)+100,width-200,pow(i,1.8)+100);
  }
  
  // Display the coordonate according to the area (in meters)
  // The coordonates should follow the mouse as it hover the map
  // Calculate the simulations coordonates (honey bees usually stay within a 3200m or perimeter of the hive)
  var areaX = nf(map(mouseX,0,width-300,-180,180),0,0);
  var areaY = nf(map(mouseY,100,height,90,-90),0,0);
  textSize(16);
  fill(255,0,0)
  text(areaX + "," + areaY, mouseX + 10, mouseY + 10);

}
