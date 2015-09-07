/**
 * Created by clinton on 9/6/2015.
 */

taskApp.service('taskData', function($q, taskAPI, projectData) {
    var self = this;
    window.taskData = this;

    var tasks = [];

    var taskPromise = taskAPI.getTasks().then(function (response) {
        tasks = response.data.objects;

        // Format task dates
        _.each(tasks, function(task) {
            if (task.date_due) {
                task.date_due = moment(task.date_due).format('MM/DD/YYYY');
            }

            task.projectID = (task.projects.length > 0) ? task.projects[0].id : false;
        });
        return tasks;
    });

    this.getTasks = function () {
        return taskPromise;
    };

    this.getTask = function (id) {
        return taskPromise.then(function (tasks) {
            return _(tasks).filter({id: id}).first();
        });
    };

    this.createTask = function (data) {
        var taskData = {
            title: 'New Task',
            description: '',
            projects: []
        };


        if (data && data.projectID && data.projectID !== 'all') {
            taskData.projects = [data.projectID];
        }

        return taskAPI.post("task/", taskData).then(function (response) {
            var task = response.data;

            if (data && data.projectID && data.projectID !== 'all') {
                task.projectID = data.projectID; //($scope.filterProject === 'all') ? false : ""+$scope.filterProject;
            } else {
                task.projectID = false;
            }
            tasks.push(task);
            return task;
        });
    };

    this.saveTask = function (task) {

        return projectData.getProjectMap().then(function (projectMap) {
            var taskData = {
                title: task.title,
                priority: task.priority,
                description: task.description
            };

            if (task.date_due) {
                taskData.date_due = task.date_due.replace(/\//g, '-') + "T00:00:00.000000";
            }

            if (task.projectID) {
                taskData.projects = [projectMap[task.projectID]];
            } else {
                taskData.projects = [];
            }

            return taskAPI.put('task/' + task.id, {}, taskData, true).then(function (response) {
                return response.data;
            });
        });
    };

    this.deleteTask = function (task) {
        return taskAPI.delete('task/' + task.id).then(function (data) {
            _.remove(tasks, {id: task.id});
        });
    };

});