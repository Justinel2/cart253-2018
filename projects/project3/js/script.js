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
}


}
