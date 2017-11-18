'use strict';
var express = require('express');
var app = express();
var bittrex = require('node-bittrex-api');
var bodyParser = require('body-parser');
var assert = require('assert');
var mongoose = require('mongoose');
var MongoClient = require('mongodb');

var info = require('./info.js')

app.use(express.static("./client"));
app.use(bodyParser.json());

var Market = require('./models/market.js');

var url = info.dbURL;
var apisecret = info.apisecret;
var apikey = info.apikey;

//connect to mongoose
mongoose.connect(url);
var db = mongoose.connection;

bittrex.options({
    'apikey': apikey,
    'apisecret': apisecret
});

/*
function updateData() {
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
            console.log("Entry Created");
            db1.close();
        });
    });
} */

//need to update other db with symbol and index then foreach item in data.result add index: , mcap:, availsupply: to the json item being inserted
//maybe we update  collection prior to calling the logger.getsummary that holds the responce of api/ticker (ie symbol, index, mcap, supply) which is then cleared once logger is finished to avoid another large db
function updateData() {
	logger.getmarketsummaries(function (data, err) {
		if (err) {
			throw err;
		}
		MongoClient.connect(url, function (error,db) {
			if (error) {
				throw error;
			}
			data.result.forEach(function (item) {
				db.collection('markets').insert(item, function (err) {
					if (err) {
						throw err;
					}
					var id = item._id
					//should give id of the latest entry inserted to db
					console.log(id);
				)};
			});
			console.log("Entry Created");
			db.close();
		});
	});
}

//mongoose can maybe do what I need more effeciently, with schema and models.

setInterval(function () {
    updateData();
}, 60 * 0.5 * 1000);
    

/*app.get('/', function (req, res) {
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

app.listen(3000); */
console.log('Running on port 3000...');