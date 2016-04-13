'use strict';

// Setting up route
angular.module('core.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'modules/core/client/views/admin/admin.client.view.html',
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
        templateUrl: 'modules/core/client/views/admin/admin-models.client.view.html',
        url: '/:itemId',
        controller: 'AdminModelsController'
      })
      .state('admin.config', {
        template: '<ui-view/>',
        url: '/config'
      })
      .state('admin.config.nav', {
        templateUrl: 'modules/core/client/views/admin/admin-config-nav.client.view.html',
        url: '/nav',
        controller: 'AdminConfigController'
      })
    ;
  }
]);
