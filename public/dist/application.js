'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
  // Init module configuration options
  var applicationModuleName = 'kleo';
  var applicationModuleVendorDependencies = [
    'ngResource',
    'ngAnimate',
    'ngMessages',
    'ui.router',
    'ui.bootstrap',
    'ui.utils',
    'angularFileUpload',
    'ui-notification',
    'mgcrea.ngStrap.affix',
    'mgcrea.ngStrap.button',
    'textAngular'
  ];

  // Add a new vertical module
  var registerModule = function (moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', '$httpProvider',
  function ($locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $httpProvider.interceptors.push('authInterceptor');
  }
]);

angular.module(ApplicationConfiguration.applicationModuleName).run(["$rootScope", "$state", "Authentication", function ($rootScope, $state, Authentication) {

  // Check authentication before changing state
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
      var allowed = false;
      toState.data.roles.forEach(function (role) {
        if (Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(role) !== -1) {
          allowed = true;
          return true;
        }
      });

      if (!allowed) {
        event.preventDefault();
        if (Authentication.user !== undefined && typeof Authentication.user === 'object') {
          $state.go('forbidden');
        } else {
          $state.go('authentication.signin');
        }
      }
    }
  });

  // Record previous state
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    if (!fromState.data || !fromState.data.ignoreState) {
      $state.previous = {
        state: fromState,
        params: fromParams,
        href: $state.href(fromState, fromParams)
      };
    }
  });
}]);

//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash && window.location.hash === '#_=_') {
    if (window.history && history.pushState) {
      window.history.pushState('', document.title, window.location.pathname);
    } else {
      // Prevent scrolling by storing the page's current scroll offset
      var scroll = {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
      };
      window.location.hash = '';
      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scroll.top;
      document.body.scrollLeft = scroll.left;
    }
  }

  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('content');

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('core');
ApplicationConfiguration.registerModule('core.admin', ['core']);
ApplicationConfiguration.registerModule('core.admin.routes', ['ui.router']);

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('posts');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users', ['core']);
ApplicationConfiguration.registerModule('users.admin', ['core.admin']);
ApplicationConfiguration.registerModule('users.admin.routes', ['core.admin.routes']);

'use strict';

// Configuring the Content module
angular.module('content').run(['Menus', 'AdminService', 'Content',
  function (Menus, Admin, Content) {

    Admin.addModel({
      id: 'content',
      title: 'Content',
      model: Content,
      options: {
        name: {
          title: 'File ID',
          value: 'fileId'
        },
        fields: [
          {
            title: 'User',
            value: ['user', 'displayName']
          },
          {
            title: 'Created',
            value: 'created'
          }
        ],
        route: 'content.view',
        modelId: 'contentId'
      }
    });
  }
]);
'use strict';

angular.module('content').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
     .state('users.files', {
       url: '/users/:id/files',
       template: ''
     });
  }
]);
'use strict';

//Content service used for communicating with the posts REST endpoints
angular.module('content').factory('Content', ['$resource',
  function($resource) {
    return $resource('api/files/:fileId', {
      fileId: '@_id'
    });
  }
]);
'use strict';

angular.module('core.admin').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Admin',
      state: 'admin.main',
      roles: ['admin'],
      position: 5
    });
    Menus.addMenuItem('topbar', {
      title: 'Page',
      state: 'page',
      roles: ['*'],
      position: 4
    });
  }
]);
'use strict';

// Setting up route
angular.module('core.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.main', {
        url: '',
        templateUrl: 'modules/core/client/views/admin/admin.client.view.html',
        resolve: {
          tabs: ['AdminService', function(AdminService) {
            return AdminService.getAdminPages();
          }]
        },
        controller: ["$scope", "$stateParams", "tabs", function($scope, $stateParams, tabs) {
          $scope.tabs = tabs;
          $scope.module = $stateParams.moduleId ? ': ' + $stateParams.moduleId : null;
          $scope.item = $stateParams.itemId ? ': ' + $stateParams.itemid : null;
        }]
      })
      .state('admin.main.mode', {
        template: '<ui-view/>',
        url: '/:moduleId'
      })
      .state('admin.main.mode.item', {
        templateUrl: 'modules/core/client/views/admin/admin-module.client.view.html',
        url: '/:itemId',
        controller: 'AdminController'
      });
  }
]);

'use strict';

// Setting up route
angular.module('core')
  .config(['$affixProvider', function ($affixProvider) {
    angular.extend($affixProvider.defaults, {
      inlineStyles: false
    });
  }])

  .config(['$provide', function($provide){
    // this demonstrates how to register a new tool and add it to the default toolbar
    $provide.decorator('taOptions', ['$delegate', 'taRegisterTool', '$modal', function(taOptions, taRegisterTool, $modal){
      // $delegate is the taOptions we are decorating
      // here we override the default toolbars and classes specified in taOptions.
      taOptions.forceTextAngularSanitize = false; // set false to allow the textAngular-sanitize provider to be replaced
      taOptions.keyMappings = []; // allow customizable keyMappings for specialized key boards or languages
      taOptions.toolbar = [
        ['h2', 'h3', 'h4', 'h5', 'p', 'pre', 'quote'],
        ['ul', 'ol', 'redo', 'undo', 'clear'],
        ['justifyLeft','justifyCenter','justifyRight', 'justifyFull'],
        ['html', 'uploadImage', 'insertLink']
      ];
      taOptions.classes = {
        focussed: 'focussed',
        toolbar: 'btn-toolbar',
        toolbarGroup: 'btn-group',
        toolbarButton: 'btn btn-default',
        toolbarButtonActive: 'active',
        disabled: 'disabled',
        textEditor: 'form-control',
        htmlEditor: 'form-control'
      };
      taRegisterTool('uploadImage', {
        buttontext: 'Upload Image',
        iconclass: "fa fa-image",
        action: function (deferred,restoreSelection) {
          $modal.open({
            controller: 'InsertImageController',
            templateUrl: 'modules/core/client/views/templates/insert-image.client.html'
          }).result.then(
            function (result) {
              restoreSelection();
              document.execCommand('insertImage', true, result);
              deferred.resolve();
            },
            function () {
              deferred.resolve();
            }
          );
          return false;
        }
      });

      return taOptions; // whatever you return will be the taOptions
    }]);
  }]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('dev', {
      url: '/dev',
      templateUrl: 'modules/core/client/views/dev.client.view.html'
    })
    .state('page', {
      url: '/page',
      templateUrl: 'modules/core/client/views/page.client.view.html'
    });
  }
]);
'use strict';

angular.module('core.admin').controller('AdminController', ['$scope', '$stateParams',
  function ($scope, $stateParams) {
    $scope.itemId = $stateParams.itemId;
  }
]);
'use strict';

angular.module('core').controller('DevController', ['$scope',
  function($scope) {
    // Controller Logic
    // ...
  }
]);
'use strict';

angular.module('core').controller('FooterController', ['$scope', 'SystemData', function($scope, SystemData) {
  SystemData.getData().then(function(data) {
    $scope.app = data;

    // temporary data
    $scope.links = _.map(_.range(0, 4), function(el) {
      return _.map(_.range(0, 4), function(row) {
        var num = el * 4 + row + 1;
        if (num < 10) num = '0' + num;
        return 'Map Site Link #' + num;
      });
    });
  });
}]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$http', '$state', 'Authentication', 'SystemData', 'Menus', 'NotificationService',
  function ($scope, $http, $state, Authentication, SystemData, Menus, NotificationService) {
    NotificationService.init();

    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });

    $scope.getLocations = function(val) {
      return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(response){
        return response.data.results.map(function(item){
          return item.formatted_address;
        });
      });
    };

    SystemData.getData().then(function(data) {
      $scope.app = data;
    });
  }
]);

'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'News', 'NotificationService',
  function ($scope, Authentication, News, NotificationService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.onBell = function() {
      setTimeout(function() {
        NotificationService.showNotification({
          title: 'Kleo app',
          content: 'Something happened!',
          icon: 'modules/core/client/img/brand/kleo.png'
        });
      }, 0);
    };

    $scope.postTypes = [
      {
        key: 'News',
        title: 'News'
      },
      {
        key: 'Post',
        title: 'Articles'
      },
      {
        key: 'Popular',
        title: 'Popular tags'
      }
    ];

    $scope.setSelected = function(item) {
      if ($scope.selectedPostType) $scope.selectedPostType.active = false;
      item.active = true;
      $scope.selectedPostType = item;
    };

    $scope.setSelected($scope.postTypes[0]);

    News.getData().then(function(result) {
      $scope.posts = result;
    });

    $scope.mainButtons = [
      {
        title: 'List',
        icon: 'list-alt'
      },
      {
        title: 'Favourite',
        icon: 'heart'
      },
      {
        title: 'Books',
        icon: 'book'
      },
      {
        title: 'Data',
        icon: 'barcode'
      },
      {
        title: 'Bells',
        icon: 'bell'
      },
      {
        title: 'Files',
        icon: 'folder-open'
      }
    ];

    $scope.news = [{
      title: 'Something new',
      content: 'Lorem ipsum ',
      user: 'Mary',
      date: 'Feb 14, 2013',
      from: 'ps.stu'
    }, {
      title: 'The show performed!',
      content: 'Really great show performed last sunday',
      user: 'J. D. Henderson',
      date: 'Feb 14, 2013',
      from: 'bbc.uk'
    }];
  }
]);

'use strict';

angular.module('core').controller('InsertImageController', ['$scope', '$modalInstance',
  function($scope, $modalInstance){

  $scope.insert = function(){
    $modalInstance.close($scope.image);
  };
}]);
'use strict';

angular.module('core').controller('PageController', ['$scope', 'Authentication', 'Posts', 'NotificationService',
  function ($scope, Authentication, Posts, NotificationService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.onBell = function() {
      setTimeout(function() {
        NotificationService.showNotification({
          title: 'Kleo app',
          content: 'Something happened!',
          icon: 'modules/core/client/img/brand/kleo.png'
        });
      }, 0);
    };

    $scope.postTypes = [
      {
        key: 'News',
        title: 'News'
      },
      {
        key: 'Post',
        title: 'Articles'
      },
      {
        key: 'Popular',
        title: 'Popular tags'
      }
    ];

    $scope.setSelected = function(item) {
      if ($scope.selectedPostType) $scope.selectedPostType.active = false;
      item.active = true;
      $scope.selectedPostType = item;
    };

    $scope.setSelected($scope.postTypes[0]);

    $scope.posts = Posts.query();

    $scope.mainButtons = [
      {
        title: 'List',
        icon: 'list-alt'
      },
      {
        title: 'Favourite',
        icon: 'heart'
      },
      {
        title: 'Books',
        icon: 'book'
      },
      {
        title: 'Data',
        icon: 'barcode'
      },
      {
        title: 'Bells',
        icon: 'bell'
      },
      {
        title: 'Files',
        icon: 'folder-open'
      }
    ];

    $scope.news = [{
      title: 'Something new',
      content: 'Lorem ipsum ',
      user: 'Mary',
      date: 'Feb 14, 2013',
      from: 'ps.stu'
    }, {
      title: 'The show performed!',
      content: 'Really great show performed last sunday',
      user: 'J. D. Henderson',
      date: 'Feb 14, 2013',
      from: 'bbc.uk'
    }];
  }
]);

'use strict';

angular.module('core').directive('adminModuleModel', ['$filter', 'AdminService',
  function($filter, Admin) {
    return {
      templateUrl: 'modules/core/client/views/templates/admin-module-model.client.html',
      restrict: 'E',
      scope: {
        model: '='
      },
      link: function(scope, element, attrs) {

        scope.isArray = angular.isArray;

        scope.pagedItems = [];
        scope.itemsPerPage = 10;
        scope.currentPage = 1;

        scope.$watch('model', function(id) {
          var modelObj = Admin.getModel(id);
          if (modelObj) {
            modelObj.model.query(function(items) {
              scope.items = items;
              scope.options = modelObj.options;
              scope.figureOutItemsToDisplay();
            });
          }
        });

        scope.figureOutItemsToDisplay = function () {
          scope.filteredItems = $filter('filter')(scope.items, {
            $: scope.search
          });
          scope.filterLength = scope.filteredItems.length;
          var begin = ((scope.currentPage - 1) * scope.itemsPerPage);
          var end = begin + scope.itemsPerPage;
          scope.pagedItems = scope.filteredItems.slice(begin, end);
        };

        scope.pageChanged = function () {
          scope.figureOutItemsToDisplay();
        };

        scope.pageRoute = function(id) {
          return scope.options.route + '({' + scope.options.modelId + ': ' + id + '})';
        };
      }
    };
  }
]);
'use strict';

angular.module('core').directive('kuiDropdown', [
  function() {
    return {
      templateUrl: 'modules/core/client/views/templates/kui-dropdown.client.html',
        restrict: 'E',
        scope: {
          title: '=',
          items: '='
        }
      };
    }
]);
'use strict';

angular.module('core').directive('kuiPostDetails', [
  function() {
    return {
      templateUrl: 'modules/core/client/views/templates/kui-post-details.client.html',
      restrict: 'E',
      scope: {
        post: '='
      }
    };
  }
]);
'use strict';

angular.module('core').directive('kuiUploadImage', ['$window', '$timeout', 'FileUploader',
  function($window, $timeout, FileUploader) {
    return {
      templateUrl: 'modules/core/client/views/templates/kui-upload-image.client.html',
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
'use strict';

angular.module('core').directive('postsList', [
	function() {
		return {
			templateUrl: 'modules/core/client/views/templates/posts-list.client.html',
			restrict: 'E',
			scope: {
				items: '=',
				filter: '=',
				disabledAuthor: '='
			},
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
'use strict';

/**
 * Edits by Ryan Hutchison
 * Credit: https://github.com/paulyoder/angular-bootstrap-show-errors */

angular.module('core')
  .directive('showErrors', ['$timeout', '$interpolate', function ($timeout, $interpolate) {
    var linkFn = function (scope, el, attrs, formCtrl) {
      var inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses,
        initCheck = false,
        showValidationMessages = false,
        blurred = false;

      options = scope.$eval(attrs.showErrors) || {};
      showSuccess = options.showSuccess || false;
      inputEl = el[0].querySelector('.form-control[name]') || el[0].querySelector('[name]');
      inputNgEl = angular.element(inputEl);
      inputName = $interpolate(inputNgEl.attr('name') || '')(scope);

      if (!inputName) {
        throw 'show-errors element has no child input elements with a \'name\' attribute class';
      }

      var reset = function () {
        return $timeout(function () {
          el.removeClass('has-error');
          el.removeClass('has-success');
          showValidationMessages = false;
        }, 0, false);
      };

      scope.$watch(function () {
        return formCtrl[inputName] && formCtrl[inputName].$invalid;
      }, function (invalid) {
        return toggleClasses(invalid);
      });

      scope.$on('show-errors-check-validity', function (event, name) {
        if (angular.isUndefined(name) || formCtrl.$name === name) {
          initCheck = true;
          showValidationMessages = true;

          return toggleClasses(formCtrl[inputName].$invalid);
        }
      });

      scope.$on('show-errors-reset', function (event, name) {
        if (angular.isUndefined(name) || formCtrl.$name === name) {
          return reset();
        }
      });

      toggleClasses = function (invalid) {
        el.toggleClass('has-error', showValidationMessages && invalid);
        if (showSuccess) {
          return el.toggleClass('has-success', showValidationMessages && !invalid);
        }
      };
    };

    return {
      restrict: 'A',
      require: '^form',
      compile: function (elem, attrs) {
        if (attrs.showErrors.indexOf('skipFormGroupCheck') === -1) {
          if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
            throw 'show-errors element does not have the \'form-group\' or \'input-group\' class';
          }
        }
        return linkFn;
      }
    };
}]);

'use strict';

angular.module('core').directive('sidebar', [
  function() {
    return {
      templateUrl: 'modules/core/client/views/templates/sidebar.client.html',
      restrict: 'E',
      scope: {
        tabs: '='
      },
      link: function(scope, element, attrs) {

      }
    };
  }
]);
'use strict';

angular.module('core').factory('AdminService', [
  function () {
    var adminPages = [
      {
        id: 'models',
        state: 'admin.main.mode({moduleId: "models"})',
        title: 'Models',
        items: []
      }, {
        id: 'pages',
        state: 'admin.main.mode({moduleId: "pages"})',
        title: 'Pages',
        items: []
      }
    ];

    return {
      getAdminPages: function() {
        return adminPages;
      },
      addModel: function(model) {
        model.state = 'admin.main.mode.item({moduleId: "models", itemId: "' + model.id + '"})';
        adminPages[0].items.push(model);
      },
      getModel: function(modelId) {
        return _.find(adminPages[0].items, function(model) {
          return model.id === modelId;
        });
      }
    };
  }
]);
'use strict';

//Dictionary service used for communicating with the posts REST endpoints
angular.module('core').factory('Dictionaries', ['$resource',
  function($resource) {
    return $resource('api/dictionary/:dictId', {
      dictId: '@_id'
    });
  }
]);
'use strict';

angular.module('core').factory('authInterceptor', ['$q', '$injector',
  function ($q, $injector) {
    return {
      responseError: function(rejection) {
        if (!rejection.config.ignoreAuthModule) {
          switch (rejection.status) {
            case 401:
              $injector.get('$state').transitionTo('authentication.signin');
              break;
            case 403:
              $injector.get('$state').transitionTo('forbidden');
              break;
          }
        }
        // otherwise, default behaviour
        return $q.reject(rejection);
      }
    };
  }
]);

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [
  function () {
    // Define a set of default roles
    this.defaultRoles = ['user', 'admin'];

    // Define the menus object
    this.menus = {};

    // A private function for rendering decision
    var shouldRender = function (user) {
      if (!!~this.roles.indexOf('*')) {
        return true;
      } else {
        if(!user) {
          return false;
        }
        for (var userRoleIndex in user.roles) {
          for (var roleIndex in this.roles) {
            if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
              return true;
            }
          }
        }
      }

      return false;
    };

    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exist');
        }
      } else {
        throw new Error('MenuId was not provided');
      }

      return false;
    };

    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Return the menu object
      return this.menus[menuId];
    };

    // Add new menu object by menu id
    this.addMenu = function (menuId, options) {
      options = options || {};

      // Create the new menu
      this.menus[menuId] = {
        roles: options.roles || this.defaultRoles,
        items: options.items || [],
        shouldRender: shouldRender
      };

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Return the menu object
      delete this.menus[menuId];
    };

    // Add menu item object
    this.addMenuItem = function (menuId, options) {
      options = options || {};

      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Push new menu item
      this.menus[menuId].items.push({
        title: options.title || '',
        state: options.state || '',
        type: options.type || 'item',
        class: options.class,
        roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.defaultRoles : options.roles),
        position: options.position || 0,
        items: [],
        shouldRender: shouldRender
      });

      // Add submenu items
      if (options.items) {
        for (var i in options.items) {
          this.addSubMenuItem(menuId, options.state, options.items[i]);
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Add submenu item object
    this.addSubMenuItem = function (menuId, parentItemState, options) {
      options = options || {};

      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].state === parentItemState) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: options.title || '',
            state: options.state || '',
            roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : options.roles),
            position: options.position || 0,
            shouldRender: shouldRender
          });
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemState) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].state === menuItemState) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemState) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].state === submenuItemState) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    //Adding the topbar menu
    this.addMenu('topbar', {
      roles: ['*']
    });

    this.addMenuItem('topbar', {
      title: 'Main',
      state: 'home',
      roles: ['*']
    });
  }
]);

'use strict';

angular.module('core').config(["NotificationProvider", function(NotificationProvider) {
  NotificationProvider.setOptions({
    delay: 100000,
    startTop: 20,
    startRight: 10,
    verticalSpacing: 20,
    horizontalSpacing: 20,
    positionX: 'right',
    positionY: 'bottom'
  });
}]);

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

'use strict';

// Create the Socket.io wrapper service
angular.module('core').service('Socket', ['Authentication', '$state', '$timeout',
  function (Authentication, $state, $timeout) {
    // Connect to Socket.io server
    this.connect = function () {
      // Connect only when authenticated
      if (Authentication.user) {
        this.socket = io();
      }
    };
    this.connect();

    // Wrap the Socket.io 'on' method
    this.on = function (eventName, callback) {
      if (this.socket) {
        this.socket.on(eventName, function (data) {
          $timeout(function () {
            callback(data);
          });
        });
      }
    };

    // Wrap the Socket.io 'emit' method
    this.emit = function (eventName, data) {
      if (this.socket) {
        this.socket.emit(eventName, data);
      }
    };

    // Wrap the Socket.io 'removeListener' method
    this.removeListener = function (eventName) {
      if (this.socket) {
        this.socket.removeListener(eventName);
      }
    };
  }
]);

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
'use strict';

// Configuring the Posts module
angular.module('posts').run(['Menus', 'AdminService', 'Posts',
  function (Menus, Admin, Posts) {
    // Add the posts dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Posts',
      state: 'posts.list',
      roles: ['*']
    });

    Admin.addModel({
      id: 'posts',
      title: 'Posts',
      model: Posts,
      options: {
        name: {
          title: 'Title',
          value: 'title'
        },
        fields: [
          {
            title: 'Type',
            value: 'postType'
          },
          {
            title: 'Creation Date',
            value: 'created'
          }
        ],
        route: 'posts.view',
        modelId: 'postId'
      }
    });
  }
]);
'use strict';

// Setting up route
angular.module('posts').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('posts', {
        abstract: true,
        url: '/posts',
        template: '<ui-view/>'
      })
      .state('posts.list', {
        url: '',
        templateUrl: 'modules/posts/client/views/list-posts.client.view.html'
      })
      .state('posts.create', {
        url: '/create',
        templateUrl: 'modules/posts/client/views/edit-post.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('posts.view', {
        url: '/:postId',
        templateUrl: 'modules/posts/client/views/view-post.client.view.html'
      })
      .state('posts.edit', {
        url: '/:postId/edit',
        templateUrl: 'modules/posts/client/views/edit-post.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
'use strict';

// Articles controller
angular.module('posts').controller('PostsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Posts', 'Dictionaries',
  function ($scope, $stateParams, $location, Authentication, Posts, Dictionaries) {

    // hack for upload image
    $scope.$on('imageURLChanged', function(ev, url) {
      $scope.post.previewImg = url;
    });

    $scope.authentication = Authentication;

    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');
        return false;
      }

      var post;
      if ($scope.post._id) {
        post = $scope.post;
        post.$update(function() {
          $location.path('posts/' + post._id);
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      }
      else {
        post = new Posts({
          title: this.post.title,
          showGlobal: this.post.showGlobal,
          preview: this.post.preview,
          content: this.post.content,
          postType: this.post.postType,
          previewImg: this.post.previewImg
          // draft: this.post.draft,
          // showMain: this.post.showMain
        });

        post.$save(function(response) {
          $location.path('posts/' + response._id);
          $scope.title = '';
          $scope.content = '';
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      }
    };
    // Remove existing Post
    $scope.remove = function (post) {
      if (post) {
        post.$remove();

        for (var i in $scope.posts) {
          if ($scope.posts[i] === post) {
            $scope.posts.splice(i, 1);
          }
        }
      } else {
        $scope.post.$remove(function () {
          $location.path('posts');
        });
      }
    };

    // Find a list of Posts
    $scope.find = function () {
      $scope.posts = Posts.query();
    };

    // Find existing Post
    $scope.findOne = function () {
      $scope.post = Posts.get({
        postId: $stateParams.postId
      });
      $scope.options = [
        {
          title: 'Edit',
          icon: 'edit',
          sref: 'posts.edit({postId: "' + $stateParams.postId + '"})'
        },
        {
          title: 'Remove',
          icon: 'trash',
          click: $scope.remove
        }
      ];
    };

    $scope.getDictionary = function() {
      $scope.types = Dictionaries.get({
        dictId: 'POST_TYPE'
      });
    };

    $scope.initUpdateForm = function() {
      $scope.types = Dictionaries.get({
        dictId: 'POST_TYPE'
      });
      if ($stateParams.postId) {
        $scope.updateValue = 'Update';
        Posts.get({
          postId: $stateParams.postId
        }, function(post) {
          $scope.post = post;
          // reject user with no rights for edit
          if (!$scope.authentication.isAdmin() && !$scope.authentication.hasAccess($scope.post.user._id)) {
            $location.path('forbidden');
          }
        });
      }
      else {
        $scope.updateValue = 'Create';
        $scope.post = {};
      }
    };

    $scope.onCancel = function() {
      $location.path('/posts');
    };
  }
]);
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
'use strict';

//Posts service used for communicating with the posts REST endpoints
angular.module('posts').factory('Posts', ['$resource',
  function ($resource) {
    return $resource('api/posts/:postId', {
      postId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html'
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/change-password.client.view.html'
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html'
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html'
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html'
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/views/authentication/signup.client.view.html'
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/views/authentication/signin.client.view.html'
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html'
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html'
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html'
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/password/reset-password.client.view.html'
      });
  }
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
              case 401:
                // Deauthenticate the global user
                Authentication.user = null;

                // Redirect to signin page
                $location.path('signin');
                break;
              case 403:
                // Add unauthorized behaviour
                break;
            }

            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
])

.run(['AdminService', 'Users', function(Admin, Users) {
  Admin.addModel({
    id: 'users',
    title: 'Users',
    model: Users,
    options: {
      name: {
        title: 'Username',
        value: 'username'
      },
      fields: [
        {
          title: 'Email',
          value: 'email'
        },
        {
          title: 'Roles',
          value: 'roles'
        }
      ],
      route: 'users.view',
      modelId: 'userId'
    }
  });
}]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('users.list', {
        url: '/users',
        template: ''
      })
      .state('users', {
        url: '/users/:userId',
        abstract: true,
        templateUrl: 'modules/users/client/views/users/view-user.client.view.html',
        controller: ["$scope", "$state", "userResolve", "Authentication", function($scope, $state, userResolve, Authentication) {
          userResolve.$promise.then(function(user) {
            $scope.user = user;

            // later will be replaced with configuration instance
            $scope.profileTabs = [
              {
                title: 'Overview',
                sref: 'users.view({userId: user._id})',
                icon: 'home',
                show: true
              },
              {
                title: 'Profile Settings',
                sref: 'settings.profile',
                icon: 'user',
                show: $scope.authentication.hasAccess(userResolve._id)
              },
              {
                title: 'Files',
                sref: 'users.files({userId: user._id})',
                icon: 'folder-open',
                show: true
              },
              {
                title: 'Administration',
                sref: 'users.edit({userId: user._id})',
                icon: 'lock',
                show: $scope.authentication.isAdmin()
              }
            ];
          });

          $scope.authentication = Authentication;
        }],
        resolve: {
          userResolve: ['$stateParams', 'Users', function ($stateParams, Users) {
            return Users.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('users.view', {
        url: '',
        templateUrl: 'modules/users/client/views/users/view-user-info.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Users', function ($stateParams, Users) {
            return Users.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('users.edit', {
        url: '/edit',
        templateUrl: 'modules/users/client/views/users/edit-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Users', function ($stateParams, Users) {
            return Users.get({
              userId: $stateParams.userId
            });
          }]
        }
      });
  }
]);

'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication',
  function ($scope, $state, $http, $location, $window, Authentication) {
    $scope.authentication = Authentication;

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    $scope.signup = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.signin = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.setUser(response);
        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
  }
]);

'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
  function ($scope, $stateParams, $http, $location, Authentication) {
    $scope.authentication = Authentication;

    //If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    // Submit forgotten password account id
    $scope.askForPasswordReset = function () {
      $scope.success = $scope.error = null;

      $http.post('/api/auth/forgot', $scope.credentials).success(function (response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;

      }).error(function (response) {
        // Show user error message and clear form
        $scope.credentials = null;
        $scope.error = response.message;
      });
    };

    // Change user password
    $scope.resetUserPassword = function () {
      $scope.success = $scope.error = null;

      $http.post('/api/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;

        // Attach user profile
        Authentication.user = response;

        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('ChangePasswordController', ['$scope', '$http', 'Authentication',
  function ($scope, $http, Authentication) {
    $scope.user = Authentication.user;

    // Change user password
    $scope.changeUserPassword = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'passwordForm');

        return false;
      }

      $http.post('/api/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.$broadcast('show-errors-reset', 'passwordForm');
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('ChangeProfilePictureController', ['$scope', '$http', '$timeout', '$window', 'Authentication', 'FileUploader',
  function ($scope, $http, $timeout, $window, Authentication, FileUploader) {
    $scope.user = Authentication.user;
    $scope.imageUrl = $scope.user.profileImageURL;

    $scope.onFinishUpload = function(url) {
      $http.post('/api/users/picture', {filename: url})
        .success(function(data) {
          // Populate user object
          $scope.user = Authentication.user = data;
        });
    };
  }
]);

'use strict';

angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;

    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = new Users($scope.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'userForm');

        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };

    $scope.back = function() {
      $location.path('/users/' + $scope.user._id);
    };
  }
]);

'use strict';

angular.module('users').controller('SocialAccountsController', ['$scope', '$http', 'Authentication',
  function ($scope, $http, Authentication) {
    $scope.user = Authentication.user;

    // Check if there are additional accounts
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }

      return false;
    };

    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
    };

    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;

      $http.delete('/api/users/accounts', {
        params: {
          provider: provider
        }
      }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('SettingsController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    $scope.user = Authentication.user;
    $scope.tabs = [{
      id: 'profile',
      state: 'settings.profile',
      title: 'Edit Profile',
      items: []
    }, {
      id: 'picture',
      state: 'settings.picture',
      title: 'Change Profile Picture',
      items: []
    }, {
      id: 'password',
      state: 'settings.password',
      title: 'Change Password',
      items: []
    }];
  }
]);

'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', 'userResolve',
  function ($scope, $state, Authentication, userResolve) {
    $scope.authentication = Authentication;
    $scope.user = userResolve;

    $scope.remove = function (user) {
      if (confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          $scope.users.splice($scope.users.indexOf(user), 1);
        } else {
          $scope.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = $scope.user;

      user.$update(function () {
        $state.go('users.view', {
          userId: user._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);

'use strict';

// Users directive used to force lowercase input
angular.module('users').directive('lowercase', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, modelCtrl) {
      modelCtrl.$parsers.push(function (input) {
        return input ? input.toLowerCase() : '';
      });
      element.css('text-transform', 'lowercase');
    }
  };
});

'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window',
  function ($window) {
    var auth = {
      user: $window.user,
      isAdmin: function() {
        return this.user && this.user.roles.indexOf('admin') !== -1;
      },
      hasAccess: function(id) {
        return this.user && this.user._id === id;
      },
      setUser: function(user) {
        this.user = user;
      }
    };
    return auth;
  }
]);

'use strict';

// Users service used for communicating with the users REST endpoint
/*angular.module('users').factory('Users', ['$resource',
  function ($resource) {
    return $resource('api/users', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]); */

angular.module('users').factory('Users', ['$resource',
  function ($resource) {
    return $resource('api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);