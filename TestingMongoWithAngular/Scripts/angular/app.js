var MongoAngular;
(function (MongoAngular) {
    var app = angular.module('mongoAngular', ['ngResource', 'ngRoute', 'restangular']);

    app.config([
        '$routeProvider', function ($routeProvider) {
            $routeProvider.when('/Home', {
                templateUrl: '/PartialViews/Home/home.html',
                controller: 'CustomerController as customerCtrl'
            }).otherwise({ redirectTo: '/Home' });
        }]).config([
        'RestangularProvider', function (restangularProvider) {
            restangularProvider.setBaseUrl('/api');
            restangularProvider.setDefaultHeaders({ 'Content-Type': 'application/json' });
        }]);
})(MongoAngular || (MongoAngular = {}));
//# sourceMappingURL=app.js.map
