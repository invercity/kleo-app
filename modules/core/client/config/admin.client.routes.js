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
        controller: 'AdminMainController'
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
