'use strict';

angular.module('core.admin')
  .controller('AdminController', ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.itemId = $stateParams.itemId;
  }])
  .controller('AdminMainController', ['$scope', '$stateParams', 'tabs', function($scope, $stateParams, tabs) {
    $scope.tabs = tabs;
    $scope.item = $stateParams.itemId ? ': ' + $stateParams.itemid : null;
  }]);

