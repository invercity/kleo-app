'use strict';

angular.module('users')
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
    }])

    .controller('UserDocController', ['$scope', 'Authentication', '$http',
        function ($scope, Authentication, $http) {
            $scope.authentication = Authentication;

            $scope.docTypes = [
                {
                    key: 'Avatars',
                    title: 'Avatars'
                },
                {
                    key: 'Posts',
                    title: 'Posts'
                },
                {
                    key: 'Documents',
                    title: 'Documents'
                },
                {
                    key: 'All',
                    title: 'All'
                }
            ];

            $scope.setSelected = function (item) {
                if ($scope.selectedDocType) $scope.selectedDocType.active = false;
                item.active = true;
                $scope.selectedDocType = item;
            };

            $scope.setSelected($scope.docTypes[0]);

            //$http({method: 'GET', url: 'api/users/:id/files', params: {id: $scope.user._id}}).then(function(response){
            //    $scope.docs1 = response.data;
            //});

            //list of files example
            $scope.docs = [
                {name: 'Doc1', size: '125k'}, {name: 'Doc2', size: '23k'}
            ];

        }]);
