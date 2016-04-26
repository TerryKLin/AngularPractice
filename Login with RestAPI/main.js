// Angular module, the second parameter is how we show 
// angular the other things we depend upon
var app = angular.module('minmax',[]);

//Controller, anything we add to the scope variable can 
//be databined to the HTML
//Injecting http service for API
app.controller('MinMaxCtrl', function($scope, $http){
	$scope.formModel = {};

	$scope.onSubmit = function(){
		console.log("Hey,I am submitting");
		console.log($scope.formModel);

		// http endpoint 
		$http.post('https://minmax-server.herokuapp.com/register/',$scope.formModel).
		success(function(data){
			console.log("Success") // Print out success if not error is encourtered	
		}).error(function(data){
			console.log("Failure") // Print out failure if error is encourtered
		});
	};
});

// '