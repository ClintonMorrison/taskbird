
taskApp.directive('dropdown', function ($timeout) {
    return {
        restrict: "E",
        scope: {
            ngModel: '=',
            ngChange: '@',
            placeholder: '@'
        },
        link: function (scope, elm, attr) {
            elm.dropdown('save defaults')
            scope.$watch('ngModel', function(newValue, oldValue) {
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

taskApp.directive('projectSelector', function ($timeout) {
    return {
        restrict: "E",
        replace: 'true',
        template: [
            //'<label>Project</label>',
            '<div class="ui fluid search selection dropdown">',
            '<input type="hidden">',
            '<i class="dropdown icon"></i>',
            '<div class="default text">Select Project</div>',
            '<div class="menu">',
            '<div class="item" data-value="false">Select Project</div>',
            '<div class="item" ng-repeat="project in projects" data-value="{{project.id}}">',
            '<i class="{{project.color}} {{project.icon}} icon"></i>',
            '{{project.title}}',
            '</div>',
            '</div>',
            '</div>'
        ].join('\n'),
        scope: {
            ngModel: '=',
            projects: '='
        },
        link: function (scope, elm, attr) {
            window.t1 = attr;
            window.t2 = scope;
            elm.dropdown('save defaults')
            scope.$watch('ngModel', function(newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                elm.dropdown('set selected', scope.ngModel ? scope.ngModel.id : false);
            });

            elm.dropdown().dropdown('setting', {
                onChange: function (value) {
                    $timeout(function () {
                        //console.log(_.chain(scope.projects).filter({id : value}).first().value());
                        scope.ngModel = _.chain(scope.projects).filter({id : value}).first().value();
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