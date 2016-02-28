'use strict';

angular.module('core').directive('uploadImage', [
  function() {
    return {
      templateUrl: 'modules/core/client/views/templates/upload-image.client.html',
      restrict: 'E',
      scope: {
        file: '='
      },
      link: function(scope, element, attrs) {

      }
    };
  }
]);