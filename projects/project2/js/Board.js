// Board
//
// A class that defines how a board behaves, including the ability
// to calculate the points and to display the levels

// Board constructor
//
// Sets the properties with the provided arguments or defaults
function Board(x,y,w,h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

// display ()
//
// Draw the board on the screen
Board.prototype.display = function() {
  fill(255,0,0);
  rect(this.x,this.y,this.w,this.h);
}
