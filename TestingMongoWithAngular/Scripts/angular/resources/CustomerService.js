var mongoAngular;
(function (mongoAngular) {
    (function (Resource) {
        var CustomerService = (function () {
            function CustomerService(restangular) {
                this.restangular = restangular;
                this.customerService = restangular.all('api/customers');
            }
            CustomerService.prototype.saveCustomer = function (customer) {
                return this.customerService.post(customer);
            };

            CustomerService.prototype.getCustomers = function () {
                return this.customerService.getList();
            };

            CustomerService.prototype.getCustomerById = function (id) {
                return this.customerService.one(id).get();
            };

            CustomerService.prototype.removeCustomer = function (customer) {
                return customer.remove();
            };

            CustomerService.prototype.updateCustomer = function (customer) {
                return customer.put();
            };
            return CustomerService;
        })();
        Resource.CustomerService = CustomerService;

        angular.module('mongoAngular').service('CustomerService', [
            'Restangular',
            CustomerService
        ]);
    })(mongoAngular.Resource || (mongoAngular.Resource = {}));
    var Resource = mongoAngular.Resource;
})(mongoAngular || (mongoAngular = {}));
//# sourceMappingURL=CustomerService.js.map
