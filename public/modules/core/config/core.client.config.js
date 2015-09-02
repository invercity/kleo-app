'use strict';

// Configuring the Articles module
angular.module('core').run(['Menus',
  function(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Development', 'dev');
    //Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
    //Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
  }
]);