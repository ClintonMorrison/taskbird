
appControllers.controller('TasksCtrl', function ($scope, $http, taskAPI) {

	$scope.taskOrderBy = "date_created";
	
	$scope.selectedTask = false;

	$scope.refresh = function() {
		taskAPI.getTasks().success(function (data) {
			console.log("Got task data:", data);
			$scope.tasks = data.objects;
			$scope.deselectAllTasks();

			// debug only
			window.tasks = $scope.tasks;
		});
	};

	$scope.deleteTask = function(task) {
		var deleteModalCallback = function(approved) {
			if (approved) {
				console.log("Will delete task #" + task.id);
				taskAPI.delete('task/' + task.id).then(function (){
					$scope.refresh();
				});
			}
		};

		ModalService.confirm(
			'Delete task',
			'Are you sure you want to delete the task "' + task.title + '"?',
			deleteModalCallback
		);
	};
	
	$scope.selectTask = function(task) {
		// Deselect task if currently selected task clicked
		if ( $scope.selectedTask && $scope.selectedTask.id == task.id) {
			$scope.deselectAllTasks();
			return;
		}

		$scope.deselectAllTasks();
		
		task.selected = true;
		$scope.selectedTask = task;
		console.log($scope.selectedTask);
	};

	$scope.deselectAllTasks = function() {
		_.chain($scope.tasks).forEach(function(task) { task.selected = false });
		$scope.selectedTask = false;
	};

	$scope.findTaskByID = function(taskId) {
		var task = _.chain($scope.tasks).find({id: taskId.toString()}).value();
		return task;
	};

	$scope.refresh();
});

