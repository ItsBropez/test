'use strict';
var bittrex = require('node-bittrex-api');
var info = require('./info.js');
var https = require('https');
var MongoClient = require('mongodb');

/*
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var assert = require('assert');
var mongoose = require('mongoose');
*/

var dbURL = info.dbURL;
var mcURL = info.mcURL;
var apisecret = info.apisecret;
var apikey = info.apikey;

/*
app.use(express.static("./client"));
app.use(bodyParser.json());

var Market = require('./models/market.js');
*/

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
               db.collection('data').insert(item, function (err) {
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

function parseBittrex(input) {
    return new Promise(function (resolve, reject) {
        var str = JSON.stringify(input);
        str = str.replace(/BTC-/g,'');
        var output = JSON.parse(str);
    
        MongoClient.connect(mcURL, function (error, db) {
            if (error) {
                reject(err);
            }
            //output.forEach(function (item) {
               db.collection('data').findOne({"Symbol": output[0].MarketName}, function(err, result){
                    if (err) {
                        throw err;
                    } else {
                        output[0].mID = result.id;
                        output[0].mName = result.name;
                        output[0].mCap = result.market_cap_usd;
                        output[0].mSupply = result.available_supply;
                        //resolve(output[0]);
                   }
               });   
            //});
            //resolve(output[0]);
            db.close;
        });
    });
}

function runner() {
    return getMarketCap()
        .then(logMarketCap)
        .then(getBittrex)
        .then(parseBittrex);
}

runner().then(function (resp) {
    console.log(resp);
});

console.log('Running on port 3000...');
/*
setInterval(function () {
    updateData();
}, 60 * 0.5 * 1000);
    

app.get('/', function (req, res) {
    res.send('Use /markets');

});

app.get('/markets', function (req, res) {
    Market.getMarkets(function (err, markets) {
        if (err) {
            throw err;
        }
        res.json(markets);
    });
});

app.get('/markets/:_id', function (req, res) {
    Market.getMarketById(req.params._id, function (err, market) {
        if (err) {
            throw err;
        }
        res.json(market);
    });
});

app.post('/markets', function (req, res) {
    var market = req.body;
    Market.addMarket(market, function (err, market) {
        if (err) {
            throw err;
        }
        res.json(market);
    });
});

app.put('/markets/:_id', function (req, res) {
    var id = req.params._id;
    var market = req.body;
    Market.updateMarket(id, market, {}, function (err, market) {
        if (err) {
            throw err;
        }
        res.json(market);
    });
});

app.delete('/markets/:_id', function (req, res) {
    var id = req.params._id;
    Market.removeMarket(id, function (err, market) {
        if (err) {
            throw err;
        }
        res.json(market);
    });
});

app.listen(3000);
*/