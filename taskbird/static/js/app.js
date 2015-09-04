
var taskApp = angular.module('taskApp', [
	'ngRoute',
	'appControllers'
])
.config(function ($routeProvider) {
	$routeProvider
		.when('/task/new', {
			templateUrl: '/static/partials/newTask.html',
			controller: 'NewTaskCtrl'
		})
		.when('/task/:taskID', {
			templateUrl: '/static/partials/newTask.html',
			controller: 'NewTaskCtrl'
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
		.otherwise({
			redirectTo: '/tasks/'
		});
});

var appControllers = angular.module('appControllers', []);

