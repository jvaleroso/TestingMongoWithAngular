var mongoAngular;
(function (mongoAngular) {
    var app = angular.module('mongoAngular', ['ngResource', 'ngRoute', 'restangular']);

    app.config([
        '$routeProvider', function ($routeProvider) {
            $routeProvider.when('/Home', {
                templateUrl: '/PartialViews/Home/home.html',
                controller: 'CustomerController as customerCtrl'
            }).otherwise({ redirectTo: '/Home' });
        }
    ]).config([
        'RestangularProvider', function (restangularProvider) {
            restangularProvider.setDefaultHeaders({ 'Content-Type': 'application/json' });
        }]);
})(mongoAngular || (mongoAngular = {}));
//# sourceMappingURL=app.js.map
