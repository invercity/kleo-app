'use strict';

// Articles controller
angular.module('posts')
  .controller('PostsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Posts', 'Dictionaries',
    function ($scope, $stateParams, $location, Authentication, Posts, Dictionaries) {

    // hack for upload image
    $scope.$on('imageURLChanged', function(ev, url) {
      $scope.post.previewImg = url;
    });

    $scope.authentication = Authentication;

    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');
        return false;
      }

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
          showGlobal: this.post.showGlobal,
          preview: this.post.preview,
          content: this.post.content,
          postType: this.post.postType,
          previewImg: this.post.previewImg
          // draft: this.post.draft,
          // showMain: this.post.showMain
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
    // Remove existing Post
    $scope.remove = function (post) {
      if (post) {
        post.$remove();

        for (var i in $scope.posts) {
          if ($scope.posts[i] === post) {
            $scope.posts.splice(i, 1);
          }
        }
      } else {
        $scope.post.$remove(function () {
          $location.path('posts');
        });
      }
    };

    // Find a list of Posts
    $scope.find = function () {
      $scope.posts = Posts.query();
    };

    // Find existing Post
    $scope.findOne = function () {
      $scope.post = Posts.get({
        postId: $stateParams.postId
      });
      $scope.options = [
        {
          title: 'Edit',
          icon: 'edit',
          sref: 'posts.edit({postId: "' + $stateParams.postId + '"})'
        },
        {
          title: 'Remove',
          icon: 'trash',
          click: $scope.remove
        }
      ];
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
      if ($stateParams.postId) {
        $scope.updateValue = 'Update';
        Posts.get({
          postId: $stateParams.postId
        }, function(post) {
          $scope.post = post;
          // reject user with no rights for edit
          if (!$scope.authentication.isAdmin() && !$scope.authentication.hasAccess($scope.post.user._id)) {
            $location.path('forbidden');
          }
        });
      }
      else {
        $scope.updateValue = 'Create';
        $scope.post = {};
      }
    };

    $scope.onCancel = function() {
      $location.path('/posts');
    };
  }])
  .controller('UserFeedController', ['$scope', '$stateParams', 'Feed', function($scope, $stateParams, Feed) {
    var userId = $stateParams.userId;
    Feed.getData(userId)
      .then(function(posts) {
        $scope.posts = posts;
      });
  }]);