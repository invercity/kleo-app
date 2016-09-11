'use strict';

// Configuring the Posts module
angular.module('posts').run(['Menus', 'AdminService', 'Posts',
  function (Menus) {
    // Add the pages dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Pages',
      state: 'pages.create',
      roles: ['*']
    });
  }
]);