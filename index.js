var http = require('http');
var bittrex = require('node-bittrex-api')
var MongoClient = require('mongodb').MongoClient;

bittrex.options({
  'apikey' : '0aafd35549524f89b442e21a1f01dc68',
  'apisecret' : '320ce990f19d40ea932bd9f91f347a49',
});
console.log('Bittrex Keys insterted');

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/crypto", function (err, db) {
   
     if(err) throw err;
	 console.log('Connected');
     //Write databse Insert/Update/Query code here..
              
});

bittrex.getmarketsummaries( function( data, err ) {
  if (err) {
    return console.error(err);
  }
  for( var i in data.result ) {
    bittrex.getticker( { market : data.result[i].MarketName }, function( ticker ) {
      console.log( ticker );
    });
  }
});