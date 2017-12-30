/**
 * Created by clinton on 1/10/2016.
 */
taskApp.directive('collectionView', function ($timeout, taskAPI, $location, windowService, $q, resources) {
    return {
        restrict: "E",
        replace: 'true',
        templateUrl: TaskBirdData.staticURL + 'directives/collectionView.html',
        scope: {
            filters: '=',
            resources: '@',
            collectionAPI: '='
        },
        link: function ($scope, elm, attr) {
            window.filters = $scope.filters;
            if (!$scope.resources) {
                throw new Error('resources attribute required');
            }
            $scope.resourceNames = $scope.resources.split(',');

            // Set filters to default value
            $timeout(function () {
                if (!$scope.filters.dateRange) {
                    $scope.filters.dateRange = 'all';
                }

                if (!$scope.filters.sortBy) {
                    $scope.filters.sortBy = 'targetDate';
                }
            }, 0);

            $scope.refresh = function () {
                alreadyRefreshed = true;
                $scope.collection = [];
                window.collection = $scope.collection;
                $scope.selectedObject = false;

                _.each($scope.resourceNames, function (resourceName) {
                    var resource = resources.getResourceClass(resourceName);
                    resources.getAll(resource).then(function (objects) {
                        _.each(objects, function (obj) {
                            $scope.collection.push(obj);
                        });
                    });
                });

                resources.getAll(resources.Project).then(function (projects) {
                   $scope.projects = projects;
                });
            };

            $scope.createActions = [];
            _.each($scope.resourceNames, function (resourceName) {
                var resource = resources.getResourceClass(resourceName);
                var name = _.upperFirst(resourceName);
                $scope.createActions.push({
                    title: 'New ' + name,
                    name: name,
                    icon: resource.prototype.config.display.icon,
                    callback: function () {
                        resources.createObject(resource, $scope.filters).then(function (obj) {
                            $scope.collection.push(obj);
                            $scope.selectObject(obj);
                        });
                    }
                });
            });

            $scope.selectObject = function (obj) {
                if ($scope.selectedObject && $scope.selectedObject.data.id === obj.data.id) {
                    window.selected = null;
                    $scope.selectedObject = false;
                    return;
                }

                $scope.selectedObject = obj;
                window.selected = obj;
                windowService.scrollToElement('.ui.details.column');
            };

            $scope.deleteObject = function (obj) {
                if (!obj) {
                    return;
                }
                obj.delete().then(function () {
                   $scope.refresh();
                });
            };

            $scope.refresh();
        }
    };
});