// Exercise 7 - Project 3, Prototype 1 -> Interactive map
// by Justine Lardeux
//
//
//
//
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var map;

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(900,575);

  map = new Map(0,0);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  map.display();

}
