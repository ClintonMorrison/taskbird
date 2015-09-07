appControllers.controller('ProjectsCtrl', function ($scope, taskAPI, projectData) {

    $scope.colors = ['black', 'blue', 'green', 'red', 'yellow', 'orange'];

    $scope.icons = [
        'home', 'student', 'suitcase', 'idea', 'lab', 'spy', 'paint brush', 'phone', 'bug',
        'money', 'road', 'taxi', 'cloud', 'world', 'legal', 'rain', 'sun', 'book', 'cube', 'cubes', 'star', 'heart',
        'smile'
    ];

	$scope.listOrderBy = "titled";
    $scope.selectedProject = false;
    $scope.$watch('selectedProject', function(newValue, oldValue) {
        if (newValue === false || oldValue === false || newValue.id !== oldValue.id || _.isEqual(newValue, oldValue)) {
            return;
        }

        $scope.saveProject(newValue);
    }, true);

    $scope.refresh = function() {
        projectData.getProjects().then(function (projects) {
            $scope.projects = projects;
        });
    };

    $scope.selectProject = function(project) {
        if ($scope.selectedProject && $scope.selectedProject.id === project.id) {
            $scope.selectedProject = false;
        } else {
            $scope.selectedProject = project;
        }
    };

    var _submitProject = function (project) {
        console.log("Saving project #" + project.id,  project);

        projectData.saveProject(project).then(
            function () {},
            function () {
                ModalService.alert(
                    "Error",
                    "There was a problem saving the project"
                );
            }
        );
    };

    $scope.saveProject = _.debounce(_submitProject, 750);

    $scope.createProject = function () {
        projectData.createProject().then(function (project) {
           $scope.selectProject(project);
        });
    };

    $scope.deleteProject = function(project) {
        var deleteModalCallback = function(approved) {
            if (approved) {
                projectData.deleteProject(project);
            }
        };

        ModalService.confirm(
			'Delete project',
			'Are you sure you want to delete the project "' + project.title + '"?',
			deleteModalCallback
		);
    };

    $scope.refresh();
});

