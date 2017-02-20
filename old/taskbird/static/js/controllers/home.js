appControllers.controller('HomeCtrl', function ($scope, $http, taskAPI) {
	$scope.userSettings = taskAPI.get('userSettings').then(function (result) {
        console.log(result);
    });
});


