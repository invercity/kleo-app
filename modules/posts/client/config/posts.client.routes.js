'use strict';

// Setting up route
angular.module('posts').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('posts', {
        abstract: true,
        url: '/posts',
        template: '<ui-view/>'
      })
      .state('posts.list', {
        url: '',
        templateUrl: 'modules/posts/client/views/list-posts.client.view.html'
      })
      .state('posts.create', {
        url: '/create',
        templateUrl: 'modules/posts/client/views/edit-post.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('posts.view', {
        url: '/:postId',
        templateUrl: 'modules/posts/client/views/view-post.client.view.html'
      })
      .state('posts.edit', {
        url: '/:postId/edit',
        templateUrl: 'modules/posts/client/views/edit-post.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);