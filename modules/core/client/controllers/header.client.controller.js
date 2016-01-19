'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$http', '$state', 'Authentication', 'SystemData', 'Menus', 'NotificationService',
  function ($scope, $http, $state, Authentication, SystemData, Menus, NotificationService) {
    NotificationService.init();
    /*
    setTimeout(function() {
      NotificationService.showNotification({
        title: 'Kleo app',
        content: 'Something happened!',
        icon: 'modules/core/client/img/brand/kleo.png'
      });
    }, 5000);*/
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
