'use strict';
var express = require('express');
var app = express();
var bittrex= require('node-bittrex-api');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static("./client"));
app.use(bodyParser.json());

var Market = require('./models/market.js');

//connect to mongoose
mongoose.connect('mongodb://admin:sr153@localhost:27017/Bittrex?authSource=admin');
var db = mongoose.connection;

bittrex.options({
    'apikey': '0aafd35549524f89b442e21a1f01dc68',
    'apisecret': '320ce990f19d40ea932bd9f91f347a49'
});

bittrex.getmarketsummaries(function (data, err) {
    data.result.forEach( function (item) {
       console.log(item); 
    });

});
    

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