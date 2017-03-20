var ball;
var paddle;
var numberOfBalls = 2;


var balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < numberOfBalls; i++) {
    // Ball (x, y, d, c, xs, ys, toRemove)
    balls[i] = new Ball(random(width), random(height), random(15, 40), color(random(255), random(255), random(255)), random(1, 7), random(1, 7), false);
  }
  paddle = new Paddle(random(width), random(height), random(40, 90), random(40, 90), color(random(255), random(255), random(255)))
}

function draw() {
  background(255);
  // for (var i = balls.length-1; i >= 0; i--) {
  for (var i = 0; i < balls.length; i++) {
    balls[i].show();
    balls[i].move();
    balls[i].detectEdges();
    balls[i].detectPaddle(paddle);
    var death = balls[i].ballRemoval();
    
    if(death == true){
      balls.splice(i,1);
    }
  }
  paddle.show();
  paddle.move();

}

function mousePressed(){
  balls.push(new Ball(mouseX+(paddle.w * ceil(random(-1,1))),mouseY+(paddle.h * ceil(random(-1,1))), random(15, 40), color(random(255), random(255), random(255)), random(1, 7), random(1, 7), false));
}


function Ball(x, y, d, c, xs, ys, toRemove) {
  this.x = x;
  this.y = y;
  this.d = d;
  this.c = c;
  this.xspeed = xs;
  this.yspeed = ys;
  this.toRemove = toRemove;
  this.counter = 0;

  this.show = function() {
    fill(c);
    noStroke();
    ellipse(this.x, this.y, this.d, this.d);
  }

  this.move = function() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
  }

  this.detectEdges = function() {
    if (this.x > width || this.x < 0) {
      this.xspeed = this.xspeed * -1;
    }
    if (this.y > height || this.y < 0) {
      this.yspeed = this.yspeed * -1;
    }
  }

  this.detectPaddle = function(other) {
    // right side of paddle
    if (this.xspeed <= 0 && (this.x - (this.d / 2)) <= (other.x + (other.w / 2)) && this.x >= (other.x - (other.w / 2)) && (this.y <= (other.y + (other.h / 2)) && this.y >= (other.y - (other.h / 2)))) {
      this.xspeed = this.xspeed * -1;
      this.counter++;
    }
    //left side of paddle
    if (this.xspeed > 0 && (this.x + (this.d / 2)) >= (other.x - (other.w / 2)) && this.x <= (other.x + (other.w / 2)) && (this.y <= (other.y + (other.h / 2)) && this.y >= (other.y - (other.h / 2)))) {
      this.xspeed = this.xspeed * -1;
      this.counter++;
    }
    //bottom of paddle
    if (this.yspeed <= 0 && (this.y - (this.d / 2)) <= (other.y + (other.h / 2)) && (this.y - (this.d / 2)) >= (other.y - (other.h / 2)) && this.x <= (other.x + (other.w / 2)) && this.x > (other.x - other.w / 2)) {
      this.yspeed = this.yspeed * -1;
      this.counter++;
    }
    // //top of paddle
    if (this.yspeed > 0 && (this.y + (this.d / 2)) >= (other.y - (other.h / 2)) && (this.y + (this.d / 2)) <= (other.y + (other.h / 2)) && this.x <= (other.x + (other.w / 2)) && this.x > (other.x - other.w / 2)) {
      this.yspeed = this.yspeed * -1;
      this.counter++;
    }
  }
  this.ballRemoval = function() {
    if (this.counter >= 10) {
      this.toRemove = true;
    }
    return this.toRemove;
  }

}

function Paddle(x, y, w, h, c) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = c;

  this.show = function() {
    rectMode(CENTER);
    fill(c);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }
  this.move = function() {
    paddle.x = mouseX;
    paddle.y = mouseY;
  }

}