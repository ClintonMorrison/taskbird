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
                task.date_due = moment(task.date_due, moment.ISO_8601).format('MM/DD/YYYY');
            }

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
        };

        console.log("Submitting data: ", taskData);


        return taskAPI.post("task/", taskData).then(function (response) {
            var task = response.data;
            console.log("Got task: ", task);
            tasks.push(task);
            return task;
        });
    };

    this.saveTask = function (task) {

        return projectData.getProjectMap().then(function (projectMap) {
            var taskData = {
                title: task.title,
                priority: task.priority,
                description: task.description,
                project: task.project ? task.project : null
            };

            if (task.date_due) {
                taskData.date_due = moment(task.date_due, 'MM-DD-YYYY').format('YYYY-MM-DD') + "T00:00:00.000000";
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