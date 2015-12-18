'use strict';

// Configuring the Core module
angular.module('core').run(['Menus',
  function(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Study', 'study', 'dropdown');
    Menus.addSubMenuItem('topbar', 'study', 'Departments', 'departments');
  }
]);