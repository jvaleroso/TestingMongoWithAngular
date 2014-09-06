

module MongoAngular.Resource {

    export class CustomerService {

        private customerService: restangular.IElement;
        private restangularService: restangular.IService;

        constructor(private restangular: restangular.IElement) {
            this.customerService = restangular.all('customer');
        }

        saveCustomer(customer: MongoAngular.Model.ICustomer) {
            return this.customerService.post(customer);
        }

        getCustomers() {
            return this.customerService.getList();
        }

        getCustomerById(id: string) {
            return this.restangular.one('customer', id).get();
        }

        removeCustomer(customer) {
            return customer.remove();
        }

        updateCustomer(customer) {
            return customer.put();
        }
    }

    angular.module('mongoAngular')
        .service('CustomerService', [
            'Restangular',
            CustomerService
        ]);
}