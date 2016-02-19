taskApp.filter('nl2br', function() {
  return function(input) {
    return _.escape(input).replace(/\n/g, '<br/>');
  };
});

taskApp.filter('preview', function () {
    return function(input, maxLength) {

        if (!maxLength || input.length < maxLength) {
            return input;
        }

        if (maxLength <= 3) {
            return "...";
        }

        return input.substr(0, maxLength - 3) + "...";
    };
});

taskApp.filter('top', function () {
    return function(input, maxLength) {
        return _.take(input, maxLength);
    };
});


taskApp.filter('toNumericDate', function() {
  return function(input) {
    return moment(input).format("MM/DD/YYYY");
  };
});

taskApp.filter('toEnglishDate', function() {
  return function(input) {
      var result = moment(input).format("MMM D");
      // TODO: Use 'MMM D, YYYY' if not current year?
      return result === 'Invalid date' ? '' : result
  };
});

taskApp.filter('withProjectID', function() {
  return function(input, projectID) {
      if (!projectID || projectID === 'all') {
          return input;
      }

      var results = [];

      _.each(input, function (task) {
          if (task.project && task.project.id == projectID) {
              results.push(task);
          }
      });

      return results; //_.filter(input, {projectID: parseInt(projectID)});
  };
});

/**
 * Taken from https://gist.github.com/paulakreuger/b2af1958f3d67f46447e
 * @author paulakreuger @ https://github.com/paulakreuger
 */
taskApp.filter('capitalize', function() {
  return function(input, scope) {
    if (!input) {
        return '';
    }

    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});


taskApp.filter('filterOutDone', function() {
  return function(input, showDoneTasks) {
      if (showDoneTasks) {
          return input;
      }

      return _.filter(input, {done: false});
  }
});

taskApp.filter('orderByDate', function() {
  return function(input, sortField, reverse) {
      return _.sortBy(input, function (element) {
          return moment(element[sortField]).unix();
      });
  }
});

taskApp.filter('toTrusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
}]);

taskApp.filter('applyResourceFilters', ['resources', function(resources) {
    var _getDateRange = function (str) {
        if (!str || str === 'all') {
            return null;
        }
        var start, end, format = 'YYYY-MM-DD\\Thh:mm:ss';
        var parts = str.split(':')
        if (parts[0] === 'this') {
            start = moment().startOf(parts[1]);
            end = moment().endOf(parts[1]);
        } else if (parts[0] === 'days') {
            start = moment().startOf('day');
            if (parts[1] === '+') {
                end = moment().add(parseInt(parts[2], 10), 'days').endOf('day');
            } else {
                end = moment().subtract(parseInt(parts[2], 10), 'days').endOf('day');
            }
        } else if (parts[0] === 'date') {
            start = moment(parts[1], 'YYYY-MM-DD').startOf('day');
            end = moment(parts[1], 'YYYY-MM-DD').endOf('day');
        }

        if (!start || !end) {
            return null;
        }

        return [start, end];
    };

    return function(input, filters) {
        //console.log('Applying: ', filters);
        // Filter by date
        dateRange = _getDateRange(filters.dateRange);
        if (dateRange) {
            var start = dateRange[0], end = dateRange[1];
            input = _.filter(input, function (obj) {
                var dateCol = obj.config.forms.collection.targetDate;
                if (!dateCol) {
                    return true;
                }

                if (!obj.data[dateCol]) {
                    return false;
                }

                var date = moment(obj.data[dateCol], 'MM/DD/YYYY');
                return start <= date && end >= date;
            });
        }

        // Filter by project
        if (filters.selectedProject && filters.selectedProject.id) {
            input = _.filter(input, function (obj) {
                if (!obj.data.project || !obj.data.project.id) {
                    return false;
                }

                return obj.data.project.id === filters.selectedProject.id;
            });
        }

        // Hide completed tasks
        if (!filters.showDoneTasks) {
            input = _.filter(input, function (obj) {
                if (obj.config.type !== 'task') {
                    return true;
                }
                return !obj.data.done;
            });
        }

        // Filter by query
        var query = filters.search;
        if (query) {
            query = query.toLowerCase();
            input = _.filter(input, function (obj) {
                var descriptionField = obj.config.forms.collection.description;
                var titleField = obj.config.forms.collection.title;

                descriptionMatch = obj.data[descriptionField] ? obj.data[descriptionField].toLowerCase().indexOf(query) > -1 : false;
                titleMatch = obj.data[titleField] ? obj.data[titleField].toLowerCase().indexOf(query) > -1 : false;

                return descriptionMatch || titleMatch;
            });
        }

        // Apply resource specific filters
        /*_.each(filters, function (query, name) {
            if (!resources.getResourceClass(name)) {
                return;
            }

            input = _.filter(input, function (obj) {
                if (obj.config.type !== name) {
                    return true;
                }

                var passes = true;
                _.each(query, function (clause) {

                    var field = obj.data[clause[0]];
                    if (obj.config.fields[clause[0]].type.name === 'date') {
                        if (field) {
                            field = moment(field, 'MM/DD/YYYY').format('YYYY-MM-DD');
                        } else {
                            field = '';
                        }
                    }

                    var op = clause[1];
                    var target = clause[2];

                    switch (op) {
                        case 'CONTAINS':
                            passes &= field.indexOf(target) !== -1;
                            break;
                        default:
                            throw new Error('Bad query: ', query);
                    }
                });
                return passes;
            });

        });*/

        // Sort results
        var sortField = filters.sortBy;
        if (sortField) {
            input = _.sortBy(input, function (obj) {
                var field = obj.config.forms.collection[sortField];
                if (!field || !obj.data[field]) {
                    // show these results last
                    return '~~~~~~~~~~~~~~~~~~~~~~~';
                }

                var value = obj.data[field].toLowerCase();
                if (sortField === 'targetDate') {
                    value = moment(value, 'MM/DD/YYYY').format('YYYY-MM-DD\\Thh:mm:ss');
                }
                return value;
            });
        }
        return input;
    };
}]);