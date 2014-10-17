(function(){
  'use strict';
  angular.module('kj-ball')
  .controller('MainCtrl', ['$scope', function($scope){

    //get device size
    $scope.width = document.documentElement.clientWidth * 1;
    $scope.height = document.documentElement.clientHeight * 1;
    $scope.height = $scope.height - 107;
    $scope.width = $scope.width - 20;
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

    //ios gyroscope
    /*function success(orientation){
      console.log('alpha:'+ orientation.alpha + ', beta' + orientation.beta +', gamma' + orientation.gamma);
      $scope.orientation = orientation;
      $scope.$digest();
    }
    function error(err){
      console.log('error', err);
    }
    $scope.start = function(){
      navigator.gyroscope.watchGyroscope(success, error, {frequency:100});
    };*/
    window.addEventListener('deviceorientation', function(data){
      var yOffset = data.beta / 5,
          xOffset = data.gamma / 10;

      if (($scope.y + yOffset) <= $scope.height && ($scope.y + yOffset) >= 0){
        $scope.y += yOffset;
      }
      if (($scope.x + xOffset) <= $scope.width && ($scope.x + xOffset) >= 0){
        $scope.x += xOffset;
      }
      $scope.$digest();
    });


  }]);
})();
