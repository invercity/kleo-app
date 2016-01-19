'use strict';

angular.module('core').config(function(NotificationProvider) {
  NotificationProvider.setOptions({
    delay: 100000,
    startTop: 20,
    startRight: 10,
    verticalSpacing: 20,
    horizontalSpacing: 20,
    positionX: 'right',
    positionY: 'bottom'
  });
});

angular.module('core').service('NotificationService', ['$q', 'Notification',
  function($q, NotificationAngular) {
    var disabled = false,
      promise, hidden;
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
      hidden = "hidden";
    } else if (typeof document.mozHidden !== "undefined") {
      hidden = "mozHidden";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
    }

    var showNotify = function(data) {
      // show global message
      if (document.hidden) {
        return new Notification(data.title, {
          body: data.content,
          icon: data.icon
        });
      }
      // show local only
      else {
        return new Notification(data.title, {
          body: data.content,
          icon: data.icon
        });
      }
    };

    return {
      init: function() {
        if (!("Notification" in window)) {
          disabled = true;
        }
        else {
          if (Notification.permission === 'granted') return;
          else {
            var deferred = $q.defer();
            Notification.requestPermission(function (permission) {
              if (permission !== 'granted') disabled = true;
              deferred.resolve(!disabled);
            });
            promise = deferred.promise;
          }
        }
      },
      showNotification: function(data) {
        if (promise) {
          promise.then(function(granted) {
            if (granted) showNotify(data);
          });
        }
        else if (!disabled) {
          showNotify(data);
        }
      }
    };
  }
]);
