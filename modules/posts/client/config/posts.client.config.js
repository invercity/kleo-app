'use strict';

// Configuring the Posts module
angular.module('posts').run(['Menus',
  function (Menus) {
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
  }
]);