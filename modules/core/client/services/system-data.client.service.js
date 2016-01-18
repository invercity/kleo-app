'use strict';

angular.module('core').service('SystemData', ['$http', '$q',
  function($http, $q) {
    return {
      getData: function() {
        var deferred = $q.defer();
        $http.get('/api')
          .success(function(data) {
            deferred.resolve(data);
          });
        return deferred.promise;
      }
    };
  }
]);