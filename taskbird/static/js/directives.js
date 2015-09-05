
taskApp.directive('dropdown', function ($timeout) {
    return {
        restrict: "C",
        scope: {
            ngModel: '=',
            ngChange: '@',
            placeholder: '@'
        },
        link: function (scope, elm, attr) {
            elm.dropdown('save defaults')
            scope.$watch('ngModel', function(newValue, oldValue) {
                console.log(scope.ngModel);
                if (newValue === oldValue) {
                    return;
                }

                elm.dropdown('set selected', scope.ngModel);
            });


            elm.dropdown().dropdown('setting', {
                onChange: function (value) {
                    $timeout(function () {
                        scope.ngModel = value;
                        scope.$parent.$apply();
                    });
                }
            });
        }
    };
});



taskApp.directive('taskDatepicker', function () {
    return {
        restrict: "E",
        replace: 'true',
        template: "<input class='datepicker' type='text' >",
        link: function (scope, elm, attr) {
            $(elm).datepicker();
        }
    };
});

taskApp.directive('taskCheckbox', function ($timeout) {
    return {
        restrict: "E",
        replace: 'true',
        scope: {
            ngModel: '=',
            label: '@'
        },
        template: [
            '<div class="ui checkbox">',
            '<input type="checkbox" ng-model="ngModel">',
            '<label>{{label}}</label>',
            '</div>'
        ].join(''),
        link: function (scope, elm, attr) {
            scope.$watch('ngModel', function(newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                elm.checkbox('set ' + (scope.ngModel ? 'checked' : 'unchecked'));
            });
            elm.checkbox().checkbox('setting', {
               onChecked: function () {
                   $timeout(function () {
                        scope.ngModel = true;
                        scope.$parent.$apply();
                    });
               }, onUnchecked: function () {
                    $timeout(function () {
                        scope.ngModel = false;
                        scope.$parent.$apply();
                    });
                }
            });
        }
    };
});