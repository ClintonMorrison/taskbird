
appControllers.controller('TasksCtrl', function ($scope, $routeParams, $http, taskAPI, $timeout, loaderService) {
    window.scope = $scope;
	$scope.taskOrderBy = "date_created";
	
	$scope.selectedTask = false;
    $scope.$watch('selectedTask', function(newValue, oldValue) {
        if (newValue === false || oldValue === false) {
            return;
        }

        if (newValue.id !== oldValue.id) {
            return;
        }

        if (_.isEqual(newValue, oldValue)) {
            return;
        }

        $scope.saveTask(newValue);
    }, true);

    $scope.isNotDoneFilter = {
        done: false
    };

	$scope.priorities = [
		{name: "Low",    color: "green"},
		{name: "Normal", color: "black"},
		{name: "High",   color: "red"}
	];

    $scope.priorityColors = {};
    _.forEach($scope.priorities, function (priority) {
        $scope.priorityColors[priority.name] = priority.color;
    });

	$scope.refresh = function() {
		// Get tasks
        taskAPI.getTasks().success(function (data) {
			$scope.tasks = data.objects;
			$scope.deselectAllTasks();

            // Format task dates
            _.each($scope.tasks, function(task) {
                if (task.date_due) {
                    task.date_due = moment(task.date_due).format('MM/DD/YYYY');
                }

                task.projectID = (task.projects.length > 0) ? task.projects[0].id : false;
            });

			// debug only
			window.tasks = $scope.tasks;
		});

        // Get projects
        taskAPI.get('project/').success(function (data) {
            $scope.projects = data.objects;

            // Filter by project ID in URL
            $timeout(function () {
                $scope.filterProject = "all";
                if ($routeParams.projectID) {
                    $scope.filterProject = parseInt($routeParams.projectID, 10);
                }
            });
        });
	};

	$scope.deleteTask = function(task) {
		var deleteModalCallback = function(approved) {
			if (approved) {
				taskAPI.delete('task/' + task.id).then(function () {
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

    $scope.doneTask = _.debounce(function(task) {
        task.done = !task.done;
        taskAPI.put('task/' + task.id, {}, {done: task.done}, true).then(function (){
            //$scope.refresh();
        });
    }, 150);
	
	$scope.selectTask = function(task) {
		// Deselect task if currently selected task clicked
		if ( $scope.selectedTask && $scope.selectedTask.id == task.id) {
			$scope.deselectAllTasks();
			return;
		}

		$scope.deselectAllTasks();
		
		task.selected = true;
		$scope.selectedTask = task;
		window.selectedTask = task;
	};

	$scope.deselectAllTasks = function() {
		_.chain($scope.tasks).forEach(function(task) { task.selected = false });
		$scope.selectedTask = false;
	};

	$scope.findTaskByID = function(taskId) {
		var task = _.chain($scope.tasks).find({id: taskId.toString()}).value();
		return task;
	};

    $scope.createTask = function () {
        var taskData = {
            title: 'New Task',
            description: '',
            projects: []
        };

        taskAPI.post("task/", taskData).then(function (response) {
            console.log("Created task: ", response.data);
            response.data.projectID = false;
            $scope.tasks.push(response.data);
            $scope.selectTask(_.last($scope.tasks));
        });
    };

    var _submitTaskData = function (task) {
        var taskData = {
            title: task.title,
            priority: task.priority,
            description: task.description
        };

        if (task.date_due) {
            taskData.date_due = task.date_due.replace(/\//g, '-') + "T00:00:00.000000";
        }

        if (task.projectID) {
            taskData.projects = [_.find($scope.projects, {'id': task.projectID})];
        } else {
            taskData.projects = [];
        }

        console.log("Saving task #" + task.id,  taskData);

        if (!task.id) {
            taskPromise = taskAPI.post("task/", {}, taskData, true);
        } else {
            taskPromise = taskAPI.put('task/' + task.id, {}, taskData, true);
        }

        taskPromise.then(
            function () {},
            function () {
                ModalService.alert(
                    "Error",
                    "There was a problem saving the task"
                );
            }
        );
    };

    $scope.saveTask = _.debounce(_submitTaskData, 750);

    $scope.createProject = function () {
        ModalService.promptText(
            'New Project',
            'Please enter a name for the new project:',
            function(val) {
                if (!val) {
                    return;
                }

                taskAPI.post('project/', {}, {'title': val}).then(
                    function () {},
                    function () {
                        ModalService.alert(
                            'Error',
                            'There was a problem creating your project. Please try again later'
                        );
                });
            }
        );
    };

    $scope.isInProject = function(task, projectID) {
        if (!projectID || projectID === 'all') {
            return true;
        }

        return (task.projectID == projectID);
    };

    $scope.getProjectByID = function(projectID) {
        return _.findWhere($scope.projects, {id: projectID});
    }

	$scope.refresh();
});

