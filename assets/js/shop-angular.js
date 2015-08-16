var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {
	$scope.ebayData='';//[{galleryURL: "http://thumbs4.ebaystatic.com/m/mwoSIggB1EWGMsYwvdvvIdg/140.jpg",title:'asdasd'}];
	$scope.searcher='';
	// $http({
	// 	url: 'http://localhost:1337/ebaySearch',
	// 	method: "GET"
	// }).success(function(data, status, headers, config) {
	// 	console.log(data);
	// 	$scope.ebayData=data;
	// });
$scope.pagenum=1;
$scope.searchItem=function(){
	$scope.pagenum=1;
	$http({
		url: 'http://localhost:1337/ebaySearch',
		method: "GET",
		params:{itemname:$scope.searcher}
	}).success(function(data, status, headers, config) {
		console.log(data);
		$http({
			url: 'http://localhost:1337/ebaySearch1',
			method: "GET",
			params:{itemname:$scope.searcher}
		}).success(function(data, status, headers, config) {
			$scope.ebayData=data;
		});
	});
}



$scope.fetchNewResults=function(){
$http({
		url: 'http://localhost:1337/ebaySearch2',
		method: "GET",
		params:{pagenum:$scope.pagenum}
	}).success(function(data, status, headers, config) {
		console.log(data);
			$scope.ebayData=data;
	});
	//$scope.pagenum=$scope.pagenum+1;
}

$scope.buyItem=function($val){

$http({
		url: 'http://localhost:1337/setItem',
		method: "GET",
		params:{index:$val}
	}).success(function(data, status, headers, config) {
		window.location.replace('./pay.html');
	});


}
});