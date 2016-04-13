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
      .state('admin.main.models', {
        template: '<ui-view/>',
        url: '/'
      })
      .state('admin.main.models.item', {
        templateUrl: 'modules/core/client/views/admin/admin-models.client.view.html',
        url: '/:itemId',
        controller: 'AdminController'
      });
  }
]);
