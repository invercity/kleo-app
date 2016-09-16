'use strict';

//Pages service used for communicating with the pages REST endpoints
angular.module('pages').factory('Pages', ['$resource',
  function ($resource) {
    return $resource('api/pages/:pageId', {
      pageId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
