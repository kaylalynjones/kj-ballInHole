'use strict';

function Hole(radius, center){
  this.radius = radius;
  this.center = center;
}

Hole.prototype.getCenter = function(){
  return this.center;
};

Hole.prototype.render = function(context){
  context.beginPath();
  context.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'black';
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = 'black';
  context.stroke();
};
