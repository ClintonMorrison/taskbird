appControllers.controller('CalendarCtrl', function($scope, $route, $timeout, $routeParams, $location, taskAPI, taskData) {

    /*
    $scope.days = {
        sun: 'Sunday',
        mon: 'Monday',
        tue: 'Tuesday',
        wed: 'Wednesday',
        thu: 'Thursday',
        fri: 'Friday',
        sat: 'Saturday'
    };
    */
    window.$scope = $scope;
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


    var _createDay = function(number, tasksOnDay) {
        var day = {};
        if (tasksOnDay[number]) {
            day = {number: number, tasks: tasksOnDay[number]};
        } else {
            day = {number: number, tasks: []};
        }

        if (day.tasks.length > 0) {
            day.selectedTask = day.tasks[0];
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

        $scope.currentDate = moment().format("MMMM D, YYYY");

        // todo: get only for currently month
        taskData.getTasks().then(function (tasks) {
            $scope.tasks = tasks;
            $scope.tasksOnDay = {};

            _.each($scope.tasks, function (task) {
                if (task.date_due) {
                    var day = moment(task.date_due).format('D');
                    if (!$scope.tasksOnDay[day]) {
                        $scope.tasksOnDay[day] = [];
                    }
                    $scope.tasksOnDay[day].push(task);
                }
            });

            var startDayOfWeek = (moment().startOf('month').format('d')) % 7;
            var lastDayOfMonth = moment().endOf('month').format('DD');
            var num = 1;
            var days = [];

            while (startDayOfWeek > 0) {
                days.push({number: '', tasks: []});
                startDayOfWeek -= 1;
            }

            for (num = 1; num <= lastDayOfMonth; num++) {
                days.push(_createDay(num, $scope.tasksOnDay));
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


    $scope.refresh();

});
