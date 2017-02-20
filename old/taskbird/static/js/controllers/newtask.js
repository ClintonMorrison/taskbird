appControllers.controller('NewTaskCtrl', function($scope, $http, $route, $routeParams, $location, taskAPI) {

    window.$scope = $scope;

	$scope.init = function() {

		if ($routeParams.taskID) {
            // moment().format("YYYY/MM/DD\T00:00:00.000000");
			taskAPI.get('task/' + $routeParams.taskID).then(
				function (result) {
					window.test = result.data;
					if (result.data.date_due) {
						result.data.date_due = moment(result.data.date_due).format("MM/DD/YYYY");
					}
					$.extend($scope, result.data);
				},
				function (error) {
					ModalService.alert(
						"Error",
						"The requested task does not exist",
						function () {
							$location.path('/tasks/');
                            $route.reload();
						}
					)
				}
			);
		}
	};

	$scope.submitTask = function() {
	    var taskData = {
            title: $scope.title,
            description: $scope.description,
        };

		if ($scope.date_due) {
			taskData.date_due = $scope.date_due.replace('/', '-') + "T00:00:00.000000";
		}

		var taskPromise;
		if (!$routeParams.taskID) {
			taskPromise = taskAPI.post("task/", {}, taskData);
		} else {
			taskPromise = taskAPI.put('task/' + $routeParams.taskID, {}, taskData);
		}

		taskPromise.then(
			function () {
                $location.path('/tasks/');
                $route.reload();
            },
            function () {
                ModalService.alert(
                    "Error",
                    "There was a problem saving the task"
                );
            }
		);
	};

	$scope.init();
});
