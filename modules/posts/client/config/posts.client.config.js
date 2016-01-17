'use strict';

// Configuring the Posts module
angular.module('posts').run(['Menus', 'AdminService', 'Posts',
  function (Menus, Admin, Posts) {
    // Add the posts dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Posts',
      state: 'posts',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'posts', {
      title: 'List Posts',
      state: 'posts.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'posts', {
      title: 'Create Posts',
      state: 'posts.create',
      roles: ['user']
    });

    Admin.addModel({
      id: 'posts',
      title: 'Posts',
      model: Posts,
      options: {
        title: 'title',
        subtitle: 'postType',
        other: 'created',
        route: 'posts.view',
        modelId: 'postId'
      }
    });
  }
]);