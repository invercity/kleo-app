'use strict';

// Configuring the Core module
angular.module('core').run(['Menus',
  function(Menus) {
    // Set top bar menu items
    Menus.addMenuItemPosition('topbar', 'Study', 'study', 'dropdown', 1);
    Menus.addSubMenuItem('topbar', 'study', 'Departments', 'departments');
  }
]);