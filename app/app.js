// angular goodness goes here.
// general reference dox: https://docs.angularjs.org/tutorial/
(function() {
	var app = angular.module("betterMonospace",
		[
			"firebase",
			"ngRoute",
			"angularSpectrumColorpicker",
			"betterMonospace.config"
		]);

	app.controller("DefaultController", function($scope, $firebaseObject, configObject) {

		$scope.styleObject = configObject.styleObject;
		$scope.languages = configObject.languages;
		$scope.selectedLanguage = configObject.languages[0];
		$scope.languageBrushNames = configObject.languageBrushNames;
		$scope.fontFileNames = configObject.fontFileNames;

		// No firebase yet; I don't want to hard-code my own dummy app here.
		// To set up firebase, see:
		// https://www.firebase.com/docs/web/libraries/angular/quickstart.html
	});

	// Example second controller
	app.controller("DetailController", function($scope, $firebaseObject) {
		$scope.statusMessage = statusString;
	});

	// Components?
	app.component('languageSelector', {
			templateUrl: 'app/_partials/language-selector.html',
			controller: 'DefaultController'
		});
	app.component('dynamicStyle', {
			templateUrl: 'app/_partials/dynamic-style.css',
			controller: 'DefaultController'
		});
	app.component('codeBox', {
			templateUrl: 'app/_partials/code.html',
			controller: 'DefaultController'
		});

	// configuring a very basic routing scheme.
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/editor', {
				templateUrl: 'app/_partials/editor.html',
				controller: 'DefaultController'
			})
			.
		when('/editor/:themeID', {
				templateUrl: 'app/_partials/editor.html',
				controller: 'DetailController'
			})
			.
		otherwise({
			redirectTo: '/editor'
		});
	}]);

	// onready bullshit, sorry for the global var
	app.directive('onReady', function() {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				onReady.init();
			}
		};
	});

})();
