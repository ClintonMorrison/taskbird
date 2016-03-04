/**
 * Created by clinton on 9/7/2015.
 */
appControllers.controller('AnalyticsCtrl', function ($scope, $q, $timeout, $rootScope, taskAPI, resources, loaderService) {
    window.scope = $scope;

    var _formatPieData = function (title, subtitle, data) {
        return {
            chart: {
                caption: title,
                subcaption: subtitle,
                startingangle: "120",
                showlabels: "0",
                showlegend: "1",
                enablemultislicing: "0",
                slicingdistance: "15",
                showpercentvalues: "1",
                showpercentintooltip: "0",
                plottooltext: "$label : $datavalue",
                theme: "fint"
            },
            data: data
        }
    };

    var _formatBarData = function (title, data, subtitle, yAxisName) {
        return {
            chart: {
                caption: title,
                subcaption: subtitle ? subtitle : '',
                yAxisName: yAxisName ? yAxisName : '',
                theme: "fint",
                rotateLabels: 0,
                rotateValues: 0
            },
            data: data
        }
    };

    var _formatLineGraph = function (title, data, yAxisName) {
        var categories = [];
        var seriesNames = [];
        var dataset = [];

        _.each(data, function (item, name) {
            categories.push({label: name});
        });

        _.each(data[categories[0].label], function (value, seriesName) {
            seriesNames.push(seriesName);
        });

        _.each(seriesNames, function (seriesName) {
            var seriesData = [];
            _.each(data, function (item, key) {
                seriesData.push({value: item[seriesName]});
            });
            dataset.push({seriesname: seriesName, data: seriesData})
        });
        console.log(dataset);


        return {
            chart: {
                "caption": title,
                yAxisName: yAxisName ? yAxisName : '',
                rotateLabels: 0,
                showvalues: "0",
                rotateValues: 0,
                theme: "fint"
            },
            categories: [{
                "category": categories
            }],
            dataset:dataset
        };
    };

    var _inRange = function(start, end, value) {
        return value && value >= start && value <= end;
    };

    $scope.refresh = function () {
        loaderService.begin();

        var start = moment($scope.startDate, 'MM/DD/YYYY').format('YYYY-MM-DD');
        var end = moment($scope.endDate, 'MM/DD/YYYY').format('YYYY-MM-DD');

        var taskPromise =  resources.getAll(resources.Task).then(function (tasks) {
           $scope.allTasks = tasks;
            $scope.tasks = _.filter($scope.allTasks, function (task) {
                var created = false, due = false, done = false;
                if (task.data.date_created) {
                    created = moment(task.data.date_created, 'MM/DD/YYYY').format('YYYY-MM-DD');
                }

                if (task.data.date_due) {
                    due = moment(task.data.date_due, 'MM/DD/YYYY').format('YYYY-MM-DD');
                }

                if (task.data.date_completed) {
                    done = moment(task.data.date_completed, 'MM/DD/YYYY').format('YYYY-MM-DD');
                }

                return _inRange(start, end, created) || _inRange(start, end, due) || _inRange(start, end, done);
            });

            console.log("Filtered tasks: ", $scope.tasks);
        });

        var projectPromise = resources.getAll(resources.Project).then(function (projects) {
           $scope.projects = projects;
        });

        $q.all([taskPromise, projectPromise]).finally(function () {
            var data = {};

            var allTasksByProject = {};
            var doneByProject = [];
            var createdByProject = [];

            // Tasks by date
            var tasksByDate = {};
            var date = start;


            var totalOpen = _.filter($scope.allTasks, function (task) {
                return moment(task.data.date_created, 'MM/DD/YYYY').format('YYYY-MM-DD') < start && !task.data.done;
            }).length;
            var totalDone = 0;
            while (start < end && date != end) {

                var createdOnDay = _.filter($scope.tasks, function (task) {
                   return moment(task.data.date_created, 'MM/DD/YYYY').format('YYYY-MM-DD') == date;
                });

                var doneOnDay = _.filter($scope.tasks, function (task) {
                   return moment(task.data.date_modified, 'MM/DD/YYYY').format('YYYY-MM-DD') == date
                       && task.data.done
                       || moment(task.data.date_completed, 'MM/DD/YYYY').format('YYYY-MM-DD') == date;
                });

                totalOpen = totalOpen + createdOnDay.length;
                totalDone = totalDone + doneOnDay.length;

                tasksByDate[date] = {};
                tasksByDate[date]['Total Tasks'] = totalOpen;
                tasksByDate[date]['Completed Tasks'] = totalDone;

                date = moment(date, 'YYYY-MM-DD').add('days', 1).format('YYYY-MM-DD');
            }

            _.each($scope.projects, function (project) {
                var tasksInProject = _.filter(
                    $scope.tasks,
                    function (task) { return task.data.project && task.data.project.id == project.id}
                );
                var tasksDoneInProject = _.filter(tasksInProject, function (task) { return task.data.done == true; });
                allTasksByProject[project.id] = tasksInProject;

                createdByProject.push({
                    label: project.data.title,
                    value: tasksInProject.length
                });

                doneByProject.push({
                    label: project.data.title,
                    value: tasksDoneInProject.length
                });

            });
            $scope.tasksCreatedByProject = _formatBarData('Tasks created by project', createdByProject, '', 'Tasks');
            $scope.tasksDoneByProject = _formatBarData('Tasks completed by project', doneByProject, '', 'Tasks');

            // Tasks created by day of the week
            var daysOfWeek = {'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0};
            _.each($scope.tasks, function (task) {
                var startDay = moment(task.data.date_created, 'MM/DD/YYYY').format('ddd');
               daysOfWeek[startDay] += 1;
            });
            var taskCreateByDayOfWeek = [];
            _.each(daysOfWeek, function (count, day) {
               taskCreateByDayOfWeek.push({label: day, value: count});
            });
            $scope.tasksCreatedByDayOfWeek = _formatBarData('Tasks created by day of week', taskCreateByDayOfWeek, '', 'Tasks');


            // Tasks completed by day of the week
            var daysOfWeek = {'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0};
            var allDoneTasks = _.filter($scope.tasks, function (task) { return task.data.done == true; });
            _.each(allDoneTasks, function (task) {
                var startDay = moment(task.data.date_modified, 'MM/DD/YYYY').format('ddd');
               daysOfWeek[startDay] += 1;
            });

            var tasksDoneByDayOfWeek = [];
            _.each(daysOfWeek, function (count, day) {
               tasksDoneByDayOfWeek.push({label: day, value: count});
            });

            $scope.tasksDoneByDayOfWeek = _formatBarData('Tasks completed by day of week', tasksDoneByDayOfWeek, '', 'Tasks');
            $scope.tasksByDate = _formatLineGraph('', tasksByDate, 'Tasks');

            loaderService.done();
        });
    };

    $scope.startDate = moment().startOf('month').format('MM/DD/YYYY');
    $scope.endDate = moment().add('days', 1).format('MM/DD/YYYY');
    $scope.refresh();

    $scope.$watch('startDate', function () {
        $scope.refresh();
    });

    $scope.$watch('endDate', function () {
        $scope.refresh();
    });

});
