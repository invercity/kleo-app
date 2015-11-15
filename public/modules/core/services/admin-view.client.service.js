'use strict';

angular.module('core').factory('AdminView', [
	function() {

		var adminPages = [];

		// Public API
		return {
			addAdminPage: function(id, model) {
				adminPages.push({
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