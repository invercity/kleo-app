'use strict';

angular.module('content').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
     .state('users.files', {
       url: '/files',
            templateUrl: 'modules/users/client/views/users/view-user-files.client.view.html'
     });
  }
]);