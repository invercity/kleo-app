'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus', 'AdminView',
	function(Menus, AdminView) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
		AdminView.addAdminPage('post', 'articles/views/admin.client.view.html')
	}
]);