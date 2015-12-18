'use strict';

angular.module('core').factory('AdminView', [
	function() {

		var adminPages = [];

		// Public API
		return {
			addAdminPage: function(id, model, title) {
				adminPages.push({
					title: title,
					id: id,
					model: model
				});
			},
			getAdminPages: function() {
				return adminPages;
			}
		};
	}
]);