/**
* This service contains methods for accessing the API
* @author Clinton Morrison
*/

var taskAPI = angular.module('taskAPI', []);

// Shim for location.origin
if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

taskApp.service('taskAPI', ['$http', 'loaderService', function($http, loaderService) {
    var self = this;
    window.api = this;

    $http.defaults.headers.common['X-CSRFToken'] = jQuery('[name="csrfmiddlewaretoken"]').val();
    $http.defaults.headers.post['Content-Type'] = "application/json";
    $http.defaults.headers.put['Content-Type'] = "application/json";

    this._getBaseUrl = function() {
        return  location.origin + "/api/";
    };

    this.defaultParams = {
        format: 'json'
    };

    this.request = function(method, path, params, data) {
        loaderService.begin();

        if (!path) {
            method = "";
        }

        if (!params) {
            params = {};
        }

        if (!data) {
            data = {};
        }

        var requestPromise = $http({
            method: method,
            url: self._getBaseUrl() + path,
            params: $.extend({}, self.defaultParams, params),
            data: data
        });

        requestPromise.finally(function () {
           loaderService.done();
        });

        return requestPromise;
    };

    this.get = function(path, params) {
        return self.request('GET', path, params);
    };

    this.post = function(path, params, data) {
        return self.request('POST', path, params, data);
    };

    this.put = function(path, params, data) {
        return self.request('PUT', path, params, data);
    };

    this.delete = function(path, params) {
        return self.request('DELETE', path, params);
    };

    this.getTask = function(id) {
        return $http.get('task');
    };

    this.getTasks = function() {
        return self.request('GET', 'task');
    };

}]);


