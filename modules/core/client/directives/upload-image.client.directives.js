'use strict';

angular.module('core').directive('uploadImage', ['$window', '$timeout', 'FileUploader',
  function($window, $timeout, FileUploader) {
    return {
      templateUrl: 'modules/core/client/views/templates/upload-image.client.html',
      restrict: 'E',
      scope: {
        textCenter: '=',
        image: '=',
        imageAlt: '=',
        imageTitle: '=',
        category: '=',
        onSuccess: '='
      },
      link: function(scope, element, attrs) {

        scope.$watch('image',function(){
          if (scope.image) scope.imageUrl = scope.image;
        });

        // Create file uploader instance
        scope.uploader = new FileUploader({
          url: 'api/files'
        });

        // Set file uploader image filter
        scope.uploader.filters.push({
          name: 'imageFilter',
          fn: function (item, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        });

        scope.uploader.onBeforeUploadItem = function(item) {
          item.formData.push({category: scope.category});
        };

        // Called after the user selected a new picture file
        scope.uploader.onAfterAddingFile = function (fileItem) {
          if ($window.FileReader) {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(fileItem._file);
            fileReader.onload = function (fileReaderEvent) {
              $timeout(function () {
                scope.imageUrl = fileReaderEvent.target.result;
              }, 0);
            };
          }
        };

        // Called after the user has failed to uploaded a new picture
        scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
          scope.cancelUpload();
          scope.error = response.message;
        };

        // Change user profile picture
        scope.uploadProfilePicture = function (ev) {
          ev.preventDefault();
          scope.success = scope.error = null;
          scope.uploader.uploadAll();
        };

        // Cancel the upload process
        scope.cancelUpload = function () {
          scope.uploader.clearQueue();
          scope.imageUrl = scope.image;
        };

        // Called after the user has successfully uploaded a new picture
        scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
          scope.success = true;
          scope.image = response.location;
          if (scope.onSuccess) scope.onSuccess(scope.image);
          scope.$emit('imageURLChanged', scope.image);
        };
      }
    };
  }
]);