/**
 * Created by clinton on 12/31/2015.
 */
taskApp.directive('objectEditor', function () {
    return {
        restrict: "E",
        replace: 'true',
        templateUrl: TaskBirdData.staticURL + 'directives/objectEditor.html',
        scope: {
            object: '=',
            postUpdateCallback: '='
        },
        link: function ($scope, elm, attr) {
            $scope.save = _.debounce(function () {
                $scope.object.save();
            }, 500);

            $scope.$watch('object', function (newValue, oldValue) {
                if (!newValue || !oldValue || newValue.id !== oldValue.id || _.isEqual(newValue, oldValue)) {
                    return;
                }
                $scope.save();
            }, true);
        }

    };
});