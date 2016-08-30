'use strict';

//Content service used for communicating with the posts REST endpoints
angular.module('content')
  .factory('Content', ['$resource', function($resource) {
      return $resource('api/files/:fileId', {
        fileId: '@_id'
      });
    }
  ])
  .factory('UserFiles', ['$resource', function($resource) {
      return $resource('api/users/:userId/files/:fileId', {
        fileId: '@_id'
      });
    }
  ]);