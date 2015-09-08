/**
 * Created by clinton on 9/7/2015.
 */
appControllers.controller('AnalyticsCtrl', function ($scope, $q, $timeout, taskAPI, taskData, projectData) {
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

    $scope.refresh = function () {

        $scope.startDate = moment().startOf('month').format('MM/DD/YYYY');
        $scope.endDate = moment().endOf('month').format('MM/DD/YYYY');

        var taskPromise = taskData.getTasks().then(function (tasks) {
           $scope.tasks = tasks;
        });

        var projectPromise = projectData.getProjects().then(function (projects) {
           $scope.projects = projects;
        });

        $q.all([taskPromise, projectPromise]).finally(function () {
            var data = {};

            var allTasksByProject = {};
            var doneByProject = [];
            var createdByProject = [];
            var completionByProject = [];
            var turnaroundByProject = [];


            _.each($scope.projects, function (project) {
                var tasksInProject = _.filter($scope.tasks, {projectID: project.id});
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

                completionByProject.push({
                    label: project.title,
                    value: _.round(tasksDoneInProject.length / tasksInProject.length, 2)
                });

                turnaroundByProject.push({
                    label: project.title,
                    value: _.round(_.chain(tasksDoneInProject).sum(function (task) {
                        var dateCreated = moment(task.date_created);
                        var dateComplete = moment(task.date_modified); // task.date_completed

                        var duration = moment.duration(dateComplete.diff(dateCreated));
                        var days = duration.asDays();
                        return days;
                    }).value() / tasksDoneInProject.length, 2)
                });
            });
            $scope.tasksCreatedByProject = _formatBarData('Tasks created by project', createdByProject, '', 'Tasks');
            $scope.tasksDoneByProject = _formatBarData('Tasks completed by project', doneByProject, '', 'Tasks');
            $scope.taskCompletionByProject = _formatBarData('Project Completion', completionByProject, '', '% of tasks complete');
            $scope.taskTurnaroundByProject = _formatBarData('Task turnaround time by project', turnaroundByProject, '', 'Days');


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
            console.log('hi');
            var tasksDoneByDayOfWeek = [];
            _.each(daysOfWeek, function (count, day) {
               tasksDoneByDayOfWeek.push({label: day, value: count});
            });
            console.log(tasksDoneByDayOfWeek);
            $scope.tasksDoneByDayOfWeek = _formatBarData('Tasks completed by day of week', tasksDoneByDayOfWeek, '', 'Tasks');


        });
    };

    $scope.refresh();

});
