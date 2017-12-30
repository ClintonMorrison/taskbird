/**
* This service contains methods for accessing the API
* @author Clinton Morrison
*/

var loaderService = angular.module('loaderService', []);

taskApp.service('loaderService', [function() {
    var loadingTasks = 0;

    var _updateLoader = function () {
        if (loadingTasks > 0) {
            $('#loader-main').addClass('active');
        } else {
            $('#loader-main').removeClass('active');
        }
    }

    this.begin = function() {
        loadingTasks += 1;
        _updateLoader();
    };

    this.done = function() {
        loadingTasks -= 1;
        _updateLoader();
    };

}]);


