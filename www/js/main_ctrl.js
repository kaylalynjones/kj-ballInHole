(function(){
  'use strict';
  angular.module('kj-ball')
  .controller('MainCtrl', ['$scope', function($scope){

    //get device size
    $scope.trueWidth = document.documentElement.clientWidth * 1;
    $scope.trueHeight = document.documentElement.clientHeight * 1;
    $scope.height = $scope.trueHeight - 107;
    $scope.width = $scope.trueWidth - 20;

    //$scope.height = $scope.width - 40;
    // this gets the pixel density---probably wont use for the time being.
    $scope.availWidth = window.screen.availWidth;
    $scope.availHeight = window.screen.availHeight;
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

    //canvas
    function draw(){
      var canvas = document.getElementById('gameboard'),
          context = canvas.getContext('2d'),
      //canvasContext.fillRect(50, 25, 150, 100);
      myGradient = context.createLinearGradient(0, 0, $scope.width, $scope.height);
      myGradient.addColorStop(0, '#674a96');
      myGradient.addColorStop(1, '#289eb5');
      context.fillStyle = myGradient;
      context.fillRect(0, 0, $scope.width, $scope.height);

      var centerX = $scope.xHole,
          centerY = $scope.yHole,
          radius = 40;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'black';
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = 'black';
      context.stroke();

      //context.arc(x, y, radius, 0, Math.PI * 2);
      //context.fill();
      //context.stroke();
    }
    draw();

  }]);
})();
