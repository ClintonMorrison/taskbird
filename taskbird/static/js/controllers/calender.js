appControllers.controller('CalendarCtrl', function($scope, $http) {
	var i, j, days = [], num = 1, weeks = [];
	for (i = 0; i < 5; i++) {
		days = [];
		for (j = 0; j < 7; j++) {
			days.push({'number': num});
			num += 1;
		}
		weeks.push({'days': days});
	}
	$scope.weeks = weeks; 
	console.log(weeks);

	$scope.currentDate = moment().format("MMMM D, YYYY");

	$http.get("ajax/getCalendar.php").success(function(result) {
		console.log(result);
		$scope.weeks= result;
	});


});
