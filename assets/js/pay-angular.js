var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.payData = '';
    $scope.payFlag = '0';
    $scope.paymentFlag = '0';
    $scope.email1 = '';
    $scope.email2 = '';
    $scope.email3 = '';
    $scope.percent1 = '';
    $scope.percent2 = '';
    $scope.percent3 = '';
    $scope.price = '';
    $http({
        url: 'http://localhost:1337/getItem',
        method: "GET"
    }).success(function(data, status, headers, config) {
        if (data != '0') {
            $scope.payData = data;
            $scope.price = data.sellingStatus.currentPrice.USD;
        } else
            $scope.payData = '';
    });
    $scope.payFlag = function() {
        $scope.paymentFlag = '1';
    }

    $scope.payPalPay = function() {
        //pay using bitcoin
        alertify.success('paying using paypal');
    }
    $scope.bitCoinPay = function() {
        //pay using bitcoin
        alertify.success('paying using bit coin');
    }
    $scope.addRows = function() {
        $scope.addFlag = '1';
    }
    $scope.paymentFlagfn = function() {
        $scope.payFlag = '1';
    }
    $scope.sendMail = function() {
        if ($scope.email1 != '' && $scope.email2 != '' && $scope.email3 != '') {
            var total = $scope.percent1 + $scope.percent2 + $scope.percent3;
            if (total < 100 || total > 100) {
                alert('Sum of Split percentages should be 100');
            } else {
                //send mails
                $scope.message1 = 'Your friend has invited you to pay ' + ($scope.percent1 * $scope.price / 100) + 'USD for ' + $scope.payData.title + ' .The payment can be done from the following link http://localhost:1337/pay.html';
                $scope.message2 = 'Your friend has invited you to pay ' + ($scope.percent2 * $scope.price / 100) + 'USD for ' + $scope.payData.title + ' .The payment can be done from the following link http://localhost:1337/pay.html';
                $scope.message3 = 'Your friend has invited you to pay ' + ($scope.percent3 * $scope.price / 100) + 'USD for ' + $scope.payData.title + ' .The payment can be done from the following link http://localhost:1337/pay.html';

                $http({
                    url: 'http://localhost:1337/sendEmail',
                    method: "GET",
                    params: {
                        email: $scope.email1,
                        message: $scope.message1
                    }
                }).success(function(data, status, headers, config) {
                    $http({
                        url: 'http://localhost:1337/sendEmail',
                        method: "GET",
                        params: {
                            email: $scope.email2,
                            message: $scope.message2
                        }
                    }).success(function(data, status, headers, config) {

                        $http({
                            url: 'http://localhost:1337/sendEmail',
                            method: "GET",
                            params: {
                                email: $scope.email3,
                                message: $scope.message3
                            }
                        }).success(function(data, status, headers, config) {
                            alertify.success('Payment Mails sent successfully');
                        });
                    });
                });
            }
        } else {
            alert('Enter Valid email addresses');
        }
    }

    $scope.validate = function($val) {
        var message = '';
        if ($val == 1)
            message = 'User with mailid' + $scope.email1 + ' will be paying ' + ($scope.percent1 * $scope.price / 100);
        else if ($val == 2)
            message = 'User with mailid' + $scope.email2 + ' will be paying ' + ($scope.percent2 * $scope.price / 100);
        else
            message = 'User with mailid' + $scope.email3 + ' will be paying ' + ($scope.percent3 * $scope.price / 100);
        alertify.success(message);
    }


});