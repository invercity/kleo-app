'use strict';

angular.module('content')
  .controller('UserFilesController', ['$scope', '$state', 'Authentication', 'UserFiles',
    function ($scope, $state, Authentication, UserFiles) {
    $scope.isCurrent = $state.params.userId === Authentication.user._id;
      var fileList = UserFiles.query({
        userId: Authentication.user._id
      }, function() {
        $scope.fileList = fileList;
      });
    }]);

