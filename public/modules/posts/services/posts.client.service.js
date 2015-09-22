'use strict';

//Posts service used for communicating with the posts REST endpoints
angular.module('posts').factory('Posts', ['$resource',
	function($resource) {
		return $resource('posts/:postId', {
			postId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);