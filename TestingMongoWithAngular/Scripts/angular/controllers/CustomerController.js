var mongoAngular;
(function (mongoAngular) {
    (function (Controllers) {
        'use strict';

        var customerModel = mongoAngular.Models.Customer;

        var CustomerController = (function () {
            function CustomerController(customerService) {
                this.customerService = customerService;
                $("#birthdate").datepicker({
                    dateFormat: 'dd-M-yy',
                    changeMonth: true,
                    changeYear: true
                });

                this.customer = new customerModel();
                this.customerList = [];
                this.getCustomers();
                this.showUpdateButton = false;
            }
            CustomerController.prototype.logError = function (error) {
                console.log(error.data.message);
            };

            CustomerController.prototype.resetCustomer = function () {
                this.customer = new customerModel();
                this.birthDate = null;
            };

            CustomerController.prototype.cancel = function () {
                this.customer = null;
                this.birthDate = null;
                this.showUpdateButton = false;
            };

            CustomerController.prototype.addCustomer = function (customer) {
                var _this = this;
                this.customerService.saveCustomer(customer).then(function (c) {
                    _this.customerList.push(c);
                    _this.resetCustomer();
                }, this.logError);
            };

            CustomerController.prototype.updateBirthDate = function () {
                this.birthDate = $("#birthdate").val();
                var birthday = this.birthDate.split('-');
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                var date = parseInt(birthday[0], 10);
                var month = months.indexOf(birthday[1]);
                var year = parseInt(birthday[2], 10);

                this.customer.birthDate = new Date(Date.UTC(year, month, date));
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
                this.isLoadingData = true;

                this.customerService.getCustomers().then(function (customers) {
                    _this.customerList = customers;
                    _this.isLoadingData = false;
                }, this.logError);
            };

            CustomerController.prototype.editCustomer = function (id) {
                var _this = this;
                this.showUpdateButton = true;
                this.customerService.getCustomerById(id).then(function (customer) {
                    _this.customer = customer;
                    var date = new Date(customer.birthDate.toString());
                    $("#birthdate").datepicker("setDate", date);
                    _this.updateBirthDate();
                }, this.logError);
            };
            return CustomerController;
        })();
        Controllers.CustomerController = CustomerController;

        angular.module('mongoAngular').controller('CustomerController', [
            'CustomerService',
            CustomerController
        ]);
    })(mongoAngular.Controllers || (mongoAngular.Controllers = {}));
    var Controllers = mongoAngular.Controllers;
})(mongoAngular || (mongoAngular = {}));
//# sourceMappingURL=CustomerController.js.map
