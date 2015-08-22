// Initialize dropdown
$('.ui.dropdown').dropdown();

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
		.when('/lists', {
			templateUrl: '/static/partials/lists.html',
			controller: 'ListsCtrl'
		})
		.when('/calendar', {
			templateUrl: '/static/partials/calendar.html',
			controller: 'CalendarCtrl'
		})
		.when('/', {
			templateUrl: '/static/partials/home.html',
			controller: 'HomeCtrl'
		})
		.otherwise({
			redirectTo: '/tasks/'
		});
});

var appControllers = angular.module('appControllers', []);

