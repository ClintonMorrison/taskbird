/**
 * Created by clinton on 9/6/2015.
 */

taskApp.service('taskData', function($q, taskAPI, projectData) {
    var that = this;
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

        var newTask = false;
        return taskAPI.post("task/", taskData).then(function (response) {
            newTask = response.data;
            tasks.push(newTask);
            return newTask;
        }).then(function (task) {
            // Update fields that aren't set on creation
            if (data.date_due) {
                task.date_due = moment(data.date_due, 'YYYY-MM-DD').format('MM-DD-YYYY');
            }

            return that.saveTask(task);
        }).then(function (task) {
            newTask = task;
            return newTask;
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
                var dateDue = moment(task.date_due, 'MM-DD-YYYY').format('YYYY-MM-DD');
                if (dateDue === 'Invalid date') {
                    dateDue = task.date_due;
                } else {
                    dateDue += "T00:00:00.000000";
                }

                taskData.date_due = dateDue;
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