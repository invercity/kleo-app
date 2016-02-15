'use strict';

angular.module('core').controller('FooterController', ['$scope', 'SystemData', function($scope, SystemData) {
  SystemData.getData().then(function(data) {
    $scope.app = data;

    // temporary data
    $scope.links = _.map(_.range(0, 4), function(el) {
      return _.map(_.range(0, 4), function(row) {
        return 'Map Site Link #' + (el * 4 + row + 1);
      });
    });
  });
}]);