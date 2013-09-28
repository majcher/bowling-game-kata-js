function AppCtrl($scope) {

	$scope.score = new Score();

	$scope.totalPins = _.range(1, 11);

	$scope.currentValue = function () {
		return $scope.score.value;
	}

	$scope.add = function (pins) {
		$scope.score.add(pins);
	}

}