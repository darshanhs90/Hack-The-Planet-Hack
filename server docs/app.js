/*jshint node:true*/
//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------
// This application uses express as it's web server
// for more info, see: http://expressjs.com
var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var http = require('http');
var request = require('request');
var https = require('https');
var cors = require('cors');
var sendgrid = require('sendgrid')('prajwal19@gmail.com', 'Prajwalhk19');
var accountSid = 'AC07275e4294f1b0d42623c3ec9559911e';
var authToken = '650d049a9bd99323fb899ce4b9e84fcc';
var clientTwilio = require('twilio')(accountSid, authToken);
var index = -1;
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var ebay = require('ebay-api');

var params = {};

params.keywords = ["Canon", "Powershot"];

// add additional fields
params.outputSelector = ['AspectHistogram'];

params['paginationInput.entriesPerPage'] = 10;
var filters = {};

filters.itemFilter = [
    new ebay.ItemFilter("FreeShippingOnly", true)
];

filters.domainFilter = [
    new ebay.ItemFilter("domainName", "Digital_Cameras")
];
// create a new express server
app.use(cors());
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
app.disable('etag');
// start server on the specified port and binding host
//server.listen(appEnv.port, appEnv.bind, function() {
server.listen(1337, '127.0.0.1', function() {

    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});

var itemResponse;
app.get('/ebaySearch', function(req, res) {
    console.log(req.query.itemname);
    params.keywords = [req.query.itemname];
    ebay = require('ebay-api');
    ebay.ebayApiGetRequest({
            serviceName: 'FindingService',
            opType: 'findItemsByKeywords',
            appId: 'Student2e-87f6-4397-8e4b-1ac764f2ec2',
            params: params,
            filters: filters,
            parser: ebay.parseItemsFromResponse // (default)
        },
        // gets all the items together in a merged array
        function itemsCallback(error, items) {
            //if (error) throw error;
            // res.setHeader("Content-Type", "application/json");
            //res.send(items);
            itemResponse = (items);
            res.end();
        }
    );

});

app.get('/ebaySearch1', function(req, res) {
    res.send(itemResponse);
    res.end();
});

app.get('/setItem', function(req, res) {
    index = req.query.index;
    res.end();
});
app.get('/getItem', function(req, res) {
    if (index != -1)
        res.send(itemResponse[index]);
    else
        res.send('0');
    res.end();
});


app.get('/ebaySearch2', function(req, res) {
    var pgs = req.query.pagenum;
    console.log(pgs);
    ebay.paginateGetRequest({
            serviceName: 'FindingService',
            opType: 'findItemsByKeywords',
            appId: 'Student2e-87f6-4397-8e4b-1ac764f2ec2', // FILL IN YOUR OWN APP KEY, GET ONE HERE: https://publisher.ebaypartnernetwork.com/PublisherToolsAPI
            params: params,
            filters: filters,
            parser: ebay.parseItemsFromResponse,
            pages: 1,
            perPage: 20 // (default)
        },
        // gets all the items together in a merged array
        function itemsCallback(error, items) {
            if (error) throw error;

            //console.log('Found', items.length, 'items');
            console.log(JSON.stringify(items));
            /*for (var i = 0; i < items.length; i++) {
      console.log('- ' + items[i]);
  }  */
            res.send(items);
            res.end();
        }
    );
});


app.get('/sendEmail', function(req, res) {

    var email = new sendgrid.Email({
        to: req.query.email,
        from: 'prajwal19@gmail.com',
        subject: 'Split payment Invite',
        text: req.query.message
    });
    sendgrid.send(email, function(err, json) {
        if (err) {
            return console.error(err);
        }
        console.log(json);
        res.end();
    });

});

app.get('/twitter/followers', function(req, res) {



// https.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + lcn + '&key=AIzaSyDWUnMGxYQzaDMTJSkH8btb4oJnLVGo178',
//     function(response) {
//         var body = '';
//         response.on('data', function(d) {
//             body += d;
//         });
//         response.on('end', function() {
//         });

});