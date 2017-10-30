'use strict';
var bittrex = require('node-bittrex-api');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

bittrex.options({
    'apikey' : '0aafd35549524f89b442e21a1f01dc68',
    'apisecret' : '320ce990f19d40ea932bd9f91f347a49'
});
console.log('Bittrex Keys insterted');
/*
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/testing", function (err, db) {
    assert.equal(null, err);
    console.log('Connected');
    db.close;
    //Write databse Insert/Update/Query code here..
              
}); */

bittrex.getmarketsummaries(function (data, err) {
    console.log(data.result);
    
    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/testing", function (err, db) {
        assert.equal(null, err);
        console.log('Connected');
        db.collection('results').insertOne(data.result);
        console.log('Market Summaries Logged');
        db.close
        //Write databse Insert/Update/Query code here..

    });
    
});