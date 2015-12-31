
taskApp.directive('dropdown', function ($timeout) {
    return {
        restrict: "E",
        scope: {
            ngModel: '=',
            ngChange: '@',
            placeholder: '@'
        },
        link: function (scope, elm, attr) {
            elm.dropdown('save defaults')
            scope.$watch('ngModel', function(newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                elm.dropdown('set selected', scope.ngModel);
            });

            elm.dropdown().dropdown('setting', {
                onChange: function (value) {
                    $timeout(function () {
                        scope.ngModel = value;
                        scope.$parent.$apply();
                    });
                }
            });
            elm.dropdown('set selected', scope.ngModel);
        }
    };
});

taskApp.directive('projectSelector', function ($timeout) {
    return {
        restrict: "E",
        replace: 'true',
        template: [
            //'<label>Project</label>',
            '<div class="ui fluid search selection dropdown">',
            '<input type="hidden">',
            '<i class="dropdown icon"></i>',
            '<div class="default text">Select Project</div>',
            '<div class="menu">',
            '<div class="item" data-value="false">Select Project</div>',
            '<div class="item" ng-repeat="project in projects" data-value="{{project.id}}">',
            '<i class="{{project.color}} {{project.icon}} icon"></i>',
            '{{project.title}}',
            '</div>',
            '</div>',
            '</div>'
        ].join('\n'),
        scope: {
            ngModel: '=',
            projects: '='
        },
        link: function (scope, elm, attr) {
            elm.dropdown('save defaults')
            scope.$watch('ngModel', function(newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                elm.dropdown('set selected', scope.ngModel ? scope.ngModel.id : false);
            });

            elm.dropdown().dropdown('setting', {
                onChange: function (value) {
                    $timeout(function () {
                        scope.ngModel = _.chain(scope.projects).filter({id : value}).first().value();
                        scope.$parent.$apply();
                    });
                }
            });
        }
    };
});



taskApp.directive('taskDatepicker', function () {
    return {
        restrict: "E",
        replace: 'true',
        template: "<input class='datepicker' type='text' >",
        link: function (scope, elm, attr) {
            $(elm).datepicker();
        }
    };
});

taskApp.directive('taskCheckbox', function ($timeout) {
    return {
        restrict: "E",
        replace: 'true',
        scope: {
            ngModel: '=',
            label: '@'
        },
        template: [
            '<div class="ui checkbox">',
            '<input type="checkbox" ng-model="ngModel">',
            '<label>{{label}}</label>',
            '</div>'
        ].join(''),
        link: function (scope, elm, attr) {
            scope.$watch('ngModel', function(newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                elm.checkbox('set ' + (scope.ngModel ? 'checked' : 'unchecked'));
            });
            elm.checkbox().checkbox('setting', {
               onChecked: function () {
                   $timeout(function () {
                        scope.ngModel = true;
                        scope.$parent.$apply();
                    });
               }, onUnchecked: function () {
                    $timeout(function () {
                        scope.ngModel = false;
                        scope.$parent.$apply();
                    });
                }
            });
        }
    };
});


taskApp.directive('taskViewer', function ($timeout, taskAPI, $location, windowService) {
    return {
        restrict: "E",
        replace: 'true',
        templateUrl: TaskBirdData.staticURL + 'directives/taskViewer.html',
        scope: {
            tasks: '=',
            hideFilterOptions: '=',
            filterProject: '=',
            showDoneTasks: '=',
            creationDefaults: '=',
            postCreationCallback: '=',
            postUpdateCallback: '='
        },
        link: function ($scope, elm, attr) {
            if (!$scope.filterProject) {
                $scope.filterProject = 'all';
            }

            $scope.windowSize = windowService.getDimensions();
            $scope.$watch('windowSize.width', function (w) {
               if (w > 767) {
                   $scope.previewLength = 15 + _.round((w - 767) * 0.045);
               } else {
                   $scope.previewLength = _.round(w * 0.035);
               }
            });

            $scope.refresh = function() {
                // Get projects
                projectData.getProjects().then(function (projects) {
                    $scope.projects = projects;
                    projectData.getProjectMap().then(function (projectMap) {
                        $scope.projectMap = projectMap;
                    });
                });
            };

            $scope.taskOrderBy = "date_created";
            $scope.selectedTask = false;
            $scope.$watch('selectedTask', function(newValue, oldValue) {
                if (!newValue  || !oldValue || newValue.id !== oldValue.id || _.isEqual(newValue, oldValue)) {
                    return;
                }
                $scope.saveTask(newValue);
            }, true);

            $scope.$watch('tasks', function () {
               if ($scope.selectedTask) {
                   $scope.selectTask($scope.selectedTask);
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
                windowService.scrollToElement('.ui.details.column');
            };

            $scope.findTaskByID = function(taskId) {
                var task = _.chain($scope.tasks).find({id: taskId.toString()}).value();
                return task;
            };

            $scope.createTask = function () {
                var data = {};

                if ($scope.creationDefaults) {
                  data = $scope.creationDefaults;
                }

                taskData.createTask(data).then(function (task) {
                    if ($scope.filterProject) {
                        task.project = $scope.projectMap[$scope.filterProject];
                        taskData.saveTask(task);
                    }

                    if ($scope.postCreationCallback) {
                        $scope.postCreationCallback(task);
                    }

                    $scope.selectTask(_.last($scope.tasks));
                });
            };

            var _submitTaskData = function (task) {
                taskData.saveTask(task).then(
                    function () {},
                    function () {
                        ModalService.alert("Error", "There was a problem saving the task");
                    }
                );
            };

            $scope.saveTask = _.debounce(_submitTaskData, 750);

            $scope.createProject = function () {
                $location.path('/projects');
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
        }
    };
});