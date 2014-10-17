(function(){
  'use strict';
  angular.module('kj-ball')
  .controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    var canvas,
        holeCanvas,
        context,
        ballCanvas,
        holeContext,
        ballContext;

    //get device size
    $scope.trueWidth = document.documentElement.clientWidth * 1;
    $scope.trueHeight = document.documentElement.clientHeight * 1;
    $scope.height = $scope.trueHeight - 107;
    $scope.width = $scope.trueWidth - 20;

    //canvas
    function init(){
      canvas = document.getElementById('gameboard');
      context = canvas.getContext('2d');

      window.addEventListener('resize', resizeCanvas, true);
      window.addEventListener('orientationchange', resizeCanvas, true);
      resizeCanvas();

      context.fillStyle = '#289eb5';
      context.fillRect(0, 0, $scope.trueWidth, $scope.trueHeight);

      // HOLE  -------------------------
      holeCanvas = document.getElementById('hole');
      holeContext = holeCanvas.getContext('2d');
      var centerX = $scope.xHole,
      centerY = $scope.yHole,
      radius = 40;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'black';
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = 'black';
      context.stroke();
      //---------------------------------

      //----BALL-------------------------
      ballCanvas = document.getElementById('ball');
      ballContext = ballCanvas.getContext('2d');
      var ballCenterX = $scope.x,
          ballCenterY = $scope.y,
          radius      = 30;
      context.beginPath();
      context.arc(ballCenterX, ballCenterY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'yellow';
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = 'yellow';
      context.stroke();
      //-----------------------------------
    }


    function resizeCanvas(){
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
    }

    //place the ball randomly on the page
    $scope.y = Math.floor(Math.random()*($scope.height - 1 + 1) + 1);
    $scope.x = Math.floor(Math.random()*($scope.width - 1 + 1) + 1);
    $scope.yHole = Math.floor(Math.random()*($scope.height - 50 + 1) + 50);
    $scope.xHole = Math.floor(Math.random()*($scope.width - 50 + 1) + 50);
    //Math.floor(Math.random() * (max - min + 1) + min);

    //get phone roll, pitch and yaw
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
    });

    init();
  }]);
})();
