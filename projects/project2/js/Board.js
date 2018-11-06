// Board
//
// A class that defines how a board behaves, including the ability
// to calculate the points and to display the levels

// Board constructor
//
// Sets the properties with the provided arguments or defaults
function Board(x,y,w,h,c,l,p,n,phFi,phS,phT,phFo,temp,level) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = c; // amount of carbohydrates processed
  this.l = l; // amount of lipids processed
  this.p = p; // amount of proteins processed
  this.n = n; // amount of nuclear acids processed
  this.phFi = phFi; // the value of the pH of each section
  this.phS = phS;
  this.phT = phT;
  this.phFo = phFo;
  this.temp = temp; // the value of the temperature of the organism
  this.level = level; // the level of the player
}

// updatePH()
//
// Update the pH of each location
Board.prototype.display = function(ph) {
  // text(pHs[0],0,0);
}

// display()
//
// Draw the board on the screen
Board.prototype.display = function() {

  // Design the background of the canvas
  background(255);
  fill(255);
  stroke(5,161,105);
  rect(40,40,560,560);
  stroke(0)
  fill(0);
  for (var i = 0; i < 200; i++) {
    line(pow(i,2),0,640,640-pow(i,2));
  }
  for (var i = 0; i < 200; i++) {
    line(0,-pow(i,2),640-pow(i,2),640);
  }
  // line(0,0,640,640);
  line(0,640,640,0);
  textSize(32);

  // Draw the board on the screen
  fill(0);
  rect(this.x,this.y,this.w,this.h);

  // Display the information about the pH
  noStroke();
  textSize(16);
  textFont(bold);
  fill(5,161,105);
  text("oral cavity,\nlarynx,\nesophagus\n",(width-395.542)/2,height/3);
  text("stomac\n",(width-395.542)/1.5,height/2);
  text("lumen of\nsmall intestine\n",(width-395.542)/2,height/1.6);
  text("epithelium of\nsmall intestine",(width-395.542)/3,height/2);
  //******* PUT IN A LOOP
  text("\n\n\npH = " + pHs[0],(width-395.542)/2,height/3);
  text("\npH = " + pHs[1],(width-395.542)/1.5,height/2);
  text("\n\npH = " + pHs[2],(width-395.542)/2,height/1.6);
  text("\n\npH = " + pHs[3],(width-395.542)/3,height/2);


  // Add the informations about the enzymes
  fill(0);
  textSize(19);
  textFont(black);
  text(enzymes[0],(width-395.542)/2,30);
  rotate(PI/2);
  text(enzymes[1],height/2,-610);
  rotate(PI/2);
  text(enzymes[2],-height/2,-610);
  rotate(PI/2);
  text(enzymes[3],-height/2,30)
  rotate(PI/2);
  textAlign(CENTER);


}
