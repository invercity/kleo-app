'use strict';

// Setting up route
angular.module('admin').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'modules/admin/client/views/admin.client.view.html',
        resolve: {
          tabs: ['AdminService', function(AdminService) {
            return AdminService.getAdminPages();
          }]
        },
        controller: 'AdminController',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.models', {
        template: '<ui-view/>',
        url: '/models'
      })
      .state('admin.models.item', {
        templateUrl: 'modules/admin/client/views/admin-models.client.view.html',
        url: '/:itemId',
        controller: 'AdminModelsController'
      })
      .state('admin.config', {
        template: '<ui-view/>',
        url: '/config'
      })
      .state('admin.config.nav', {
        templateUrl: 'modules/admin/client/views/admin-config-nav.client.view.html',
        url: '/nav',
        controller: 'AdminConfigController'
      })
    ;
  }
]);
