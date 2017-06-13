'use strict';

// Configuring the Page module
angular.module('page').run(['Menus', 'AdminService',
  function (Menus) {
    // Add the pages dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Pages',
      state: 'page.create',
      roles: ['*']
    });
  }
]);