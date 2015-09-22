'use strict';

// Configuring the Posts module
angular.module('posts').run(['Menus', 'AdminView',
	function(Menus, AdminView) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Posts', 'posts', 'dropdown', '/posts(/create)?');
		Menus.addSubMenuItem('topbar', 'posts', 'List Posts', 'posts');
		Menus.addSubMenuItem('topbar', 'posts', 'New Post', 'posts/create');
		AdminView.addAdminPage('post', 'posts/views/admin.client.view.html');
	}
]);