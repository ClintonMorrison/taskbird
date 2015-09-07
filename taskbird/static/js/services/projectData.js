/**
 * Created by clinton on 9/6/2015.
 */

taskApp.service('projectData', function($q, taskAPI) {
    var self = this;
    window.projectData = this;

    var projects = [];
    var projectMap = {};

    var projectPromise = taskAPI.get('project/').then(function (response) {
        projects = response.data.objects;
        return projects;
    });

    var projectMapPromise = projectPromise.then(function (projects) {
        _.each(projects, function (project) {
            projectMap[project.id] = project;
        });
        return projectMap;
    });

    this.getProjects = function () {
        return projectPromise;
    };

    this.getProjectMap = function () {
        return projectMapPromise;
    };

    this.getProject = function (id) {
        return projectPromise.then(function (projects) {
            return _(projects).filter({id: id}).first();
        });
    };

    this.createProject = function (projectData) {
        projectData = (projectData) ? projectData : {};
        if (!projectData.title) {
            projectData.title = 'New Project';
        }

        return taskAPI.post("project/", {}, projectData).then(function (response) {
            var project = response.data;
            projects.push(project);
            return project;
        });
    };

    this.saveProject = function (project) {
        return taskAPI.put('project/' + project.id, {}, project, true).then(function (response) {
            var project = response.data;
            return project;
        });
    };

    this.deleteProject = function (project) {
        return taskAPI.delete("project/" + project.id).then(function (response) {
            _.remove(projects, {id: project.id});
            return projects;
        });
    }

});