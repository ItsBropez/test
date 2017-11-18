'use strict';
var bittrex = require('node-bittrex-api');
var info = require('./info.js');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var https = require('https');
var MongoClient = require('mongodb');

var dbURL = info.dbURL;
var mcURL = info.mcURL;
var apisecret = info.apisecret;
var apikey = info.apikey;

bittrex.options({
    'apikey': apikey,
    'apisecret': apisecret
});

function getMarketCap() {
    return new Promise(function (resolve, reject) {
        https.get('https://api.coinmarketcap.com/v1/ticker/?limit=2000', function (res) {
            var body = '';
            res.on('data', function (d) {
                body += d;
            });
            res.on('end', function () {
                resolve(JSON.parse(body));
            });
        });
    });
}

function logMarketCap(input) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(mcURL, function (error, db) {
            if (error) {
		        reject(err);
            }
            input.forEach(function (item) {
               db.collectoin('data').inset(item, function (err) {
                  if (err) {
                      reject (err);
                  } 
               }); 
            });
            db.close;
            resolve();
        });
    });
}

function getBittrex() {
    return new Promise(function (resolve, reject) {
        bittrex.getmarketsummaries(function (data, err) {
            if (err) {
                reject(err);
            } else {
                resolve(data.result);
            }
        });
    });
}

function runner() {
    return getMarketCap()
        .then(logMarketCap);
}

runner().then(function (resp) {
    console.log(resp);
});

console.log('Running on port 3000...');