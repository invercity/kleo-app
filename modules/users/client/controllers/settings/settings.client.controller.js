'use strict';

angular.module('users').controller('SettingsController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    $scope.user = Authentication.user;
    $scope.tabs = [{
      id: 'profile',
      state: 'settings.profile',
      title: 'Edit Profile',
      items: []
    }, {
      id: 'picture',
      state: 'settings.picture',
      title: 'Change Profile Picture',
      items: []
    },{
      id: 'password',
      state: 'settings.password',
      title: 'Change Password',
      items: []
    }];
  }
]);
