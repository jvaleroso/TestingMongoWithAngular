var MongoAngular;
(function (MongoAngular) {
    (function (Resource) {
        var CustomerService = (function () {
            function CustomerService(restanguler) {
                this.restanguler = restanguler;
                this.customerService = restanguler.all('customer');
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
