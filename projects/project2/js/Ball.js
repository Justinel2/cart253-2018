// Ball
//
// A class to define how the macromolecules and modifiers behaves.
// Including bouncing off paddles or digesting the different macromolecules/modifiers.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x,y,vx,vy,size,speed,img) {
  this.x = x;         // the x-coordinate of the macromolecule
  this.y = y;         // the y-coordinate of the macromolecule
  this.vx = vx;       // the velocity on the x-axis of the macromolecule
  this.vy = vy;       // the velocity on the y-axis of the macromolecule
  this.size = size;   // the size of the macromolecule
  this.speed = speed; // the speed of the macromolecule
  this.img = img;     // the icon image associated to tha macromolecule
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;
}

// display()
//
// Draw the ball as a macromolecule/modifier icon on the screen
Ball.prototype.display = function () {
  image(this.img,this.x,this.y,this.size,this.size);
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle,board) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // // Reverse x velocity to bounce
      // this.vx = -this.vx;
      // // Reverse y velocity to bounce
      // this.vy = -this.vy;

      // Check if there has been a contact from a molecule to a paddle,
      // check which paddle it is and, depending on its enzyme,
      //digest the macromolecule/modifier
      //
      // **************If the paddle is the top one
      if (paddle.h === 15 && paddle.y === 40) {
        // Reverse y velocity to bounce
        this.vy = -this.vy;
        //If it is a polysaccharide
        if (this.img === macros[0]){
          // Digest the polysaccharide into a disaccharide
          this.img = macros[1];
        }
        //If it is a disaccharide
        else if (this.img === macros[1]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Add one carbohydrate digested on the board
          board.c++;
        }
        // If it is a pH + 1
        else if (this.img === macros[5]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Add one to the pH of the section
          board.phFi++;
        }
        // If it is a pH - 1
        else if (this.img === macros[6]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Remove one to the pH of the section
          board.phFi--;
          board.eFi = 0;
        }
        // If it is a Temp. +10
        else if (this.img === macros[7]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Add 10 to the body temperature
          board.temp += 10;
        }
        // If it is a Temp. -10
        else if (this.img === macros[8]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Remove 10 to the body temperature
          board.temp -= 10;
        }
      }
      //
      // **************If the paddle is the bottom one
      else if (paddle.h === 15 && paddle.y === height-54){
        // Reverse y velocity to bounce
        this.vy = -this.vy;
        // If the macromolecule is a disaccharide, a lipid, a protein or a nuclear acid, change the icon for transparency
        if (this.img === macros[1]){
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Add one carbohydrate digested on the board
          board.c++;
        }
        else if (this.img === macros[2]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Add one lipid digested on the board
          board.l++;
        }
        else if (this.img === macros[3]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Add one protein digested on the board
          board.p++;
        }
        else if (this.img === macros[4]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Add one nuclear acid digested on the board
          board.n++;
        }
        // If it is a pH + 1
        else if (this.img === macros[5]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Add one to the pH of the section
          board.phT++;
        }
        // If it is a pH - 1
        else if (this.img === macros[6]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Remove one to the pH of the section
          board.phT--;
          // Indicate that the section needs to be processed in handlePh() in Board.js
          board.eT = 0;
        }
        // If it is a Temp. +10
        else if (this.img === macros[7]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Add 10 to the body temperature
          board.temp += 10;
        }
        // If it is a Temp. -10
        else if (this.img === macros[8]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Remove 10 to the body temperature
          board.temp -= 10;
        }
      }
      //
      // **************If the paddle is the left one
      else if (paddle.h === 150 && paddle.x === 40) {
        // Reverse x velocity to bounce
        this.vx = -this.vx;
        // If the macromolecule is a disaccharide or a protein, change the icon for transparency
        if (this.img === macros[1]){
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Add one carbohydrate digested on the board
          board.c++;
        }
        else if (this.img === macros[3]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Add one protein digested on the board
          board.p++;
        }
        // If it is a pH + 1
        else if (this.img === macros[5]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Add one to the pH of the section
          board.phFo++;
        }
        // If it is a pH - 1
        else if (this.img === macros[6]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Substract one to the pH of the section
          board.phFo--;
          // Indicate that the section needs to be processed in handlePh() in Board.js
          board.eFo = 0;
        }
        // If it is a Temp. +10
        else if (this.img === macros[7]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Add 10 to the body temperature
          board.temp += 10;
        }
        // If it is a Temp. -10
        else if (this.img === macros[8]) {
          // Digested! - Change the icon for transparency
          this.img = macros[9];
          // Remove 10 to the body temperature
          board.temp -= 10;
        }
      }
      //
      // **************If the paddle is the right one
      else {
        // Reverse x velocity to bounce
        this.vx = -this.vx;
        // If the macromolecule is a protein, change the icon for transparency
        if (this.img === macros[3]){
          this.img = macros[9];
          // Add one protein digested on the board
          board.p++;
        }
        // If it is a pH + 1
        else if (this.img === macros[5]) {
          this.img = macros[9];
          // Add one to the pH of the section
          board.phS++;
        }
        // If it is a pH - 1
        else if (this.img === macros[6]) {
          this.img = macros[9];
          // Substract one to the pH of the section
          board.phS--;
          // Indicate that the section needs to be processed in handlePh() in Board.js
          board.eS = 0;
        }
        // If it is a Temp. +10
        else if (this.img === macros[7]) {
          this.img = macros[9];
          // Add 10 to the body temperature
          board.temp += 10;
        }
        // If it is a Temp. -10
        else if (this.img === macros[8]) {
          this.img = macros[9];
          // Remove 10 to the body temperature
          board.temp -= 10;
        }
      }
    }
  }
}
