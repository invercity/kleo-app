'use strict';

angular.module('core').controller('AdminController', ['$scope', 'AdminView',
	function($scope, AdminView) {
		$scope.pages = AdminView.getAdminPages();
	}
]);