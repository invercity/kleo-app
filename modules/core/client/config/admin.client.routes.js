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
        url: '/',
        templateUrl: 'modules/core/client/views/admin/admin.client.view.html',
        controller: 'AdminController'
      });
  }
]);
