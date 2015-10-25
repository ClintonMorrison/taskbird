
appControllers.controller('TasksCtrl', function ($scope, $timeout, $routeParams, $http, taskAPI, taskData, projectData) {
    window.scope = $scope;
    $scope.filterProject = 'all';



	$scope.refresh = function(firstLoad) {
        firstLoad = true;

        // Get tasks
        taskData.getTasks().then(function (tasks) {
            $scope.tasks = tasks;

            // Get projects
            projectData.getProjects().then(function (projects) {
                $scope.projects = projects;6
                projectData.getProjectMap().then(function (projectMap) {
                    $scope.projectMap = projectMap;
                    if ($routeParams.projectID && parseInt($routeParams.projectID, 10)) {
                        $timeout(function () {
                           $scope.filterProject = $routeParams.projectID;
                        })

                    }
                });
            });
        });
    };



    $scope.refresh(true);
});
