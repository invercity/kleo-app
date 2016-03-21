'use strict';

angular.module('content').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
     .state('users.files', {
       url: '/files',
       template: ''
     });
  }
]);