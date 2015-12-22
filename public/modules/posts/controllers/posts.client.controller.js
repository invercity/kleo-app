'use strict';

angular.module('posts').controller('PostsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Posts', 'Dictionaries',
	function($scope, $stateParams, $location, Authentication, Posts, Dictionaries) {
		$scope.authentication = Authentication;

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
			var post;
			if ($scope.post._id) {
				post = $scope.post;
				post.$update(function() {
					$location.path('posts/' + post._id);
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			}
			else {
				post = new Posts({
					title: this.post.title,
					content: this.post.content,
					postType: this.post.postType,
					displayName: this.post.displayName
				});

				post.$save(function(response) {
					$location.path('posts/' + response._id);

					$scope.title = '';
					$scope.content = '';
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			}
		};

		$scope.find = function() {
			$scope.posts = Posts.query();
		};

		$scope.findOne = function() {
			$scope.post = Posts.get({
				postId: $stateParams.postId
			});
		};

		$scope.getDictionary = function() {
			$scope.types = Dictionaries.get({
				dictId: 'POST_TYPE'
			});
		};

		$scope.initUpdateForm = function() {
			$scope.types = Dictionaries.get({
				dictId: 'POST_TYPE'
			});
			if($stateParams.postId) {
				$scope.post = Posts.get({
					postId: $stateParams.postId
				});
				$scope.updateValue = 'Update';
			}
			else {
				$scope.updateValue = 'Create';
				$scope.post = {
					displayName: true
				}
			}
		};

		$scope.onCancel = function() {
			$location.path('/posts');
		}

	}
]);