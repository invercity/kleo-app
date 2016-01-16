'use strict';

angular.module('core.admin').controller('AdminController', ['$scope', 'AdminService',
  function ($scope, AdminService) {

    $scope.tabs = AdminService.getAdminPages();

    $scope.selectedTab = {
      head: null,
      subhead: null
    };

    $scope.setActive = function(item) {
      if ($scope.selectedTab.subhead && item !== $scope.selectedTab.subhead) $scope.selectedTab.subhead.active = false;
      item.active = true;
      $scope.selectedTab.subhead = item;
    };

    $scope.setActiveHead = function(head) {
      if ($scope.selectedTab.head && head !== $scope.selectedTab.head) {
        $scope.selectedTab.head.active = false;
        $scope.selectedTab.subhead.active = false;
      }
      head.active = true;
      $scope.selectedTab.head = head;
      if (head.items.length) {
        head.items[0].active = true;
        $scope.selectedTab.subhead = head.items[0];
      }
      getDataForActive();
    };

    var getDataForActive = function() {
      switch ($scope.selectedTab.head.id) {
        case 'models':
          $scope.selectedTab.subhead.model.query(function(data) {
            $scope.items = data;
          });
          break;
      }
    };

    $scope.setActiveHead($scope.tabs[0]);
  }
]);