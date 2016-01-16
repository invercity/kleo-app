'use strict';

angular.module('users.admin').controller('UserListController', ['$scope', '$filter', 'Admin',
  function ($scope, $filter, Admin) {
    Admin.query(function (data) {
      $scope.users = data;
      $scope.buildPager();
    });

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.users, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };

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
      if ($scope.selected.subhead && item != $scope.selected.subhead) $scope.selected.subhead.active = false;
      item.active = true;
      $scope.selected.subhead = item;
    };

    $scope.setActiveHead = function(head) {
      if ($scope.selected.head && head != $scope.selected.head) {
        $scope.selected.head.active = false;
        $scope.selected.subhead.active = false;
      }
      head.active = true;
      $scope.selected.head = head;
      head.items[0].active = true;
      $scope.selected.subhead = head.items[0];
    };

    $scope.setActiveHead($scope.data[0]);

    $scope.$watch('selected', function(n, o) {
      console.log('new: ', n, ', old: ', o)
    })
  }
]);