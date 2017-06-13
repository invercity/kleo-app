'use strict';

// Setting up route
angular.module('page').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('page', {
        abstract: true,
        url: '/page',
        template: '<ui-view/>'
      })
      /*.state('pages.list', {
        url: '',
        template: ''
      }) */
      .state('page.create', {
        url: '/create',
        controller: 'PageController',
        templateUrl: 'modules/page/client/views/edit-page.client.view.html',
        data: {
          roles: ['admin']
        }
      })
      .state('page.view', {
        url: '/:pageId',
        templateUrl: 'modules/page/client/views/view-page.client.view.html'
      })
      .state('page.edit', {
        url: '/:pageId/edit',
        templateUrl: 'modules/page/client/views/edit-page.client.view.html',
        data: {
          roles: ['admin']
        }
      });
  }
]);