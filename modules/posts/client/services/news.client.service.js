'use strict';

//News service used for communicating with the news REST endpoints
angular.module('posts').factory('News', ['$http', '$q',
  function ($http, $q) {
    return {
      getData: function(type, limit) {
        var deferred = $q.defer();
        var urlParams = {};
        if (type) {
          urlParams.type = type;
        }
        if (limit) {
          urlParams.limit = limit;
        }
        $http.get('/api/news', {
          params: urlParams
        })
          .success(function(data) {
            deferred.resolve(data);
          });
        return deferred.promise;
      }
    };
  }
]);