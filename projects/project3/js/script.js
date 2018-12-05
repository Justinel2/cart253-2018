// Exercise 7 - Project 3, Prototype 1 -> Interactive map
// by Justine Lardeux
//
//
//
//
//
// Written with JavaScript OOP.


// Variable to contain the local/hive object
var areaHive;
// Variable to contain the user-generated locations in an array
var areaLocations = [];
// Variable containing the color values for the locations
var colorHive = "#ff0000";
var colorLocations = 0;

// Variable containing the latitude and longitude of the user (if possible)
// using the geolocation Library
var locationData;

// preload()
//
// Load the different medias and data
function preload() {
  // Load and attribute the position (lat,long)
  // of the user to the locationData variable
  locationData =  getCurrentPosition();

//setup()
//
// A function to setup the objects before drawing the program
function setup() {
  // create the canvas where the program will display
  createCanvas(1200,575);
  // Create a new object from the constructor in Area.js
  // Represents a 20px of diameter red ellipse for the local/hive location
  // Takes the previously acquired position of the user and puts it
  // 'a l'echelle' on the Area/map
  areaHive = new Area(map(locationData.longitude,-180,180,0,width-300),map(locationData.latitude,90,-90,100,height),20,colorHive);

}

// mousePressed()
//
// A function that is activated by the user clicking on the map
// The user click on the map to add a new location (white dots)that is going to be
// linked to the local/hive one (red dot)
// Each new location will generate randomly a new paragraph
function mousePressed() {
  l = new Area(mouseX,mouseY,10,255);
  // push the location of the mouse when clicked as a location in the array
  areaLocations.push(l);
  // // generate a paragraph of 5 sentences 
  // lines = markov.generateSentences(5);
}

// draw()
//
// create background, displays the objects and text, update the
// location of the bees and the marcov-generated text
function draw() {
  // Background color -> black
  background(0);
  // Display the local/hive area according to the display() function
  // in Area.js
  areaHive.display();
}
