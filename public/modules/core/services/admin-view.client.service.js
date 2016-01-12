'use strict';
/**
 * Factory for handling model configuration for Admin Module
 */
angular.module('core').factory('AdminView', [function() {

		var adminPages = [];

		// Public API
		return {
			addAdminPage: function(configuration) {
				adminPages.push(configuration);
			},
			getAdminPages: function() {
				return adminPages;
			}
		};
	}
]);