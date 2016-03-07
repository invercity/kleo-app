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
          userResolve.$promise.then(function(user) {
            $scope.user = user;

            // later will be replaced with configuration instance
            $scope.profileTabs = [
              {
                title: 'Overview',
                sref: 'users.view({userId: user._id})',
                icon: 'home',
                show: true
              },
              {
                title: 'Profile Settings',
                sref: 'settings.profile',
                icon: 'user',
                show: $scope.authentication.hasAccess(userResolve._id)
              },
              {
                title: 'Files',
                sref: 'users.files({userId: user._id})',
                icon: 'folder-open',
                show: true
              },
              {
                title: 'Administration',
                sref: 'users.edit({userId: user._id})',
                icon: 'lock',
                show: $scope.authentication.isAdmin()
              }
            ];
          });

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
