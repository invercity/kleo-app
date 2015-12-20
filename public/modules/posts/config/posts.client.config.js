'use strict';

// Configuring the Posts module
angular.module('posts').run(['Menus', 'AdminView', 'Posts',
	function(Menus, AdminView, Posts) {
		// Set top bar menu items

		Menus.addMenuItem('topbar', 'Posts', 'posts'); /*, 'dropdown', '/posts(/create)?');
		Menus.addSubMenuItem('topbar', 'posts', 'List Posts', 'posts');
		Menus.addSubMenuItem('topbar', 'posts', 'New Post', 'posts/create'); */

		/*
		Menus.addMenuItem('topbar', 'Posts', 'posts', '/posts');
		*/
		AdminView.addAdminPage('posts', Posts, 'Posts');
	}
]);