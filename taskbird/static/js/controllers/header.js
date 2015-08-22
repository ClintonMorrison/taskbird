appControllers.controller('HeaderCtrl', function($scope, $location) {
	$scope.menuItems = [
		{title: "Home", icon: "home", path: "#/"},
		{title: "Calendar", icon: "calendar", path: "#/calendar"},
		{title: "Lists", icon: "list layout", path: "#/lists"},
		{title: "Tasks", icon: "tasks", path: "#/tasks/"}
	];
	$scope.isActive = function(viewLocation){
		return viewLocation === '#'+$location.path();
	}
});
