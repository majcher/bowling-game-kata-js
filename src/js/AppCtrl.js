function AppCtrl($scope) {

	$scope.score = new Score();

	$scope.totalPins = _.range(0, 11);

	$scope.currentValue = function () {
		return $scope.score.getCurrentValue();
	}

	$scope.add = function (pins) {
		$scope.score.add(pins);
	}

	$scope.isScoreClosed = function () {
		return $scope.score.isClosed();
	}

	$scope.restartScore = function () {
		$scope.score = new Score();
	}

}