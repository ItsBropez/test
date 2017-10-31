'use strict';
var mongoose = require('mongoose');

var marketSchema = mongoose.Schema({
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

var Market = module.exports = mongoose.model('Market', marketSchema);

//get markets
module.exports.getMarkets = function (callback, limit) {
    Market.find(callback).limit(limit);
};

//get market
module.exports.getMarketById = function (id, callback) {
    Market.findById(id, callback);
};

//add market
module.exports.addMarket = function (market, callback) {
    Market.create(market, callback);
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
    };
    Market.fineOneAndUpdate(query, update, options, callback);
};

//delete market
//add market
module.exports.removeMarket = function (id, callback) {
    var query = {_id: id};
    Market.remove(query, callback);
};
