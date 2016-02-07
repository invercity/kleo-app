'use strict';

//News service used for communicating with the news REST endpoints
angular.module('posts').factory('News', ['$resource',
  function ($resource) {
    return $resource('api/news');
  }
]);