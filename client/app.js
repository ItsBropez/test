var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){
    $routeProvider.when('/', {
        controller:'MarketsController'
        templateUrl: 'views/markets.html'
    })
    .when('/markets', {
        controller:'MarketsController'
        templateUrl: 'views/markets.html'
    })
    .when('/markets/entries/:id'), {
        controller:'MarketsController'
        templateUrl: 'views/market_entries.html'
    }
    .when('/markets/add'), {
        controller:'MarketsController'
        templateUrl: 'views/add_market.html'
    }
    .when('/markets/edit/:id'), {
        controller:'MarketsController'
        templateUrl: 'views/edit_market.html'
    }
    .otherwise({
        redirectTo: 't'
    });
});