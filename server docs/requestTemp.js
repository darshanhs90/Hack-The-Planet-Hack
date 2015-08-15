var ebay = require('ebay-api');

var params = {};

params.keywords = [ "Canon", "Powershot" ];

// add additional fields
params.outputSelector = [ 'AspectHistogram' ];

params['paginationInput.entriesPerPage'] = 100;


var filters = {};

filters.itemFilter = [
  new ebay.ItemFilter("FreeShippingOnly", true)
];

filters.domainFilter = [
  new ebay.ItemFilter("domainName", "Digital_Cameras")
];


ebay.ebayApiGetRequest({
    serviceName: 'FindingService',
    opType: 'findItemsByKeywords',
    appId: 'Student2e-87f6-4397-8e4b-1ac764f2ec2',      // FILL IN YOUR OWN APP KEY, GET ONE HERE: https://publisher.ebaypartnernetwork.com/PublisherToolsAPI
    params: params,
    filters: filters,
    parser: ebay.parseItemsFromResponse    // (default)
  },
  // gets all the items together in a merged array
  function itemsCallback(error, items) {
    if (error) throw error;
    
    console.log('Found', items.length, 'items');
    /*for (var i = 0; i < items.length; i++) {
      console.log('- ' + items[i]);
    }  */
  }
);

ebay.paginateGetRequest({
    serviceName: 'FindingService',
    opType: 'findItemsByKeywords',
    appId: 'Student2e-87f6-4397-8e4b-1ac764f2ec2',      // FILL IN YOUR OWN APP KEY, GET ONE HERE: https://publisher.ebaypartnernetwork.com/PublisherToolsAPI
    params: params,
    filters: filters,
    parser: ebay.parseItemsFromResponse ,
    pages:2,
    perPage:20   // (default)
  },
  // gets all the items together in a merged array
  function itemsCallback(error, items) {
    if (error) throw error;
    
    console.log('Found', items.length, 'items');
    console.log(JSON.stringify(items));
    /*for (var i = 0; i < items.length; i++) {
      console.log('- ' + items[i]);
    }  */
  }
);





