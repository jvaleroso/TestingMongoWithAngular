var MongoAngular;
(function (MongoAngular) {
    (function (Resource) {
        var CustomerService = (function () {
            function CustomerService(restangular) {
                this.restangular = restangular;
                this.customerService = restangular.all('customer');
            }
            CustomerService.prototype.saveCustomer = function (customer) {
                return this.customerService.post(customer);
            };

            CustomerService.prototype.getCustomers = function () {
                return this.customerService.getList();
            };

            CustomerService.prototype.getCustomerById = function (id) {
                return this.restangular.one('customer', id).get();
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
    })(MongoAngular.Resource || (MongoAngular.Resource = {}));
    var Resource = MongoAngular.Resource;
})(MongoAngular || (MongoAngular = {}));
//# sourceMappingURL=CustomerService.js.map
