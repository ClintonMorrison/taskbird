appControllers.controller('CalendarCtrl', function($scope, $route, $timeout, $routeParams, $location, taskAPI, taskData, windowService) {
    $scope.windowSize = windowService.getDimensions();
    $scope.filterProject = 'all';
    $scope.showDoneTasks = true;

    var fullDays =  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $scope.days = [];
    _.each(fullDays, function (day) {
       $scope.days.push({title: day, mediumTitle: day.substr(0, 3), shortTitle: day.substr(0, 1)})
    });

    $scope.windowWidth = $(window).width();
    $(window).resize(_.debounce(function() {
        $scope.$apply(function () {
            $scope.windowWidth = $(window).width();
        });
    }, 500));


    var _createDay = function(year, month, num, tasksOnDay) {
        var day = {};
        var dateString = year + '-' + month + '-' + num;
        if (tasksOnDay[num]) {
            day = {date: dateString, number: num, tasks: tasksOnDay[num]};
        } else {
            day = {date: dateString, number: num, tasks: []};
        }
        return day;
    };

    $scope.selectedDay = false;

    $scope.refresh = function () {

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

        $scope.year = moment().format('YYYY');
        $scope.month = moment().format('MM');

        if ($routeParams.year) {
            $scope.year = $routeParams.year;
        }
        if ($routeParams.month) {
            $scope.month = $routeParams.month;
        }

        var dateString = $scope.year + '-' + $scope.month + 'T00:00:00';

        $scope.currentDate = moment(dateString).format("MMMM, YYYY");
        $scope.todaysDate = moment().format("YYYY-MM-D");
        var currentYearAndMonth = moment(dateString).format("YYYY-MM");

        taskData.getTasks().then(function (tasks) {
            $scope.tasks = tasks;
            $scope.tasksOnDay = {};

            _.each($scope.tasks, function (task) {
                if (task.date_due) {
                    if (moment(task.date_due).format('YYYY-MM') != currentYearAndMonth) {
                        return;
                    }

                    var day = moment(task.date_due).format('D');
                    if (!$scope.tasksOnDay[day]) {
                        $scope.tasksOnDay[day] = [];
                    }
                    $scope.tasksOnDay[day].push(task);
                }
            });

            var startDayOfWeek = (moment(dateString).startOf('month').format('d')) % 7;
            var lastDayOfMonth = moment(dateString).endOf('month').format('DD');
            var num = 1;
            var days = [];

            while (startDayOfWeek > 0) {
                days.push({number: '', tasks: []});
                startDayOfWeek -= 1;
            }

            for (num = 1; num <= lastDayOfMonth; num++) {
                days.push(_createDay($scope.year, $scope.month, num, $scope.tasksOnDay));
            }

            var weeks = [];
            while (days.length > 7) {
                weeks.push({days: days.splice(0, 7)})
            }

            while (days.length < 7) {
                days.push({number: '', tasks: []});
            }
            weeks.push({days: days});

            $scope.weeks = weeks;
        });
    };

    $scope.selectDay = function(day) {
        if ($scope.selectedDay.number == day.number) {
            $scope.selectedDay = false;
            return;
        }

        if (day.tasks.length > 0) {
            windowService.scrollToBottom();
        }
        $scope.selectedDay = day;
    };

    $scope.selectTask = function(day, task) {
        day.selectedTask = task;
    };

    $scope.getProjectByID = function(projectID) {
        return _.findWhere($scope.projects, {id: projectID});
    };

    $scope.createTask = function() {
        taskData.createTask().then(function (task) {
            $location.path('/tasks/all/' + task.id);
            $route.reload();
        });
    };

    $scope.incrementMonth = function (increment) {
        var month = parseInt($scope.month, 10);
        var year = parseInt($scope.year, 10);

        month += increment;
        if (month > 12) {
            month -= 12;
            year += 1;
        } else if (month < 1) {
            month += 12;
            year -= 1;
        }

        if (month <= 9) {
            month = '0' + month;
        }

        $location.path('/calendar/' + year + '/' + month);
    };


    $scope.refresh();

});
