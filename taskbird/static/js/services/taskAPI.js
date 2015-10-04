/**
* This service contains methods for accessing the API
* @author Clinton Morrison
*/

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

    this.request = function(method, path, params, data, suppressLoader) {
        if (!path) {
            method = "";
        }

        if (!params) {
            params = {};
        }

        if (!data) {
            data = {};
        }

        if (!suppressLoader) {
            loaderService.begin();
        }


        var requestPromise = $http({
            method: method,
            url: self._getBaseUrl() + path,
            params: $.extend({}, self.defaultParams, params),
            data: data
        });

        requestPromise.finally(function () {
            if (!suppressLoader) {
                loaderService.done();
            }
        });

        return requestPromise;
    };

    this.get = function(path, params, options) {
        return self.request('GET', path, params, options);
    };

    this.post = function(path, params, data, options) {
        return self.request('POST', path, params, data, options);
    };

    this.put = function(path, params, data, options) {
        return self.request('PUT', path, params, data, options);
    };

    this.delete = function(path, params, options) {
        return self.request('DELETE', path, params, options);
    };

    this.getTasks = function() {
        return self.request('GET', 'task');
    };

}]);


