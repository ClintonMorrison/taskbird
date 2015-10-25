/**
 * Created by clinton on 9/7/2015.
 */
appControllers.controller('AnalyticsCtrl', function ($scope, $q, $timeout, $rootScope, taskAPI, taskData, projectData, loaderService) {
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

        var taskPromise = taskData.getTasks().then(function (tasks) {
           $scope.allTasks = tasks;

            $scope.tasks = _.filter($scope.allTasks, function (task) {
                var created = false, due = false, done = false;
                if (task.date_created) {
                    created = moment(task.date_created).format('YYYY-MM-DD');
                }

                if (task.date_due) {
                    due = moment(task.date_due).format('YYYY-MM-DD');
                }

                if (task.date_completed) {
                    done = moment(task.date_completed).format('YYYY-MM-DD');
                }

                return _inRange(start, end, created) || _inRange(start, end, due) || _inRange(start, end, done);
            });

        });

        var projectPromise = projectData.getProjects().then(function (projects) {
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
                return moment(task.date_created).format('YYYY-MM-DD') < start && !task.done;
            }).length;
            var totalDone = 0;
            while (start < end && date != end) {

                var createdOnDay = _.filter($scope.tasks, function (task) {
                   return moment(task.date_created).format('YYYY-MM-DD') == date;
                });

                var doneOnDay = _.filter($scope.tasks, function (task) {
                   return moment(task.date_modified).format('YYYY-MM-DD') == date && task.done || moment(task.date_completed).format('YYYY-MM-DD') == date;
                });

                totalOpen = totalOpen + createdOnDay.length;
                totalDone = totalDone + doneOnDay.length;

                tasksByDate[date] = {};
                tasksByDate[date]['Total Tasks'] = totalOpen;
                tasksByDate[date]['Completed Tasks'] = totalDone;

                date = moment(date, 'YYYY-MM-DD').add('days', 1).format('YYYY-MM-DD');
            }
            console.log(tasksByDate);
            _.each($scope.projects, function (project) {
                var tasksInProject = _.filter(
                    $scope.tasks,
                    function (task) { return task.project && task.project.id == project.id}
                );
                var tasksDoneInProject = _.filter(tasksInProject, {done: true});
                allTasksByProject[project.id] = tasksInProject;

                createdByProject.push({
                    label: project.title,
                    value: tasksInProject.length
                });

                doneByProject.push({
                    label: project.title,
                    value: tasksDoneInProject.length
                });

            });
            $scope.tasksCreatedByProject = _formatBarData('Tasks created by project', createdByProject, '', 'Tasks');
            $scope.tasksDoneByProject = _formatBarData('Tasks completed by project', doneByProject, '', 'Tasks');

            // Tasks created by day of the week
            var daysOfWeek = {'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0};
            _.each($scope.tasks, function (task) {
                var startDay = moment(task.date_created).format('ddd');
               daysOfWeek[startDay] += 1;
            });
            var taskCreateByDayOfWeek = [];
            _.each(daysOfWeek, function (count, day) {
               taskCreateByDayOfWeek.push({label: day, value: count});
            });
            $scope.tasksCreatedByDayOfWeek = _formatBarData('Tasks created by day of week', taskCreateByDayOfWeek, '', 'Tasks');


            // Tasks completed by day of the week
            var daysOfWeek = {'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0};
            var allDoneTasks = _.filter($scope.tasks, {done: true});
            _.each(allDoneTasks, function (task) {
                var startDay = moment(task.date_modified).format('ddd');
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
    $scope.endDate = moment().endOf('month').format('MM/DD/YYYY');
    $scope.refresh();

    $scope.$watch('startDate', function () {
        $scope.refresh();
    });

    $scope.$watch('endDate', function () {
        $scope.refresh();
    });

});
