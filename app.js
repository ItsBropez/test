'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

var Markets = require('./Models/markets.js');
//connect to mongoose
mongoose.connect('mongodb://admin:sr153@localhost:27017/markets?authSource=admin');
var db = mongoose.connection;

app.get('/', function (req, res) {
    res.send('Use /markets');

});

app.get('/markets', function (req, res) {
    Markets.getMarkets(function (err, markets) {
        if (err) {
            throw err;
        }
        res.json(markets);
    });
});

app.get('/markets/:_id', function (req, res) {
    Markets.getMarketById(req.params._id, function (err, market) {
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
    var id = request.params._id;
    var market = req.body;
    Market.updateMarket(id, market, {}, function (err, market) {
        if (err) {
            throw err;
        }
        res.json(market);
    });
});

app.delete('/markets/:_id', function (req, res) {
    var id = request.params._id;
    Market.removeMarket(id, function (err, market) {
        if (err) {
            throw err;
        }
        res.json(market);
    });
});

app.listen(3000);
console.log('Running on port 3000...');