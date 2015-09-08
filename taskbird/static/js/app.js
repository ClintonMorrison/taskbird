
var taskApp = angular.module('taskApp', [
	'ngRoute',
	'appControllers',
	'ngSanitize',
	'ng-fusioncharts'
])
.config(function ($routeProvider) {
	$routeProvider
		.when('/tasks/:projectID/:taskID', {
			templateUrl: '/static/partials/tasks.html',
			controller: 'TasksCtrl'
		})
		.when('/tasks/:projectID', {
			templateUrl: '/static/partials/tasks.html',
			controller: 'TasksCtrl'
		})
		.when('/tasks/', {
			templateUrl: '/static/partials/tasks.html',
			controller: 'TasksCtrl'
		})
		.when('/projects', {
			templateUrl: '/static/partials/projects.html',
			controller: 'ProjectsCtrl'
		})
		.when('/calendar', {
			templateUrl: '/static/partials/calendar.html',
			controller: 'CalendarCtrl'
		})
        .when('/analytics', {
			templateUrl: '/static/partials/analytics.html',
			controller: 'AnalyticsCtrl'
		})
        .when('/settings', {
			templateUrl: '/static/partials/settings.html',
			controller: 'SettingsCtrl'
		})
		.otherwise({
			redirectTo: '/tasks/'
		});
});

var appControllers = angular.module('appControllers', []);

