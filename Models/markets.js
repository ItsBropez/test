var mongoose = require('mongoose');

var marketsSchema = mongoose.Schema({
    MarketName: String,
    timestamp: { type: Date, default: Date.now},
    High: Number,
    Low: Number,
    Last: Number,
    BaseVolume: Number,
    Bid: Number,
    Ask: Number,
    OpenBuyOrders: Number,
    OpenSellOrders: Number
});

var Markets = module.exports = mongoose.model('Markets');

//get markets
module.exports.getMarkets() = function (callback, limit) {
    Markets.find(callback).limit(limit);
};