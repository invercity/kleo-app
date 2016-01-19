'use strict';

angular.module('core').config(function(NotificationProvider) {
  NotificationProvider.setOptions({
    delay: 100000,
    startTop: 20,
    startRight: 10,
    verticalSpacing: 20,
    horizontalSpacing: 20,
    positionX: 'right',
    positionY: 'bottom'
  });
});

angular.module('core').controller('MainController', ['$scope', '$http', '$state', 'Authentication', 'SystemData', 'Menus', 'Notification',
  function ($scope, $http, $state, Authentication, SystemData, Menus, Notification) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });

    $scope.getLocations = function(val) {
      return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(response){
        return response.data.results.map(function(item){
          return item.formatted_address;
        });
      });
    };

    SystemData.getData().then(function(data) {
      $scope.app = data;
    });
  }
]);
