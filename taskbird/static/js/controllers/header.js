appControllers.controller('HeaderCtrl', function($scope, $location) {
	$scope.menuItems = [
		{title: "Tasks", icon: "tasks", path: "#/tasks/"},
		{title: "Projects", icon: "list layout", path: "#/projects"},
		{title: "Calendar", icon: "calendar", path: "#/calendar"},
        {title: "Analytics", icon: "bar chart", path: "#/analytics"},
        {title: "Settings", icon: "options", path: "#/settings"},
	];

    $scope.isActive = function(viewLocation){
		return viewLocation === '#'+$location.path();
	};

});
