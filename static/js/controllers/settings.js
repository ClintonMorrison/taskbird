/**
 * Created by clinton on 9/7/2015.
 */
appControllers.controller('SettingsCtrl', function ($scope, taskData, resources) {

    resources.getAll(resources.Task).then(function (tasks) {
        console.log(tasks);
        window.tasks = tasks;
        //$scope.task = tasks[0];
    });

    $scope.filters = {
        resources: ['task']
    };

    $scope.testActions = [
        {title: 'New Task', name: 'Task', icon: 'circle', callback: function () {console.log('test1');}},
        {title: 'New Note', name: 'Note', icon: 'square', callback: function () {console.log('test2');}}
    ];

    resources.getAll(resources.Project).then(function (projects) {
       console.log("ALL PROJECTS:", projects);
        $scope.task = projects[0];
        window.projects = projects;
    });
    var last = false;
    $scope.testClick = function () {


        if (last) {
            $scope.task = tasks[0];
        } else {
            $scope.task = projects[0];
        }
        last =! last;
    };

    /*var tasks = taskData.getTasks().then(function (tasks) {
       $scope.task = tasks[0];
    });*/
});