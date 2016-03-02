'use strict';

angular.module('users').controller('ChangeProfilePictureController', ['$scope', '$http', '$timeout', '$window', 'Authentication', 'FileUploader',
  function ($scope, $http, $timeout, $window, Authentication, FileUploader) {
    $scope.user = Authentication.user;
    $scope.imageUrl = $scope.user.profileImageURL;

    $scope.onFinishUpload = function(url) {
      $http.post('/api/users/picture', {filename: url})
        .success(function(data) {
          // Populate user object
          $scope.user = Authentication.user = data;
        });
    };
  }
]);
