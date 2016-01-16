'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: 'modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Users', function ($stateParams, Users) {
            return Users.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: 'modules/users/client/views/admin/edit-user.client.view.html',
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
