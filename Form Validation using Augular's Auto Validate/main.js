var app = angular.module('minmax', [
	'jcs-autoValidate' /*Including the auto validate package*/
]);

/*Custom messages*/
app.run(function(defaultErrorMessageResolver){
	defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages){
		errorMessages['tooYoung'] = 'You must be at least{0} years old to register';
		errorMessages['tooOld'] = 'You must be at max{0} years old to register';
		errorMessages['badUsername'] = 'Username can only contains letters , numbers and _';
	})
});


app.controller('MinMaxCtrl', function ($scope, $http) {
	$scope.formModel = {};

	$scope.onSubmit = function () {

		console.log("Hey i'm submitted!");
		console.log($scope.formModel);

		$http.post('https://minmax-server.herokuapp.com/register/', $scope.formModel).
			success(function (data) {
				console.log(":)")
			}).error(function(data) {
				console.log(":(")
			});
	};
});