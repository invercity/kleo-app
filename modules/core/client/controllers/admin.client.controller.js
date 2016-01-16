'use strict';

angular.module('core.admin').controller('AdminController', ['$scope', 'Admin',
  function ($scope, Admin) {
    Admin.query(function (data) {
      $scope.items = data;
      $scope.options = {
        route: 'admin.user',
        modelId: 'userId',
        title: 'username',
        subtitle: 'email',
        other: 'roles'
      };
    });

    $scope.data = [
      {
        name: 'Models',
        items: [
          {name: 'Users'},
          {name: 'Posts'},
          {name: 'Roles'}
        ]
      }, {
        name: 'Pages',
        items: [
          {name: 'Position'},
          {name: 'Options'}
        ]
      }
    ];

    $scope.selected = {
      head: null,
      subhead: null
    };

    $scope.setActive = function(item) {
      if ($scope.selected.subhead && item !== $scope.selected.subhead) $scope.selected.subhead.active = false;
      item.active = true;
      $scope.selected.subhead = item;
    };

    $scope.setActiveHead = function(head) {
      if ($scope.selected.head && head !== $scope.selected.head) {
        $scope.selected.head.active = false;
        $scope.selected.subhead.active = false;
      }
      head.active = true;
      $scope.selected.head = head;
      head.items[0].active = true;
      $scope.selected.subhead = head.items[0];
    };

    $scope.setActiveHead($scope.data[0]);
  }
]);