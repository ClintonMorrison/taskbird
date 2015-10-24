
appControllers.controller('TasksCtrl', function ($scope, $timeout, $routeParams, $http, taskAPI, taskData, projectData) {
    window.scope = $scope;

	$scope.refresh = function(firstLoad) {
        firstLoad = true;

        // Get tasks
        taskData.getTasks().then(function (tasks) {
            $scope.tasks = tasks;

            // Get projects
            projectData.getProjects().then(function (projects) {
                $scope.projects = projects;
                projectData.getProjectMap().then(function (projectMap) {
                    $scope.projectMap = projectMap;
                });
            });
        });
    };

    $scope.refresh(true);
});
