var MongoAngular;
(function (MongoAngular) {
    (function (Controllers) {
        var CustomerController = (function () {
            function CustomerController(customerService) {
                this.customerService = customerService;
                this.isLoadingData = true;
                this.getCustomers();
                this.isLoadingData = false;
                this.showUpdateButton = false;
            }
            CustomerController.prototype.logError = function (error) {
                console.log(error.message);
            };

            CustomerController.prototype.resetCustomer = function () {
                this.customer = null;
            };

            CustomerController.prototype.cancel = function () {
                this.customer = null;
                this.showUpdateButton = false;
            };

            CustomerController.prototype.addCustomer = function (customer) {
                var _this = this;
                this.customerService.saveCustomer(customer).then(function (c) {
                    _this.customers.push(c);
                    _this.resetCustomer();
                }, this.logError);
            };

            CustomerController.prototype.updateCustomer = function (customer) {
                var _this = this;
                this.customerService.updateCustomer(customer).then(function () {
                    _this.showUpdateButton = false;
                    _this.resetCustomer();
                    _this.getCustomers();
                }, this.logError);
            };

            CustomerController.prototype.deleteCustomer = function (id) {
                var _this = this;
                this.customerService.getCustomerById(id).then(function (c) {
                    _this.customerService.removeCustomer(c).then(function () {
                        _this.getCustomers();
                    }, function (error) {
                        console.log(error.message);
                    });
                }, function (error) {
                    console.log(error.message);
                });
            };

            CustomerController.prototype.getCustomers = function () {
                var _this = this;
                this.customerService.getCustomers().then(function (customers) {
                    _this.customers = customers;
                }, this.logError);
            };

            CustomerController.prototype.editCustomer = function (id) {
                var _this = this;
                this.showUpdateButton = true;
                this.customerService.getCustomerById(id).then(function (c) {
                    _this.customer = c;
                }, this.logError);
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
