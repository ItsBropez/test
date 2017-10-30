var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Markets = require('./Models/markets.js');
//connect to mongoose
mongoose.connect('mongodb://localhost/restful', {user: 'admin', pass: 'sr153'});
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


app.listen(3000);
console.log('Running on port 3000...');