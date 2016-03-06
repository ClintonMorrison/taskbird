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

      return results;
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

taskApp.filter('count', function () {
    return function (input) {
        return input.length ? input.length : 0;
    };
})

taskApp.filter('applyResourceFilters', ['resources', 'util', function(resources, util) {

    return function(input, filters) {
        // Filter by date
        dateRange = util.toDateRange(filters.dateRange);

        if (filters.dateRange === 'none') {
            input = _.filter(input, function (obj) {
                var dateCol = obj.config.forms.collection.targetDate;
                if (!dateCol || !obj.data[dateCol]) {
                    return true;
                }

                return false;
            });
        } else if (dateRange) {
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
        if (filters.selectedProjectID && filters.selectedProjectID !== 'all') {
            input = _.filter(input, function (obj) {
                if (filters.selectedProjectID === 'none') {
                    return !obj.data.project || !obj.data.project.id;
                }

                if (!obj.data.project || !obj.data.project.id) {
                    return false;
                }

                return obj.data.project.id === filters.selectedProjectID;
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