var MongoAngular;
(function (MongoAngular) {
    (function (Controllers) {
        var CustomerController = (function () {
            function CustomerController($routeParams, customerService) {
                this.$routeParams = $routeParams;
                this.customerService = customerService;
                this.getCustomers();
                this.showUpdateButton = false;
            }
            CustomerController.prototype.addCustomer = function (customer) {
                var _this = this;
                this.customerService.saveCustomer(customer).then(function (c) {
                    _this.customers.push(c);
                    _this.resetCustomer();
                }, function (error) {
                    console.log(error.message);
                });
            };

            CustomerController.prototype.resetCustomer = function () {
                this.customer = null;
            };

            CustomerController.prototype.updateCustomer = function (customer) {
                var _this = this;
                customer.put().then(function () {
                    _this.resetCustomer();
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

            CustomerController.prototype.editCustomer = function (id) {
                var _this = this;
                this.showUpdateButton = true;
                this.customerService.getCustomerById(id).then(function (c) {
                    _this.customer = c;
                });
            };
            return CustomerController;
        })();
        Controllers.CustomerController = CustomerController;

        angular.module('mongoAngular').controller('CustomerController', [
            '$routeParams',
            'CustomerService',
            CustomerController
        ]);
    })(MongoAngular.Controllers || (MongoAngular.Controllers = {}));
    var Controllers = MongoAngular.Controllers;
})(MongoAngular || (MongoAngular = {}));
//# sourceMappingURL=CustomerController.js.map
