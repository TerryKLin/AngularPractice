// Angular module, the second parameter is how we show 
// angular the other things we depend upon
var app = angular.module('minmax',[]);

//Controller, anything we add to the scope variable can 
//be databined to the HTML
app.controller('MinMaxCtrl', function($scope){
	$scope.formModel = {};

	$scope.onSubmit = function(){
		console.log("Hey,I am submitting");
		console.log($scope.formModel);
	};
});