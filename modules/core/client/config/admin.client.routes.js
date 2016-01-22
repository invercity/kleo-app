'use strict';

// Setting up route
angular.module('core.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.main', {
        url: '',
        templateUrl: 'modules/core/client/views/admin/admin.client.view.html',
        resolve: {
          tabs: ['AdminService', function(AdminService) {
            return AdminService.getAdminPages();
          }]
        },
        controller: function($scope, $stateParams, tabs) {
          $scope.tabs = tabs;
          $scope.module = $stateParams.moduleId ? ': ' + $stateParams.moduleId : null;
          $scope.item = $stateParams.itemId ? ': ' + $stateParams.itemid : null;
        }
      })
      .state('admin.main.mode', {
        template: '<ui-view/>',
        url: '/:moduleId'
      })
      .state('admin.main.mode.item', {
        templateUrl: 'modules/core/client/views/admin/admin-module.client.view.html',
        url: '/:itemId',
        controller: 'AdminController'
      });
  }
]);
