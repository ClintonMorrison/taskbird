/**
 * Created by clinton on 12/31/2015.
 */

taskApp.service('resources', function($q, taskAPI) {
    var that = this;

    // ---- Resource ---- //
    this.Resource = function (data) {
        this.data = data;
        this.id = data.id;
    };

    this.Resource.prototype.config = {};

    this.Resource.prototype._formatForAPI = function() {
        var fields = this.config.fields;
        var data = {};
        var self = this;
        _.each(fields, function (field, name) {
            var value = self.data[name];
            value = field.type.validate(value);
            value = field.type.formatForAPI(value);
            data[name] = value;
        });

        return data;
    };
    this.Resource.prototype.save = function () {
        console.log("Saving obect!", this);
        return taskAPI.put(
            this.config.endpoint + '/' + this.data.id,
            {},
            this._formatForAPI(),
            true
        ).then(function (response) {

        });
    };

    this.Resource.prototype.delete = function () {
        var self = this;
        console.log("Deleting ID: ", this.data.id);
        return taskAPI.delete(this.config.endpoint + '/' + this.data.id).then(function (response) {
            // Remove cached copies of this object
            if (fetchedResources[self.config.name]) {
                fetchedResources[self.config.name] = _.filter(
                    fetchedResources[self.config.name],
                    function (obj) {
                        return obj.data.id != self.id;
                    }
                );
            }
        }).catch(function () {
            ModalService.alert('Error', 'There was a problem deleting object. Please try again later');
        });
    };

    // ------ Field types ------- ///
    var defaultField =  {
        type: 'default',
        formatForAPI: function (val) {
            return val;
        },
        formatFromAPI: function (val) {
            return val;
        },
        validate: function (val) {
            return val;
        },
        compareTo: function (val1, val2) {
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            }
            return 0;
        }
    };

    var integerField = _.defaults({name: 'integer'}, defaultField);
    var stringField = _.defaults({name: 'string'}, defaultField);
    var textField = _.defaults({name: 'text'}, stringField);
    var booleanField = _.defaults({name: 'boolean'}, defaultField);
    var dateField = _.defaults({
        name: 'date',
        formatFromAPI: function (value) {
            if (!value) {
                return '';
            }
            return moment(value, moment.ISO_8601).format('MM/DD/YYYY');
        },
        formatForAPI: function (value) {
            if (!value) {
                return null;
            }
            return moment(value, 'MM/DD/YYYY').format('YYYY-MM-DD 00:00:00.000000');
        }
    }, defaultField);
    var choiceField = _.defaults({name: 'choice', choices: []}, defaultField);
    var taskPriorityField = _.defaults({
        choices: [
            {icon: 'green circle', label: 'Low',    value: 'Low'},
            {icon: 'black circle', label: 'Normal', value: 'Normal'},
            {icon: 'red circle',   label: 'High',   value: 'High'},
        ]
    }, choiceField);

    var colors = ['black', 'blue', 'green', 'red', 'yellow', 'orange'];

    var icons = [
        'home', 'student', 'suitcase', 'idea', 'lab', 'spy', 'paint brush', 'phone', 'bug',
        'money', 'road', 'taxi', 'cloud', 'world', 'legal', 'rain', 'sun', 'book', 'cube', 'cubes', 'star', 'heart',
        'smile'
    ];

    var colorChoices = [], iconChoices = [];
    _.each(colors, function(color) {
        colorChoices.push({icon: color + ' circle', label: color, value: color});
    });

    _.each(icons, function(icon) {
        iconChoices.push({icon: icon, label: icon, value: icon});
    });

    var iconField = _.defaults({choices: iconChoices}, choiceField);
    var colorField = _.defaults({choices: colorChoices}, choiceField);

    var projectDropdown = _.defaults({name: 'projectDropdown'}, choiceField);

    // ----- Public methods ------ //
    var fetchedResources = {};
    this.getAll = function (type) {
        console.log('REQUEST TO GET ALL', type.prototype.config.name);
        if (!type) {
            throw new Error('No type given.');
        }

        // Return cached copy
        if (fetchedResources[type.prototype.config.name]) {
            console.log('RETURNING CACHED COPY!!!');
            return $q.when(fetchedResources[type.prototype.config.name]);
        }

        // Get all objects
        return taskAPI.get(type.prototype.config.endpoint + '/').then(function (response) {
            var collection = [];
            _.each(response.data.objects, function (obj) {
               collection.push(that._getResourceFromAPI(type, obj));
            });

            fetchedResources[type.prototype.config.name] = collection;
            return collection;
        });
    };

    this.createObject = function (type) {
        var that = this;
        return taskAPI.post(type.prototype.config.endpoint + '/', {}).then(function (response) {
            var newObj = that._getResourceFromAPI(type, response.data);
            // Add to cache
            if (fetchedResources[newObj.config.name]) {
                fetchedResources[newObj.config.name].push(newObj);
            }
            return newObj;
        });
    };

    this.getMap = function (type) {
        return taskAPI.get(type.prototype.config.endpoint + '/').then(function (response) {
            var map = {};
            _.each(response.data.objects, function (obj) {
                map[obj.id] = obj;
            });

            return map;
        });
    };


    this._getResourceFromAPI = function(type, dataFromAPI) {
        var fields = type.prototype.config.fields;
        var data = {};
        _.each(fields, function (field, name) {
            var value = dataFromAPI[name];
            value = field.type.formatFromAPI(value);
            value = field.type.validate(value);
            data[name] = value;
        });
        return new type(data);
    };

    this.getResourceClass = function (name) {
        var map = {
            task: that.Task,
            project: that.Project
        };

        return map[name];
    };


    // ------- Task ------- //
    this.Task =  function (data) {
        that.Resource.call(this, data);
    };

    var _task = {};

    _task.config = {
        name: 'task',
        type: 'task',
        endpoint: 'task',
        fields: {
            id: {label: 'ID', type: integerField},
            title: {label: 'Title', type: stringField},
            description: {label: 'Description', type: textField},
            done: {label: 'Task completed', type: booleanField},
            date_due: {label: 'Due Date', type: dateField},
            date_created: {label: 'Date Created', type: dateField},
            date_modified: {label: 'Date Modified', type: dateField},
            priority: {label: 'Priority', type: taskPriorityField},
            project: {label: 'Project', type: projectDropdown}
        },
        forms: {
            edit: [['title'], ['description'], ['priority', 'date_due'], ['project', 'done']],
            collection: {
                targetDate: 'date_due',
                title: 'title',
                description: 'description'
            }
        },
        display: {
            icon: 'tasks',
            searchableFields: ['title', 'description']
        }
    };

    _task.getBigIcon = function () {
        if (!this.data) {
            return 'black square outline thin';
        }

        var colors = {
            High: 'red',
            Normal: 'black',
            Low: 'green'
        };

        var color = colors[this.data.priority];
        if (this.data.done) {
            return 'checkmark box ' + color;
        }
        return 'square outline thin ' + color;
    };

    _task.getSmallIcon = function () {
        if (this.data && this.data.project && this.data.project.icon) {
            return this.data.project.icon + ' ' + this.data.project.color;
        }
        return '';
    };

    this.Task.prototype = _.create(this.Resource.prototype, _task);

    // ------- Project ------- //
    this.Project =  function (data) {
        that.Resource.call(this, data);
    };

    var _project = {};

    _project.config = {
        name: 'project',
        type: 'project',
        endpoint: 'project',
        fields: {
            id: {label: 'ID', type: integerField, editable: false},
            title: {label: 'Title', type: stringField},
            icon: {label: 'Icon', type: iconField},
            color: {label: 'Color', type: colorField},
            date_created: {label: 'Date Created', type: dateField, editable: false}
        },
        forms: {
            edit: [['title'], ['icon', 'color']],
            collection: {
                targetDate: '',
                title: 'title',
                description: ''
            }
        },
        display: {
            icon: 'list layout'
        }
    };

    _project.getBigIcon = function () {
        return this.data.icon + ' ' + this.data.color;

    }
    this.Project.prototype = _.create(this.Resource.prototype, _project);
});

