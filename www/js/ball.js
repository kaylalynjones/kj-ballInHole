'use strict';

function Ball(radius, center){
  this.radius = radius;
  this.center = center;
  this.color = '#f67373';
}

Ball.prototype.setCenter = function(center){
  this.center = center;
};

Ball.prototype.setColor = function(color){
  this.color = color;
};

Ball.prototype.checkCollision = function(position, radius){
    var x = this.center.x,
        y = this.center.y,
        x0 = position.x,
        y0 = position.y;

    return distance(x, y, x0, y0) <= this.radius;
};

Ball.prototype.render = function(context){
  context.beginPath();
  context.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);
  context.fillStyle = this.color;
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = this.color;
  context.stroke();
};


function distance(x, y, x0, y0){
  return Math.sqrt((x -= x0) * x + (y -= y0) * y);
}
