'use strict';

angular.module('core').controller('InsertImageController', ['$scope', '$modalInstance',
  function($scope, $modalInstance){

  $scope.insert = function(){
    $modalInstance.close($scope.image);
  };
}]);