/**
 * This service contains methods for accessing the API
 * @author Clinton Morrison
 */

var taskAPI = angular.module('taskAPI', []);

taskApp.service('taskAPI', ['$http', function($http) {
  var self = this;
  window.api = this;
  console.log($http.defaults.headers);
  $http.defaults.headers.common['X-CSRFToken'] = jQuery('[name="csrfmiddlewaretoken"]').val();
  $http.defaults.headers.post['Content-Type'] = "application/json";
  $http.defaults.headers.put['Content-Type'] = "application/json";

  this._getBaseUrl = function() {
    return  "http://127.0.0.1:8000/api/";
  };

  this.defaultParams = {
    format: 'json'
  };

  this.request = function(method, path, params, data) {
    if (!path) {
      method = "";
    }

    if (!params) {
      params = {};
    }

    if (!data) {
      data = {};
    }

    return $http({
      method: method,
      url: self._getBaseUrl() + path,
      params: $.extend({}, self.defaultParams, params),
      data: data
    });
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

  this.createTask = function(title, description, dateDue, metadata) {
	var postData = {
	  'title':       title,
	  'description': description,
	//  'dateDue':     dateDue,
	//  'metadata':    JSON.stringify(metadata)
	};
	console.log("POST DATA:", postData);
	return $http.post(this._getBaseUrl()+"?q=task", postData);
  }
}]);


