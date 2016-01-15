'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$http', '$state', 'Authentication', 'Menus',
  function ($scope, $http, $state, Authentication, Menus) {
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
  }
]);
