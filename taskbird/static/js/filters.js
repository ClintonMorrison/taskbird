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

      return _.filter(input, {projectID: projectID});
  };
});
