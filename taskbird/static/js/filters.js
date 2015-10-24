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
      var result = moment(input).format("MMMM DD, YYYY");
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
    if (input!=null)
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