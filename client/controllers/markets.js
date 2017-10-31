var myApp = angular.module('myApp');

myApp.controller('MarketsController', ['$scope', '$http', '$location', '$routeParams', funtion($scope, $http, $location, $routeParams){
    console.log('MarketsController loaded');
    $scope.getMarkets = funtion(){
        $http.get('/markets').success(function(responce){
            $scope.markets = responce;     
        });                     
    }                                   
}]);