'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('dev', {
			url: '/dev',
			templateUrl: 'modules/core/views/dev.client.view.html'
		}).
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
	  state('admin', {
			url: '/admin',
			templateUrl: 'modules/core/views/admin.client.view.html'
		})
	}
])

.config(['$affixProvider', function ($affixProvider) {
	angular.extend($affixProvider.defaults, {
		inlineStyles: false
	});
}]);