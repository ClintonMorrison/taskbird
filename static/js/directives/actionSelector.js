/**
 * Created by clinton on 1/14/2016.
 */
taskApp.directive('actionSelector', function () {
    return {
        restrict: "E",
        replace: 'true',
        templateUrl: TaskBirdData.staticURL + 'directives/actionSelector.html',
        scope: {
            actions: '=', // Has keys: title, name, icon, callback
            color: '@'
        },
        link: function ($scope, elm, attr) {
            if ($scope.actions && $scope.actions.length > 0) {
                $scope.selectedName = $scope.actions[0].name;
            }

            $scope.actionMap = {};
            _.each($scope.actions, function (action) {
               $scope.actionMap[action.name] = action;
            });

        }

    };
});