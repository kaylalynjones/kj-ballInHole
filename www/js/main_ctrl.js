(function(){
  'use strict';
  angular.module('kj-ball')
  .controller('MainCtrl', ['$scope', function($scope){
    $scope.hello = 'Hello';
//get device size
    $scope.width = document.documentElement.clientWidth;
    $scope.height = document.documentElement.clientHeight;
    // this gets the pixel density---probably wont use for the time being.
    $scope.availwidth = window.screen.availWidth;
    $scope.availHeight = window.screen.availHeight;
//place the ball randomly on the page

  }]);
})();
