module MongoAngular {

    var app = angular.module('mongoAngular', ['ngResource', 'ngRoute', 'restangular']);

    app.config([
        '$routeProvider', ($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider
                .when('/Home', {
                    templateUrl: '/PartialViews/Home/home.html',
                    controller: 'CustomerController as customerCtrl'
                })
                .otherwise({ redirectTo: '/Home' });
        }])
        .config(['RestangularProvider', (restangularProvider: restangular.IProvider) => {
            restangularProvider.setBaseUrl('/api');
            restangularProvider.setDefaultHeaders({ 'Content-Type': 'application/json' });
        }]);
} 