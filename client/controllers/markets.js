var myApp = angular.module('myApp');

myApp.controller('MarketsController', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    console.log('MarketsController loaded');
    
    $scope.getMarkets = function () {
        $http.get('/markets').then(function (responce) {
            $scope.markets = responce.data;
        }, function (error) {
            console.log(error);
        });
    };
}]);