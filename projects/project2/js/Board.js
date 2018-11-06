// Board
//
// A class that defines how a board behaves, including the ability
// to calculate the points and to display the levels

// Board constructor
//
// Sets the properties with the provided arguments or defaults
function Board(x,y,w,h,c,l,p,n,phFi,phS,phT,phFo,temp,level,sCFi,sCS,sCT,sCFo) {
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
  this.sCFi = sCFi;
  this.sCS = sCS;
  this.sCT = sCT;
  this.sCFo = sCFo;
}

// handlePH()
//
// Handles the consequences due to the fluctuation of the pH at each location
Board.prototype.handlePH = function(paddle) {
  if (this.phFi <= 6.5 || this.phFi >= 7.5) {
    this.sCFi = 255;
    if (this.phFi >= 0) {
      this.c = floor(this.phFi*-1);
    }
  }
  else if (this.phS <= 1.5 || this.phS >= 3.5) {
    this.sCS = 200;
    if (this.phS >= 0) {
      this.l = floor(this.phS*-1);
    }
  }
  else if (this.phT <= 6.7 || this.phT >= 8.7) {
    this.sCT = 200;
    if (this.phT >= 0) {
      this.p = floor(this.phT*-1);
    }
  }
  else if (this.phFo <= 6.7 || this.phFo >= 8.7) {
    this.sCFo = 200;
    if (this.phFo >= 0) {
      this.n = floor(this.phT*-1);
    }
  }
  else {
    this.sCFi = 255;
  }
}

// handleTemp()
//
// Updates the consequences due to the fluctuation of the body temperature
Board.prototype.display = function(restart) {
  if (this.t < 0 || this.t > 60) {
    restart++;
  }
}

// updateLevels()
//
// Update the points based on the total for each macromolecules
Board.prototype.updateLevels = function(points,total) {
  if (this.c >= this.level*2 && this.l >= this.level*2 && this.p >= this.level*2 && this.n >= level*2) {
    this.level++;
    console.log(this.level);
  }
}

// display()
//
// Draw the board on the screen
Board.prototype.display = function() {

  // Design the background of the canvas
  background(255);
  fill(255);
  noStroke();
  rect(40,40,560,560);

  // Design the four sections
  // First section (top)
  fill(this.sCFi);
  triangle(0,0,640,0,(width-395.542)/2,height/2);
  // Second section (right)
  fill(this.sCS);
  triangle(640,0,640,640,(width-395.542)/2,height/2);
  // Third section (bottom)
  fill(this.sCT);
  triangle(640,640,0,640,(width-395.542)/2,height/2);
  // Fourth section (left)
  fill(this.sCFo);
  triangle(0,0,0,640,(width-395.542)/2,height/2);

  // Design lines background
  stroke(5,161,105)
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

  // Display the information about the pH
  noStroke();
  textSize(16);
  textFont(bold);
  fill(0);
  text("oral cavity,\nlarynx,\nesophagus\n",(width-395.542)/2,height/3);
  text("stomac\n",(width-395.542)/1.5,height/2);
  text("lumen of\nsmall intestine\n",(width-395.542)/2,height/1.6);
  text("epithelium of\nsmall intestine",(width-395.542)/3,height/2);
  //******* PUT IN A LOOP
  text("\n\n\npH1 = " + this.phFi,(width-395.542)/2,height/3);
  text("\npH2 = " + this.phS,(width-395.542)/1.5,height/2);
  text("\n\npH3 = " + this.phT,(width-395.542)/2,height/1.6);
  text("\n\npH4 = " + this.phFo,(width-395.542)/3,height/2);

  // Add the informations about the enzymes
  fill(0);
  textFont(black);
  textSize(19);
  text(enzymes[0],(width-395.542)/2,30);
  rotate(PI/2);
  text(enzymes[1],height/2,-610);
  rotate(PI/2);
  text(enzymes[2],-height/2,-610);
  rotate(PI/2);
  text(enzymes[3],-height/2,30)
  rotate(PI/2);
  textAlign(CENTER);

  // Draw the board on the screen
  fill(0);
  rect(this.x,this.y,this.w,this.h);
  fill(5,161,105);
  rect(this.x,this.y,this.w,this.h/8);

  // Add the information about the temperature
  fill(0);
  textSize(28);
  text("TEMPERATURE = " + this.temp + " °C", this.x,this.y+20,this.w,this.h);

  // Add the information about the level
  text("LV: " + this.level,100,height/8);

  // Add the information about the number of macromolecules ingested
  // carbohydrates
  textSize(24);
  fill(255,238,0);
  text("CARBOHYDRATES -> MONOSACCHARIDES\n" + this.c, this.x,this.y/8+100,this.w,this.h);
  // proteins
  fill(0,255,0);
  text("PROTEINS -> AMINO ACIDS\n" + this.p, this.x,this.y/8+250,this.w,this.h);
  // lipids
  fill(255,0,0);
  text("LIPIDS -> GLYCEROL,\n FATTY ACIDS,\n GLYCERIDS\n" + this.l, this.x,this.y/8+350,this.w,this.h);
  // nuclear acids
  fill(0,0,255);
  text("NUCLEAR ACIDS ->\nNITROGENOUS BASES,\n SUGARS, PHOSPHATES\n" + this.n, this.x,this.y/8+500,this.w,this.h);
}

// startGame()
//
// A function to prompt the user to start the game (with instructions)
Board.prototype.startGame = function() {
  do {
    background(255)
    fill(5,161,105);
    textSize(40);
    textFont(black);
    textAlign(CENTER,CENTER);
    text("WELCOME TO THE\n MACROMOLECULES OF LIFE\n SIMULATION\n\n",(width/2)-320,50,800);
    textSize(20);
    fill(0);
    text("You control the enzymes of the human organism that are able to digest the four macromolecules of life : carbohydrates, lipids, proteins and nuclear acids.\nThese enzymes are located on the four paddles of this PONG game.\n\n You need to capture the right macromolecule with the right paddle or bounce it to the right one. You also need to maintain homeostasis in the four sections of the organisms by controlling the pH and the body temperature.\n\n Grow levels by achieving the level objectives in time.\n\nRestart the level if you didn’t.\n\nLose if you kill your organism by restarting 3 times or by a too high/low body temperature (maintain it between 0 to 60).\n\nPRESS SPACE TO START!\n",(width/2)-320,height/2.8,800);
  } while (!keyIsDown(32))
}

// resetGame()
//
// A function to reset the whole reset the game when lost
Board.prototype.resetGame = function() {

}
