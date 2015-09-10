'use strict';

angular.module('articles').directive('articleList', [
	function() {
		return {
			templateUrl: 'modules/articles/views/templates/article-list.client.html',
			restrict: 'E',
			scope: {
				items: '='
			},
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);