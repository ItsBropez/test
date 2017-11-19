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

var hash = "5a110e302aaa074c4243f539";
var index = 1;

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
                        reject(err);
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
        str = str.replace(/BTC-/g, '');
        
        //weird case where market name doesn't match 
        str = str.replace('NBT', 'USNBT');
        
        var output = JSON.parse(str);
        var count = 0;
        
        MongoClient.connect(mcURL, function (error, db) {
            if (error) {
                reject(err);
            }
            /*db.collection('data').findOne({"tracer": "HHHHH"}, function (err, resss) {
                if (err) {
                    throw err;
                }
                index = resss.index;
                console.log(index);
            }); */
            output.forEach(function (item) {
                db.collection('data').findOne({"symbol": item.MarketName}, function (err, result) {
                    if (err) {
                        console.log(item.MarketName);
                    } else if (result === null) {

                    } else {
                        item.Gap = item.OpenSellOrders - item.OpenBuyOrders;
                        item.mID = result.id;
                        item.mName = result.name;
                        item.mCap = result.market_cap_usd;
                        item.mSupply = result.available_supply;
                        item.index = index;
                    }
                    count++;
                    if (count >= output.length) {
                        resolve(output);
                        index++;
                        /*db.collection('data').update({"tracer" : "HHHHH"}, {"tracer": "HHHHH", "index" : index}); */
                    }
                });
            });
            db.close;
        });
    });
}

function logBittrex(input) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(dbURL, function (error, db) {
            if (error) {
		        reject(err);
            }
            input.forEach(function (item) {
                db.collection('data').insert(item, function (err) {
                    if (err) {
                        reject(err);
                    }
                });
            });
            db.close;
            resolve();
        });
    });
}

function clearMarketCap() {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(mcURL, function (error, db) {
            if (error) {
                reject(err);
            }
            db.collection('data').remove({ });
            db.close;
            resolve('Entries Created!');
        });
    });
}

function runner() {
    return getMarketCap()
        .then(logMarketCap)
        .then(getBittrex)
        .then(parseBittrex)
        .then(logBittrex)
        .then(clearMarketCap);
}

setInterval(function () {
    runner().then(function (resp) {
        console.log(resp);
    });
}, 60 * 15 * 1000);

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