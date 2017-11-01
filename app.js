'use strict';
var express = require('express');
var app = express();
var bittrex = require('node-bittrex-api');
var bodyParser = require('body-parser');
var assert = require('assert');
var mongoose = require('mongoose');
var MongoClient = require('mongodb');

app.use(express.static("./client"));
app.use(bodyParser.json());

var Market = require('./models/market.js');
var url = 'mongodb://admin:sr153@localhost:27017/Bittrex?authSource=admin';

console.log(VAR.apisecret);

//connect to mongoose
mongoose.connect(url);
var db = mongoose.connection;

function updateData() {
    bittrex.options({
        'apikey': '0aafd35549524f89b442e21a1f01dc68',
        'apisecret': '320ce990f19d40ea932bd9f91f347a49'
    });
    bittrex.getmarketsummaries(function (data, err) {
        if (err) {
            throw err;
        }
        MongoClient.connect(url, function (error, db1) {
            if (error) {
                throw error;
            }
            data.result.forEach(function (item) {
                db1.collection('markets').insert(item);
            });
            console.timestamp("Entry Created");
            db1.close();
        });
    });
}

setInterval(function () {
    updateData();
}, 60 * 15 * 1000);
    

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
console.log('Running on port 3000...');