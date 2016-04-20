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
    $scope.data = [{
      'id': 1,
      'title': 'node1',
      'nodes': [
        {
          'id': 11,
          'title': 'node1.1',
          'nodes': [
            {
              'id': 111,
              'title': 'node1.1.1',
              'nodes': []
            }
          ]
        },
        {
          'id': 12,
          'title': 'node1.2',
          'nodes': []
        }
      ]
    }, {
      'id': 2,
      'title': 'node2',
      'nodrop': true, // An arbitrary property to check in custom template for nodrop-enabled
      'nodes': [
        {
          'id': 21,
          'title': 'node2.1',
          'nodes': []
        },
        {
          'id': 22,
          'title': 'node2.2',
          'nodes': []
        }
      ]
    }, {
      'id': 3,
      'title': 'node3',
      'nodes': [
        {
          'id': 31,
          'title': 'node3.1',
          'nodes': []
        }
      ]
    }];

    $scope.remove = function (scope) {
      scope.remove();
    };

    $scope.toggle = function (scope) {
      scope.toggle();
    };

    $scope.moveLastToTheBeginning = function () {
      var a = $scope.data.pop();
      $scope.data.splice(0, 0, a);
    };

    $scope.newSubItem = function (scope) {
      var nodeData = scope.$modelValue;
      nodeData.nodes.push({
        id: nodeData.id * 10 + nodeData.nodes.length,
        title: nodeData.title + '.' + (nodeData.nodes.length + 1),
        nodes: []
      });
    };

  }])
;
  

