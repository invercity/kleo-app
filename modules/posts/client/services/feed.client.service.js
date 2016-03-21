'use strict';

// Feed service
angular.module('posts').factory('Feed', ['$http', '$q',
  function ($http, $q) {
    return {
      getData: function(user, type) {
        var deferred = $q.defer();
        var urlParams = {};
        if (type) {
          urlParams.type = type;
        }
        $http.get('/api/users/' + user + '/feed', {
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