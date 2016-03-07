'use strict';

angular.module('core').controller('FooterController', ['$scope', 'SystemData', function($scope, SystemData) {
  SystemData.getData().then(function(data) {
    $scope.app = data;

    // temporary data
    $scope.links = _.map(_.range(0, 4), function(el) {
      return _.map(_.range(0, 4), function(row) {
        var num = el * 4 + row + 1;
        if (num < 10) num = '0' + num;
        return 'Map Site Link #' + num;
      });
    });
  });
}]);