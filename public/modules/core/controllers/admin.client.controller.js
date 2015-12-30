'use strict';

angular.module('core').controller('AdminController', ['$scope', '$location', 'AdminView',
	function($scope, $location, AdminView) {
		$scope.pages = AdminView.getAdminPages();

		$scope.selectedPage = $scope.pages.length ? $scope.pages[0] : null;

		$scope.changeSelected = function(page) {
			$scope.selectedPage = page;
			$scope.items = page.model.query();
		};

		$scope.items = $scope.selectedPage ? $scope.selectedPage.model.query() : [];

		$scope.edit = function(item) {
			var url = _.template('/<%= route %>s/<%= id %>/edit');
			$location.path(url({'route': 'post', 'id': item._id}));
		};

		$scope.remove = function(item) {
			var id = item._id;
			item.$remove();
			$scope.items = _.reject($scope.items, function(p) {
				return p._id == id;
			});
		}
	}
]);