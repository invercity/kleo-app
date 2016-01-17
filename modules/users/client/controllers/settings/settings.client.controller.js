'use strict';

angular.module('users').controller('SettingsController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    $scope.user = Authentication.user;
    $scope.tabs = [
      {
        id: 'user',
        title: 'User settings',
        items: [
          {

          }
        ]
      }
    ]
  }
]);
