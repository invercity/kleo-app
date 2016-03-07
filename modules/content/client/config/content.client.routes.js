'use strict';

angular.module('content').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
     .state('users.files', {
       url: '/users/:id/files',
       template: ''
     });
  }
]);