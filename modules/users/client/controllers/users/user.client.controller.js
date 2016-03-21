'use strict';

angular.module('users.admin')
  .controller('UserController', ['$scope', '$state', 'Authentication', 'userResolve',
  function ($scope, $state, Authentication, userResolve) {
    $scope.authentication = Authentication;
    $scope.user = userResolve;

    $scope.remove = function (user) {
      if (confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          $scope.users.splice($scope.users.indexOf(user), 1);
        } else {
          $scope.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = $scope.user;

      user.$update(function () {
        $state.go('users.view', {
          userId: user._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }])
  .controller('UserViewController', ['$scope', '$state', 'userResolve', 'Authentication', 
    function($scope, $state, userResolve, Authentication) {
    userResolve.$promise.then(function(user) {
      $scope.user = user;

      // later will be replaced with configuration instance
      $scope.profileTabs = [
        {
          title: 'Overview',
          sref: 'users.view({userId: user._id})',
          icon: 'home',
          show: true
        },
        {
          title: 'Feed',
          sref: 'users.feed({userId: user._id})',
          icon: 'bullhorn',
          show: true
        },
        {
          title: 'Files',
          sref: 'users.files({userId: user._id})',
          icon: 'folder-open',
          show: true
        },
        {
          title: 'Administration',
          sref: 'users.edit({userId: user._id})',
          icon: 'lock',
          show: $scope.authentication.isAdmin()
        }
      ];
    });

    $scope.authentication = Authentication;
  }]);
