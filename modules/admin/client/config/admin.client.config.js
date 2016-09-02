'use strict';

angular.module('admin').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Admin',
      state: 'admin',
      roles: ['admin'],
      position: 5
    });

    /* temporary - later will be replaced with module server configuration */
    Menus.addMenuItem('topbar', {
      title: 'Page',
      state: 'page',
      roles: ['*'],
      position: 4
    });
  }
]);