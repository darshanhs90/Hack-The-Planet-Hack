var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {
$scope.exchangeRt='';
	$scope.exchangeShow=false;
	$scope.balanceShow=false;
	$scope.getBalance=function(){
	$scope.exchangeShow=false;
	$scope.balanceShow=true;
		$http({
			url: 'http://localhost:1337/getBalance',
			method: "GET",
			params:{itemname:$scope.searcher}
		}).success(function(data, status, headers, config) {
			$scope.balance=data;
			if(data<10){
				alertify.error('Bit balance of '+data+'is considered to be too low');
			}
			else
				alertify.success('Maintain your Bit balance above 10.Your Balance is '+data);
			
		});




	}

	$scope.getChartdata=function(){

$http({
			url: 'http://localhost:1337/getChartdata',
			method: "GET"
		}).success(function(data, status, headers, config) {
			if(data=='')
				alertify.error('No Chart data Present');
		});

	}



$scope.getExchangeRates=function(){
	$scope.exchangeShow=true;
	$scope.balanceShow=false;
	$http({
			url: 'http://localhost:1337/getExchangeRates',
			method: "GET"
		}).success(function(data, status, headers, config) {
			console.log(data); 
			$scope.keys=[];
			$scope.values=[];
			
			for (var key in data) {
                    $scope.keys.push(key);
                    $scope.values.push(data[key]);
                }
            console.log($scope.keys);
           console.log($scope.values);
             
		});

}



});