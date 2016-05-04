var app = angular.module('codecraft', [
	'ngResource',
	'infinite-scroll'

]);

//Config is called before the $http service 
app.config(function ($httpProvider,$resourceProvider) {
	$httpProvider.defaults.headers.common['Authorization'] = '';//Token here
	$resourceProvider.defaults.stripTrailingSlashes = false; // Stop the trailing slashes from being stripped
});

app.factory("Contact", function ($resource) {
	return $resource("https://codecraftpro.com/api/samples/v1/contact/:id/", {id: '@id'}, {
		update: {
			method: 'PUT'
		}
	});
});

app.controller('PersonDetailController', function ($scope, ContactService) {
	$scope.contacts = ContactService;
});

app.controller('PersonListController', function ($scope, ContactService) {

	$scope.search = "";
	$scope.order = "email";
	$scope.contacts = ContactService;
	$scope.loadMore = function(){
		console.log("Load More");
		$scope.contacts.loadMore();
	};

	$scope.sensitiveSearch = function (person) {
		if ($scope.search) {
			return person.name.indexOf($scope.search) == 0 ||
				person.email.indexOf($scope.search) == 0;
		}
		return true;
	};

});

app.service('ContactService', function (Contact) {

	

	var self = {
		'addPerson': function (person) {
			this.persons.push(person);
		},
		'page': 1,
		'hasMore':true,
		'isLoading':false, // These 3 are for paginating data
		'selectedPerson': null,
		'persons': [],
		'loadContacts': function(){
			//Wrap the function inside the if statement and run it if there's more data and isLoading function is not called
			if(self.hasMore && !self.isLoading){
				self.isLoading = true;

				// Include this in the indicate the page number we want to 
				var params = {
					'page':self.page
				};
				// The first parameter will be sent as query parameter at the end of the URL
				Contact.get(params,function(data){
					console.log(data);
					angular.forEach(data.results,function(person){
						self.persons.push(new Contact(person));
					})
					//If there's no more data, set the hasMore function to false
					if(!data.next){
						self.hasMore = false;
					}
					self.isLoading = false;
				});
			}
		},
		'loadMore':function(){
			if(self.hasMore && !self.isLoading){
				self.page += 1;
				self.loadContacts();
			}
		}

	};

	self.loadContacts();
	return self;
});