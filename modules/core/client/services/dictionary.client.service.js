'use strict';

//Dictionary service used for communicating with the posts REST endpoints
angular.module('core').factory('Dictionaries', ['$resource',
  function($resource) {
    return $resource('api/dictionary/:dictId', {
      dictId: '@_id'
    });
  }
]);
