var http = require('http');
var bit = require('node-bittrex-api')
var mongo = require('mongodb')

bit.options({
  'apikey' : '0aafd35549524f89b442e21a1f01dc68',
  'apisecret' : '320ce990f19d40ea932bd9f91f347a49',
});



var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello')
  bit.getmarketsummary( { market : 'BTC-VTC'}, function( data, err ) {
	  console.log(data)
});
});
server.listen(8080);

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/crypto';

MongoClient.connect(url,function(err,db){
	console.log(db.admin().listDatabases);
	db.close
});
