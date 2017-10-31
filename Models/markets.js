'use strict';
var mongoose = require('mongoose');

var marketsSchema = mongoose.Schema({
    MarketName: String,
    High: Number,
    Low: Number,
    Volume: Number,
    Last: Number,
    BaseVolume: Number,
    TimeStamp: Date,
    Bid: Number,
    Ask: Number,
    OpenBuyOrders: Number,
    OpenSellOrders: Number,
    PrevDay: Number,
    Entered: { type: Date, default: Date.now}
});

var Markets = module.exports = mongoose.model('Markets', marketsSchema);

//get markets
module.exports.getMarkets = function (callback, limit) {
    Markets.find(callback).limit(limit);
};

//get market
module.exports.getMarketById = function (id, callback) {
    Markets.findById(id, callback);
};

//add market
module.exports.addMarket = function (market, callback) {
    Markets.create(market, callback);
};

//update market
module.exports.updateMarket = function (id, market, options, callback) {
    var query = {_id: id};
    var update = {
        MarketName: market.MarketName,
        High: market.High,
        Low: market.Low,
        Volume: market.Volume,
        Last: market.Last,
        BaseVolume: market.market.BaseVolume,
        TimeStamp: market.TimeStamp,
        Bid: market.Bid,
        Ask: market.Ask,
        OpenBuyOrders: market.OpenBuyOrders,
        OpenSellOrders: market.OpenSellOrders,
        PrevDay: market.PrevDay,
        Entered: Date.now
    }
    Markets.fineOneAndUpdate(query, update, options, callback);
};