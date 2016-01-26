'use strict';

angular.module('core.admin').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Admin',
      state: 'admin.main',
      roles: ['admin'],
      position: 5
    });
    Menus.addMenuItem('topbar', {
      title: 'Page',
      state: 'page',
      roles: ['*'],
      position: 4
    });
  }
]);