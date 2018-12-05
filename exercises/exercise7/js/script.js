// Exercise 7 - Project 3, Prototype 1 -> Interactive map
// by Justine Lardeux
//
//
//
//
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var areaHive;
var colorHive = "#ff0000";
var areaLocations = [];

var textbox;

var bees = [];
var numBees = 15;
var beeImage;

var locationData;

var loveData;
var beesData;

var lines;
var markov;


// Loads the different media
function preload() {

  beeImage = loadImage('assets/images/P3_bee_cart253.png');

  loveData = loadStrings('assets/texts/loves.txt');
  beesData = loadStrings('assets/texts/bees.txt');

  locationData =  getCurrentPosition();
}

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(1200,575);


  areaHive = new Area(map(locationData.longitude,-180,180,0,width-300),map(locationData.latitude,90,-90,100,height),20,colorHive);


  textbox = new Textbox(900,0,300,height);

  for (var i = 0; i < numBees; i++) {
    bees.push(new Bee(random(0,width),random(0,height),random(-2,2),random(-2,2),100,2,beeImage));
  }

  lines = ["click to (re)generate!"];

 // create a markov model w' n=4
  markov = new RiMarkov(2);

 // load text into the model
 markov.loadText(loveData.join(' '));
 markov.loadText(beesData.join(' '));

}

function mousePressed() {
  l = new Area(mouseX,mouseY,10,255);
  areaLocations.push(l);
  lines = markov.generateSentences(5);
  // drawText();
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  for (let i = 0; i < areaLocations.length; i++) {
    areaLocations[i].display(areaHive.x,areaHive.y);
  }

  areaHive.display();

  textbox.display();

  for (var i = 0; i < bees.length; i++) {
    push();
    rotate(random(-1,1));
    bees[i].update();
    bees[i].handleWrapping();
    bees[i].display();
    pop();
  }
  drawText();
}

function drawText() {
  fill(255);
  noStroke();
  text(lines.join(' '), 950, 100, 200, 400);
}
