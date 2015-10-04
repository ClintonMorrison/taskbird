
appControllers.controller('TasksCtrl', function ($scope, $timeout, $routeParams, $http, taskAPI, taskData, projectData) {
    window.scope = $scope;
	$scope.taskOrderBy = "date_created";
	
	$scope.selectedTask = false;
    $scope.$watch('selectedTask', function(newValue, oldValue) {
        if (!newValue  || !oldValue || newValue.id !== oldValue.id || _.isEqual(newValue, oldValue)) {
            return;
        }

        $scope.saveTask(newValue);
    }, true);

    $scope.$watch('filterProject', function(newValue, oldValue) {
        if ($scope.selectedTask) {
            if ($scope.selectedTask.project && $scope.selectedTask.id !== newValue && newValue !== 'all') {
                $scope.selectedTask = false;
            }
        }
    });

	$scope.priorities = [
		{name: "Low",    color: "green"},
		{name: "Normal", color: "black"},
		{name: "High",   color: "red"}
	];

    $scope.priorityColors = {};
    _.forEach($scope.priorities, function (priority) {
        $scope.priorityColors[priority.name] = priority.color;
    });

	$scope.refresh = function(firstLoad) {
        firstLoad = true;

        // Get tasks
        taskData.getTasks().then(function (tasks) {
            $scope.tasks = tasks;
            if (firstLoad && $routeParams.taskID) {
                $scope.selectedTask = _($scope.tasks).filter({id: parseInt($routeParams.taskID)}).first();
            }
        });

        // Get projects
        projectData.getProjects().then(function (projects) {
            $scope.projects = projects;

            // Filter by project ID in URL
            $timeout(function () {
                $scope.filterProject = "all";
                if ($routeParams.projectID && firstLoad) {
                    $scope.filterProject = parseInt($routeParams.projectID, 10);
                }
            });
        });

        projectData.getProjectMap().then(function (projectMap) {
           console.log("GOT MAP", projectMap);
            $scope.projectMap = projectMap;
        });
	};

	$scope.deleteTask = function(task) {
		var deleteModalCallback = function(approved) {
			if (approved) {
                taskData.deleteTask(task).then(function (response) {
                    $scope.selectedTask = false;
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
            if (!$scope.showDoneTasks) {
                if ($scope.selectedTask.id == task.id) {
                    $scope.selectedTask = false;
                }
            }
        });
    }, 150);
	
	$scope.selectTask = function(task) {
		// Deselect task if currently selected task clicked
		if ( $scope.selectedTask && $scope.selectedTask.id == task.id) {
			$scope.selectedTask = false;
			return;
		}

        if ($scope.filterProject !== 'all') {
            if (task.project && task.project.id != $scope.filterProject) {
            }


        }

		$scope.selectedTask = task;
		window.selectedTask = task;
	};

	$scope.findTaskByID = function(taskId) {
		var task = _.chain($scope.tasks).find({id: taskId.toString()}).value();
		return task;
	};

    $scope.createTask = function () {
        data = {};

        taskData.createTask(data).then(function (task) {
            if ($scope.filterProject) {
                task.project = $scope.projectMap[$scope.filterProject];
                taskData.saveTask(task);
            }

            $scope.selectTask(_.last($scope.tasks));
        });
    };

    var _submitTaskData = function (task) {

        taskData.saveTask(task).then(
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

                projectData.createProject({title: val}).then(function (project) {
                    if ($scope.selectedTask) {
                    }
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
    };

	$scope.refresh(true);
});
