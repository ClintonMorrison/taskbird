
var taskApp = angular.module('taskApp', [
	'ngRoute',
	'appControllers',
	'ngSanitize',
	'ng-fusioncharts'
])
.config(function ($routeProvider) {
	$routeProvider
		.when('/tasks/:projectID/:taskID', {
			templateUrl: TaskBirdData.staticURL + 'partials/tasks.html',
			controller: 'TasksCtrl'
		})
		.when('/tasks/:projectID', {
			templateUrl: TaskBirdData.staticURL + 'partials/tasks.html',
			controller: 'TasksCtrl'
		})
		.when('/tasks/', {
			templateUrl: TaskBirdData.staticURL + 'partials/tasks.html',
			controller: 'TasksCtrl'
		})
		.when('/projects', {
			templateUrl: TaskBirdData.staticURL + 'partials/projects.html',
			controller: 'ProjectsCtrl'
		})
		.when('/calendar', {
			templateUrl: TaskBirdData.staticURL + 'partials/calendar.html',
			controller: 'CalendarCtrl'
		})
		.when('/calendar/:year/:month', {
			templateUrl: TaskBirdData.staticURL + 'partials/calendar.html',
			controller: 'CalendarCtrl'
		})
        .when('/analytics', {
			templateUrl: TaskBirdData.staticURL + 'partials/analytics.html',
			controller: 'AnalyticsCtrl'
		})
        .when('/settings', {
			templateUrl: TaskBirdData.staticURL + 'partials/settings.html',
			controller: 'SettingsCtrl'
		})
		.otherwise({
			redirectTo: '/tasks/'
		});
});

var appControllers = angular.module('appControllers', []);

