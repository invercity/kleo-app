'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.postTypes = [
			{
				key: 'News',
				title: 'News'
			},
			{
				key: 'Article',
				title: 'Articles'
			},
			{
				key: 'Popular',
				title: 'Popular tags'
			}
		];

		$scope.setSelected = function(item) {
			if ($scope.selectedPostType) $scope.selectedPostType.active = false;
			item.active = true;
			$scope.selectedPostType = item;
		};

		$scope.setSelected($scope.postTypes[0]);
	}
]);