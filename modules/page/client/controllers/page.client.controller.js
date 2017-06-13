'use strict';

// Page controller
angular.module('page')
  .controller('PageController', ['$scope', '$stateParams', '$location', 'Authentication', 'Dictionaries', 'PageService',
    function ($scope, $stateParams, $location, Authentication, Dictionaries, Page) {

      $scope.authentication = Authentication;

      if ($stateParams.pageId) {
        $scope.page = Page.get({
          pageId: $stateParams.pageId
        });
        /*$scope.options = [
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
        ];*/
      }
      else {
        $scope.page = new Page();
      }

      $scope.update = function() {
        $scope.error = null;

        if ($scope.page._id) {
          $scope.page.$update(function() {
            $location.path('page/' + $scope.page._id);
          }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
          });
        }
        else {

          $scope.page.$save(function(response) {
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

      };

      $scope.getDictionary = function() {
        $scope.types = Dictionaries.get({
          dictId: 'POST_TYPE'
        });
      };

      $scope.initUpdateForm = function() {
        if ($stateParams.postId) {
          $scope.updateValue = 'Update';
          Posts.get({
            postId: $stateParams.postId
          }, function(post) {
            $scope.post = post;
            $scope.tags=post.tags;
            // reject user with no rights for edit
            if (!$scope.authentication.isAdmin() && !$scope.authentication.hasAccess($scope.post.user._id)) {
              $location.path('forbidden');
            }
          });
        }
        else {
          $scope.updateValue = 'Create';
          $scope.post = {};
          $scope.tags = [];
        }
      };

      $scope.onCancel = function() {
        $location.path('/posts');
      };
    }]);