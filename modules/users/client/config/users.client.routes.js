'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('users.list', {
        url: '/users',
        template: ''
      })
      .state('users', {
        url: '/users/:userId',
        abstract: true,
        templateUrl: 'modules/users/client/views/users/view-user.client.view.html',
        controller: function($scope, $state, userResolve, Authentication) {
          $scope.user = userResolve;
          $scope.authentication = Authentication;
        },
        resolve: {
          userResolve: ['$stateParams', 'Users', function ($stateParams, Users) {
            return Users.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('users.view', {
        url: '',
        templateUrl: 'modules/users/client/views/users/view-user-info.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Users', function ($stateParams, Users) {
            return Users.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('users.edit', {
        url: '/edit',
        templateUrl: 'modules/users/client/views/users/edit-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Users', function ($stateParams, Users) {
            return Users.get({
              userId: $stateParams.userId
            });
          }]
        }
      });
  }
]);
