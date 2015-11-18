'use strict';

angular.module('core').controller('AdminController', ['$scope', 'AdminView',
	function($scope, AdminView) {
		$scope.pages = AdminView.getAdminPages();

		$scope.selectedPage = $scope.pages.length ? $scope.pages[0] : null;

		$scope.changeSelected = function(page) {
			$scope.selectedPage = page;
		};

		$scope.items = $scope.selectedPage ? $scope.selectedPage.model.query() : [];
		console.log($scope.items)
	}
]);