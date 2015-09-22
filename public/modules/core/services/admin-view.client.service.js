'use strict';

angular.module('core').factory('AdminView', [
	function() {

		var adminPages = [];

		// Public API
		return {
			addAdminPage: function(id, template) {
				adminPages.push({
					id: id,
					template: template
				});
			},
			getAdminPages: function() {
				return adminPages;
			}
		};
	}
]);