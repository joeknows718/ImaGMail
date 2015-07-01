var app = angular.module('imaGMail',['ngRoute']);
//config | routing 
app.config(function($routeProvider){
	$routeProvider.when('/inbox', {
		templateUrl : "views/inbox.html",
		controller : "InboxCtrl",
		controllerAs: "inbox"
	})
	.when('/email/:id', {
		templateUrl : "views/email.html",
		controller : "EmailCtrl",
		controllerAs : "email"
	})
	.otherwise({
		redirectTo : '/inbox'
	});
})


//factories 

app.factory('InboxFactory', function InboxFactory($http){
	var exports = {};

	exports.getMessages = function() {
		return $http.get('json/emails.json')
			.error(function(data){
				console.log("There was an error " , data );
		});
	};

	return exports 
});

//controllers
app.controller('InboxCtrl', function($scope, InboxFactory){
	InboxFactory.getMessages()
	.success(function(jsonData, statusCode){
		console.log("The request was successful", statusCode, jsonData);
		$scope.emails=jsonData;
	});
});
