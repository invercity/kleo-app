'use strict';

angular.module('posts').controller('PostsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Posts',
	function($scope, $stateParams, $location, Authentication, Posts) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var post = new Posts({
				title: this.title,
				content: this.content
			});
			post.$save(function(response) {
				$location.path('posts/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(post) {
			if (post) {
				post.$remove();

				for (var i in $scope.posts) {
					if ($scope.posts[i] === post) {
						$scope.posts.splice(i, 1);
					}
				}
			} else {
				$scope.post.$remove(function() {
					$location.path('posts');
				});
			}
		};

		$scope.update = function() {
			var post = $scope.post;

			post.$update(function() {
				$location.path('posts/' + post._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.posts = Posts.query();
		};

		$scope.findOne = function() {
			$scope.post = Posts.get({
				postId: $stateParams.postId
			});
		};
	}
]);