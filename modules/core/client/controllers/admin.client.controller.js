'use strict';

angular.module('core.admin').controller('AdminController', ['$scope', '$stateParams',
  function ($scope, $stateParams) {
    $scope.itemId = $stateParams.itemId;
  }
]);