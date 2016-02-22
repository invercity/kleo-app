'use strict';

// Configuring the Posts module
angular.module('posts').run(['Menus', 'AdminService', 'Posts',
  function (Menus, Admin, Posts) {
    // Add the posts dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Posts',
      state: 'posts.list',
      roles: ['*']
    });

    Admin.addModel({
      id: 'posts',
      title: 'Posts',
      model: Posts,
      options: {
        name: {
          title: 'Title',
          value: 'title'
        },
        fields: [
          {
            title: 'Type',
            value: 'postType'
          },
          {
            title: 'Creation Date',
            value: 'created'
          }
        ],
        route: 'posts.view',
        modelId: 'postId'
      }
    });
  }
]);