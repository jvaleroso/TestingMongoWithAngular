

module MongoAngular.Resource {

    export class CustomerService {

        private customerService: restangular.IElement;

        constructor(private restanguler: restangular.IElement) {
            this.customerService = restanguler.all('customer');
        }

        saveCustomer(customer: MongoAngular.Model.ICustomer) {
            return this.customerService.post(customer);
        }

        getCustomers() {
            return this.customerService.getList();
        }

        updateCustomer(customer: MongoAngular.Model.ICustomer) {
            return this.customerService.put(customer);
        }
    }

    angular.module('mongoAngular')
        .service('CustomerService', [
            'Restangular',
            CustomerService
        ]);
}