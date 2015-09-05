appControllers.controller('ProjectsCtrl', function ($scope, taskAPI) {

    $scope.colors = ['black', 'blue', 'green', 'red', 'yellow', 'orange'];

    $scope.icons = [
        'home', 'student', 'suitcase', 'idea', 'lab', 'spy', 'paint brush', 'phone', 'bug',
        'money', 'road', 'taxi', 'cloud', 'world', 'legal', 'rain', 'sun', 'book', 'cube', 'cubes', 'star', 'heart',
        'smile'
    ];

	$scope.listOrderBy = "titled";
    $scope.selectedProject = false;
    $scope.$watch('selectedProject', function(newValue, oldValue) {
        if (newValue === false || oldValue === false) {
            return;
        }

        if (newValue.id !== oldValue.id) {
            return;
        }

        if (_.isEqual(newValue, oldValue)) {
            return;
        }

        $scope.saveProject(newValue);
    }, true);

    $scope.refresh = function() {
        taskAPI.get('project').then(function (response) {
            $scope.projects = response.data.objects;

            _.each($scope.projects, function(project) {
               //project.icon = "cube";
               //project.color = "black";
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

    var _submitProject = function (project) {
        console.log("Saving project #" + project.id,  project);

        var projectPromise;
        if (!project.id) {
            projectPromise = taskAPI.post("project/", {}, project, true);
        } else {
            projectPromise = taskAPI.put('project/' + project.id, {}, project, true);
        }

        projectPromise.then(
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
        var projectData = {
            title: 'New Project'
        };

        taskAPI.post("project/", projectData).then(function (response) {
            console.log("Created task: ", response.data);
            $scope.projects.push(response.data);
            $scope.selectProject(_.last($scope.projects));
        });
    };

    $scope.deleteProject = function(project) {
        var deleteModalCallback = function(approved) {
            taskAPI.delete("project/" + project.id).then(function (response) {
                $scope.refresh();
            });
        };

        ModalService.confirm(
			'Delete project',
			'Are you sure you want to delete the project "' + project.title + '"?',
			deleteModalCallback
		);
    };

    $scope.refresh();
});

