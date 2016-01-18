'use strict';

angular.module('core').controller('FooterController', ['$scope', 'SystemData', function($scope, SystemData) {
  SystemData.getData().then(function(data) {
    $scope.app = data;
  });
}]);
