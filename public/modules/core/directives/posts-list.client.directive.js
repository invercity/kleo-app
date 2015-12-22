'use strict';

angular.module('core').directive('postsList', [
	function() {
		return {
			templateUrl: 'modules/core/views/templates/posts-list.client.html',
			restrict: 'E',
			scope: {
				items: '=',
				filter: '=',
				disabledAuthor: '='
			},
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);