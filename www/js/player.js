'use strict';

function Player(){
  this.score = 0;
}

Player.prototype.resetScore = function(){
  this.score = 0;
};

Player.prototype.getScore = function(){
  return this.score;
};

Player.prototype.incrementScore = function(){
  return ++this.score;
};
