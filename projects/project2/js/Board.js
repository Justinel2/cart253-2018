// Board
//
// A class that defines how a board behaves, including the ability
// to calculate the points and to display the levels

// Board constructor
//
// Sets the properties with the provided arguments or defaults
function Board(x,y,w,h,c,l,p,n,phFi,phS,phT,phFo,temp,level,sCFi,sCS,sCT,sCFo,eFi,eS,eT,eFo,max,interval,control) {
  this.x = x;       // the x position of the side board
  this.y = y;       // the y position of the side board
  this.w = w;       // the width of the side board
  this.h = h;       // the height of the side board
  this.c = c;       // amount of carbohydrates processed
  this.l = l;       // amount of lipids processed
  this.p = p;       // amount of proteins processed
  this.n = n;       // amount of nuclear acids processed
  this.phFi = phFi; // the value of the pH of the first section (top)
  this.phS = phS;   // the value of the pH of the second section (right)
  this.phT = phT;   // the value of the pH of the third section (bottom)
  this.phFo = phFo; // the value of the pH of the fourth section (left)
  this.temp = temp; // the value of the temperature of the organism
  this.level = level;// the level of the player
  this.sCFi = sCFi; // the color value of the first section (top)
  this.sCS = sCS;   // the color value of the second section (right)
  this.sCT = sCT;   // the color value of the third section (bottom)
  this.sCFo = sCFo; // the color value of the fourth section (left)
  this.eFi = eFi;   // binary indication that the first section has already been or not penalised by a pH -1
  this.eS = eS;     // binary indication that the second section has already been or not penalised by a pH -1
  this.eT = eT;     // binary indication that the third section has already been or not penalised by a pH -1
  this.eFo = eFo;   // binary indication that the fourth section has already been or not penalised by a pH -1
  this.max = max;   // the maximum amount of macromolecule to generate to succed the current level
  this.interval = interval;// the interval of time between macromolecule generation for the timer
  this.control = control;  // a binary variable for control
}

// handlePH()
//
// Handle the consequences due to the fluctuation of the pH at each location
// That is, if the pH of each section is lower or higher than its ideal pH
// The color of the section becomes grey
// and if it is right after taken a pH-1 icon, we remove one molecule to each type macromolecule digerated
// that can be absorbed by the enzymes present on that specific paddle/in that specific section
Board.prototype.handlePH = function(paddle) {
  // If the pH of the first section (top) is lower than 6.5 or higher than 7.5,
  // The color of the section becomes grey
  if (this.phFi <= 6.5 || this.phFi >= 7.5) {
    this.sCFi = 255;
    // If it is right after taken a pH-1, remove one carbohydrates to the total amount digerated
    if (this.eFi === 0) {
      this.c--;
      // Mark the icon processed in this section
      this.eFi++
    }
  }
  // If the pH of the first section (top) is between 6.5 and 7.5 exclusively,
  // Reset the color of the section to white
  else {
    this.sCFi = 255;
  }
  // If the pH of the second section (right) is lower than 1.5 or higher than 3.5 inclusively,
  // The color of the section becomes grey
  if (this.phS <= 1.5 || this.phS >= 3.5) {
    this.sCS = 200;
    // If it is right after taken a pH-1, remove one protein to the total amount digerated
    if (this.eS === 0) {
      this.p--;
      // Mark the icon processed in this section
      this.eS++
    }
  }
  // If the pH of the second section (right) is between 1.5 and 3.5 exclusively,
  // Reset the color of the section to white
  else {
    this.sCS = 255;
  }
  // If the pH of the third section (bottom) is lower than 6.7 or higher than 8.7 inclusively,
  // The color of the section becomes grey
  if (this.phT <= 6.7 || this.phT >= 8.7) {
    this.sCT = 200;
    // If it is right after taken a pH-1, remove one protein, one lipid, one nuclear acid
    // and one carbohydrate to the total amount digerated
    if (this.eT === 0) {
      this.p--;
      this.l--;
      this.n--;
      this.c--;
      // Mark the icon processed in this section
      this.eT++;
    }
  }
  // If the pH of the third section (bottom) is between 6.7 and 8.7 exclusively,
  // Reset the color of the section to white
  else {
    this.sCT = 255;
  }
  // If the pH of the fourth section (left) is lower than 6.7 or higher than 8.7 inclusively,
  // The color of the section becomes grey
  if (this.phFo <= 6.7 || this.phFo >= 8.7) {
    this.sCFo = 200;
    // If it is right after taken a pH-1, remove one protein
    // and one carbohydrate to the total amount digerated
    if (this.eFo === 0) {
      this.c--;
      this.p--;
      // Mark the icon processed in this section
      this.eFo++;
    }
  }
  // If the pH of the third section (bottom) is between 6.7 and 8.7 exclusively,
  // Reset the color of the section to white
  else {
    this.sCFo = 255;
  }
}

// updateLevel()
//
// Update the points based on the total for each macromolecules and its consequences
// Each level up, the amount of macromolecules available to do the level is lower and the
// generation is faster
Board.prototype.updateLevel = function() {
  // If each of the macromolecule the level requested are digested
  if (this.c >= this.level && this.l >= this.level && this.p >= this.level && this.n >= this.level) {
    // The level is level higher
    this.level++;
    this.control = 1;
    // The maximum of macromolecules generated is now lower
    this.max -= this.level;
    // The amount of time between each generation interval is lower
    this.interval -= this.level*20
  }
}

// display()
//
// Draw the board on the screen and its informations
Board.prototype.display = function(totalMacros) {

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

  // Display the information about the pH for each section
  noStroke();
  textSize(16);
  textFont(bold);
  fill(0);
  // area information of first section
  text("oral cavity,\nlarynx,\nesophagus\n",(width-395.542)/2,height/3);
  // area information of second section
  text("stomac\n",(width-395.542)/1.5,height/2);
  // area information of third section
  text("lumen of\nsmall intestine\n",(width-395.542)/2,height/1.6);
  // area information of fourth section
  text("epithelium of\nsmall intestine",(width-395.542)/3,height/2);

  // pH information of first section
  text("\n\n\npH = " + this.phFi,(width-395.542)/2,height/3);
  // pH information of second section
  text("\npH = " + this.phS,(width-395.542)/1.5,height/2);
  // pH information of third section
  text("\n\npH = " + this.phT,(width-395.542)/2,height/1.6);
  // pH information of fourth section
  text("\n\npH = " + this.phFo,(width-395.542)/3,height/2+10);

  // Add the informations about the enzymes
  fill(0);
  textFont(black);
  textSize(19);
  // enzyme information of first section
  text(enzymes[0],(width-395.542)/2,30);
  // enzyme information of second section
  rotate(PI/2);
  text(enzymes[1],height/2,-610);
  // enzyme information of third section
  rotate(PI/2);
  text(enzymes[2],-height/2,-610);
  // enzyme information of fourth section
  rotate(PI/2);
  text(enzymes[3],-height/2,30)
  // Reset the canvas at the right orientation
  rotate(PI/2);
  textAlign(CENTER);

  // Draw the board on the screen
  fill(0);
  // Black section
  rect(this.x,this.y,this.w,this.h);
  fill(5,161,105);
  // Green section
  rect(this.x,this.y,this.w,this.h/8);

  // Add the information about the temperature
  fill(0);
  textSize(28);
  text("TEMPERATURE = " + this.temp + " °C", this.x,this.y-280,this.w,this.h);


  // Add the information about the level and its remaining macromolecules to
  // be generated before the end of the level
  text("LV: " + this.level,100,height/8);
  textSize(24);
  text("\n" + (this.max-totalMacros),100,height/8+15);

  // Add the information about the number of macromolecules ingested
  // in the side board
  // carbohydrates (yellow)
  textSize(24);
  fill(255,238,0);
  text("CARBOHYDRATES -> MONOSACCHARIDES\n" + this.c + " / " + this.level, this.x,(this.y/8+100)-300,this.w,this.h);
  // proteins (green)
  fill(0,255,0);
  text("PROTEINS -> AMINO ACIDS\n" + this.p + " / " + this.level, this.x,this.y-75,this.w,this.h);
  // lipids (red)
  fill(255,0,0);
  text("LIPIDS -> GLYCEROL,\n FATTY ACIDS,\n GLYCERIDS\n" + this.l + " / " + this.level, this.x,this.y/8+25,this.w,this.h);
  // nuclear acids (blue)
  fill(0,0,255);
  text("NUCLEAR ACIDS ->\nNITROGENOUS BASES,\n SUGARS, PHOSPHATES\n" + this.n + " / " + this.level, this.x,this.y/8+175,this.w,this.h);
}

// startGame()
//
// A function to prompt the user to start the game (with instructions)
Board.prototype.startGame = function() {
    // Reset the level, the amount of carbohydrate/lipids/proteins/nuclear acids ingested to 0
    this.level = 0;
    this.c = 0;
    this.p = 0;
    this.l = 0;
    this.n = 0;
    // Take all the canvas and display the welcome message with the instructions
    background(255)
    fill(5,161,105);
    textSize(40);
    textFont(black);
    textAlign(CENTER,CENTER);
    text("WELCOME TO THE\n MACROMOLECULES OF LIFE\n SIMULATION\n\n",(width/2)-320,50,800);
    textSize(20);
    fill(0);
    text("You control the enzymes of the human organism that are able to digest the four macromolecules of life : carbohydrates, lipids, proteins and nuclear acids.\nThese enzymes are located on the four paddles of this PONG game.\n\n You need to capture the right macromolecule with the right paddle or bounce it to the right one. You also need to maintain homeostasis in the four sections of the organisms by controlling the pH and the body temperature.\n\n Grow levels by achieving the level objectives in time.\n\nRestart the level if you didn’t.\n\nLose if you kill your organism by restarting 3 times or by a too high/low body temperature (maintain it between 0 to 60).\n\nPRESS SPACE TO START!\n",(width/2)-320,height/2.8,800);

    // If the user press enter, the player can start to play the game at level 1
    if (keyIsDown(32)) {
      this.level = 1;
    }
}



// resetGame()
//
// A function to reset the whole reset the game when lost
Board.prototype.resetGame = function(totalMacros) {
  // Display the "you lost" message
  background(255)
  fill(5,161,105);
  textSize(40);
  textFont(black);
  textAlign(CENTER,CENTER);
  text("YOU LOST...\n\n...RESTART? (PRESS SPACE)\n",(width/2)-320,height/2-100,800);

    // If the user press on the space key, the temperature and the level are resetted
    // to restart the game
    if (keyIsDown(32)) {
      this.level = 0;
      this.temp = 37;
    }
  }
