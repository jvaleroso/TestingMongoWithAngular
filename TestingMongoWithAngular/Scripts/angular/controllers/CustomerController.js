var MongoAngular;
(function (MongoAngular) {
    (function (Controllers) {
        var CustomerController = (function () {
            function CustomerController(customerService) {
                this.customerService = customerService;
                this.getCustomers();
            }
            CustomerController.prototype.addCustomer = function (customer) {
                var _this = this;
                this.customerService.saveCustomer(customer).then(function (c) {
                    _this.customers.push(c);
                    _this.customer = null;
                }, function (error) {
                    console.log(error.message);
                });
            };

            CustomerController.prototype.updateCustomer = function (customer) {
                var _this = this;
                this.customerService.updateCustomer(customer).then(function () {
                    _this.getCustomers();
                }, function (error) {
                    console.log(error.message);
                });
            };

            CustomerController.prototype.getCustomers = function () {
                var _this = this;
                this.customerService.getCustomers().then(function (customers) {
                    _this.customers = customers;
                }, function (error) {
                    console.log(error.message);
                });
            };
            return CustomerController;
        })();
        Controllers.CustomerController = CustomerController;

        angular.module('mongoAngular').controller('CustomerController', [
            'CustomerService',
            CustomerController
        ]);
    })(MongoAngular.Controllers || (MongoAngular.Controllers = {}));
    var Controllers = MongoAngular.Controllers;
})(MongoAngular || (MongoAngular = {}));
//# sourceMappingURL=CustomerController.js.map
