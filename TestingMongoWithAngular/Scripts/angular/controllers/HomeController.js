var MongoAngular;
(function (MongoAngular) {
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(customerService) {
                this.customerService = customerService;
                this.getCustomers();
            }
            HomeController.prototype.addCustomer = function (customer) {
                var _this = this;
                this.customerService.saveCustomer(customer).then(function (c) {
                    _this.customers.push(c);
                }, function (error) {
                    console.log(error.message);
                });
            };

            HomeController.prototype.updateCustomer = function (customer) {
                var _this = this;
                this.customerService.updateCustomer(customer).then(function () {
                    _this.getCustomers();
                }, function (error) {
                    console.log(error.message);
                });
            };

            HomeController.prototype.getCustomers = function () {
                var _this = this;
                this.customerService.getCustomers().then(function (customers) {
                    _this.customers = customers;
                }, function (error) {
                    console.log(error.message);
                });
            };
            return HomeController;
        })();
        Controllers.HomeController = HomeController;

        angular.module('mongoAngular').controller('HomeController', [
            'CustomerService',
            HomeController
        ]);
    })(MongoAngular.Controllers || (MongoAngular.Controllers = {}));
    var Controllers = MongoAngular.Controllers;
})(MongoAngular || (MongoAngular = {}));
//# sourceMappingURL=HomeController.js.map
