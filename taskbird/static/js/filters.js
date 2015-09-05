taskApp.filter('nl2br', function() {
  return function(input) {
    return input.replace('\n', '<br/>');
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

      return _.filter(input, {projectID: parseInt(projectID)});
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