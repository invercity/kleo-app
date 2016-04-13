'use strict';

angular.module('core.admin')
  .controller('AdminController', ['$scope', '$stateParams', 'tabs', function($scope, $stateParams, tabs) {
    $scope.tabs = tabs;
    $scope.item = $stateParams.itemId ? ': ' + $stateParams.itemid : null;
  }])
  .controller('AdminModelsController', ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.itemId = $stateParams.itemId;
  }])
  .controller('AdminConfigController', ['$scope', '$stateParams', function($scope, $stateParams) {
    
  }])
;
  

