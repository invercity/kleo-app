'use strict';

angular.module('content').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
     .state('users.files', {
       url: '/files',
       templateUrl: 'modules/content/client/views/user-files.client.view.html',
       controller: 'UserFilesController'
     });
  }
]);