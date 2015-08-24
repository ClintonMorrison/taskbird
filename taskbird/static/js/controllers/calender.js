appControllers.controller('CalendarCtrl', function($scope, taskAPI) {

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
        $scope.currentDate = moment().format("MMMM D, YYYY");

        taskAPI.get('task').then(function (taskData) { // todo: get only for currently month
            $scope.tasks = taskData.data.objects;
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

            console.log($scope.tasksOnDay);

            var startDayOfWeek = (moment().startOf('month').format('d') + 1) % 7;
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
        console.log("Selecting: ", day)
        if ($scope.selectedDay.number == day.number) {
            $scope.selectedDay = false;
            return;
        }

        $scope.selectedDay = day;
    }

    $scope.selectTask = function(day, task) {
        day.selectedTask = task;
    }


    $scope.refresh();

});
