//https://api.coindesk.com/v1/bpi/currentprice.json
//http://api.coindesk.com/v1/bpi/currentprice/INR.json
//http://api.coindesk.com/v1/bpi/supported-currencies.json
//http://api.coindesk.com/v1/bpi/historical/close.json
//http://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2014-09-05
// var request = require('superagent');
// request.get('http://api.reimaginebanking.com/atms?key=a7e63559418eb419cd29301d32626843').end(function(err,res){
//     console.log(res.body.data); //do something
// });

//https://blockchain.info/merchant/$guid/balance?password=$main_password
//38c70723-7e10-47b9-ae45-379a65f5b85e
//0fd7f375-5319-4c61-a64d-9eb65970de83
// var request = require('superagent');
// request.get('https://blockchain.info/merchant/38c70723-7e10-47b9-ae45-379a65f5b85e/balance?password=Darshanhs90-').end(function(err,res){
//     console.log(JSON.stringify(res.body)); //do something
// });

var blockchain = require('blockchain.info');
var myWallet = new blockchain.MyWallet('aff31a59-4977-4313-bbdd-19feddb70c4f', 'Password90-');
myWallet.getBalance(true,function(err,res){
	console.log(res);
});


var options={
	to:'15hfziEyq9oCGM2YHS2MZXRsJobuWLfrzu',
	amount:0.00009,
	inBTC:true
}
myWallet.send(options, function(err,res){
	console.log(res);
});


	// var exchangeRates = blockchain.exchangeRates;

	// exchangeRates.getTicker(function(err,res){
	// 	console.log(res);
	// });
	// exchangeRates.toBTC('123','ISK', function(err,res){
	// 	console.log(res);
	// });

