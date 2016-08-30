'use strict';

angular.module('core').directive('postsList', [
	function() {
		return {
			templateUrl: 'modules/core/client/views/templates/posts-list.client.html',
			restrict: 'E',
			scope: {
				items: '=',
				filter: '=',
				disabledAuthor: '='
			}
		};
	}
]);