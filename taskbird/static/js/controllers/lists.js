appControllers.controller('ListsCtrl', function ($scope, $http) {

	$scope.listOrderBy = "titled";

	$http.get("ajax/getList.php").success(function(result) {
		console.log(result);
		$scope.tasks = result;
	});
	
});

