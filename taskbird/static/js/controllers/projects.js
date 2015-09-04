appControllers.controller('ProjectsCtrl', function ($scope, taskAPI) {

    $scope.colors = ['black', 'blue', 'green', 'red', 'yellow', 'orange'];

    $scope.icons = [
        'home', 'student', 'suitcase', 'idea', 'lab', 'spy', 'paint brush', 'phone', 'bug',
        'money', 'road', 'taxi', 'cloud', 'world', 'legal', 'rain', 'sun', 'book', 'cube', 'cubes', 'star', 'heart',
        'smile'
    ];

	$scope.listOrderBy = "titled";
    $scope.selectedProject = false;

    $scope.refresh = function() {
        taskAPI.get('project').then(function (response) {
            $scope.projects = response.data.objects;
            console.log($scope.projects);

            _.each($scope.projects, function(project) {
               project.icon = "cube";
               project.color = "black";
            });
        });
    };

    $scope.selectProject = function(project) {
        if ($scope.selectedProject && $scope.selectedProject.id === project.id) {
            $scope.selectedProject = false;
        } else {
            $scope.selectedProject = project;
        }
    }

    $scope.refresh();
});

