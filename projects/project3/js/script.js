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
//
function setup() {
  // create the canvas where the program will display
  createCanvas(1200,575);
  // Create a new object from the constructor in Area.js
  areaHive = new Area(map(locationData.longitude,-180,180,0,width-300),map(locationData.latitude,90,-90,100,height),20,colorHive);

}

// draw()
//
// create background, displays the objects and text, update the
// location of the bees and the marcov-generated text
function draw() {
  // Background color -> black
  background(0);
}
