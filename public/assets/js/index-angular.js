var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {

	$http({
		url: 'http://localhost:1337/getMapDataPrior',
		method: "GET"
	}).success(function(data, status, headers, config) {console.log(data);
		
		
	});
});