'use strict';

angular.module('posts').directive('postsList', [
	function() {
		return {
			templateUrl: 'modules/posts/views/templates/posts-list.client.html',
			restrict: 'E',
			scope: {
				items: '=',
				filter: '='
			},
			link: function postLink(scope, element, attrs) {
				console.log(scope.filter)
			}
		};
	}
]);