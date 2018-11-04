var balls = [];
var numBalls = 100;

function setup() {
    createCanvas(640,480);
    for (var i = 0; i < numBalls; i++) {
      balls.push(new Ball(width/2,height/2,random(-5,5),random(-5,5),10,5));
    }
    rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
    leftPaddle = new Paddle(0,height/2,10,60,10,83,87);
}

function draw() {
  background(0);

  leftPaddle.handleInputVertical();
  rightPaddle.handleInputVertical();

  leftPaddle.update();
  rightPaddle.update();

  for (var i = 0; i < balls.length; i++) {
    balls[i].update();
    if (balls[i].isOffScreen()) {
      balls[i].reset();
    }
    balls[i].handleCollision(leftPaddle);
    balls[i].handleCollision(rightPaddle);
    balls[i].display();
  }

  leftPaddle.display();
  rightPaddle.display();
}
