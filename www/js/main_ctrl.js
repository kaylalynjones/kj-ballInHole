/*global Hole, Ball, Player*/
(function(){
  'use strict';
  angular.module('kj-ball')
  .controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    var canvas,
        context,
        ball,
        hole,
        pattern,
        FPS = 60;

    //get device size-----------------------------------------------------------
    $scope.trueWidth = document.documentElement.clientWidth * 1;
    $scope.trueHeight = document.documentElement.clientHeight * 1;
    $scope.height = $scope.trueHeight - 50;
    $scope.width = $scope.trueWidth;


    $scope.newGame = function(){
      console.log('new game');
      $scope.player = new Player();
      init();
    };

    $scope.newGame();

    function init(){
      canvas = document.getElementById('gameboard');
      context = canvas.getContext('2d');

      window.addEventListener('resize', resizeCanvas, true);
      window.addEventListener('orientationchange', resizeCanvas, true);
      resizeCanvas();

      //place the ball randomly on the page---------------------------------------
      $scope.y = Math.floor(Math.random()*($scope.height - 1 + 1) + 1);
      $scope.x = Math.floor(Math.random()*($scope.width - 1 + 1) + 1);
      $scope.yHole = Math.floor(Math.random()*($scope.height - 50 + 1) + 50);
      $scope.xHole = Math.floor(Math.random()*($scope.width - 50 + 1) + 50);

      var imageObj = new Image();
      imageObj.onload = function(){
      pattern = context.createPattern(imageObj, 'repeat');
      context.fillRect(0, 0, $scope.trueWidth, $scope.trueHeight);
      context.fillStyle = pattern;
      context.fill();
      };
      imageObj.src = '../img/congruent_pentagon.png';

      hole = new Hole(15, {x:$scope.xHole, y:$scope.yHole});
      ball = new Ball(10, {x:$scope.x, y:$scope.y});
      setInterval(render, 1000/FPS);

    }

    function resizeCanvas(){
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
    }

    function render(){
      context.fillStyle = pattern;
      context.fillRect(0, 0, $scope.trueWidth, $scope.trueHeight);

      context.fill();
      ball.setCenter({x:$scope.x, y:$scope.y});
      hole.render(context);
      ball.render(context);

      if (ball.checkCollision(hole.getCenter())){
        $scope.player.incrementScore();
        init();
      }
    }

    //get phone roll, pitch and yaw---------------------------------------------
    window.addEventListener('deviceorientation', function(data){
      var yOffset = data.beta / 5,
          xOffset = data.gamma / 5;

      if (($scope.y + yOffset) <= $scope.height && ($scope.y + yOffset) >= 0){
        $scope.y += yOffset;
      }
      if (($scope.x + xOffset) <= $scope.width && ($scope.x + xOffset) >= 0){
        $scope.x += xOffset;
      }
      $scope.$digest();


      //update ball's position
    });

    init();
  }]);
})();
