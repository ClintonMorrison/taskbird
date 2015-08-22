appControllers.controller('NewTaskCtrl', function($scope, $http, $route, $routeParams, $location, taskAPI) {

    window.$scope = $scope;

	$scope.init = function() {
		jQuery("#new-task-deadline").datepicker();

		if ($routeParams.taskID) {
            // moment().format("YYYY/MM/DD\T00:00:00.000000");
			taskAPI.get('task/' + $routeParams.taskID).then(
				function (result) {
					window.test = result.data;
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

	$scope.createTask = function() {
        var taskData = {
            title: $scope.title,
            description: $scope.description,
        };

		if ($scope.due_date) {
			taskData.due_date = $scope.due_date + "T00:00:00.000000";
		}

        taskAPI.post("task/", {}, taskData).then(
            function () {
                $location.path('/tasks/');
                $route.reload();
            },
            function () {
                ModalService.alert(
                    "Error",
                    "There was a problem creating the task"
                );
            }
        );
	};

	$scope.init();
});
