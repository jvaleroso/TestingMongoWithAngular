

module MongoAngular.Resource {

    export class CustomerService {

        private customerService: restangular.IElement;
        private restangularService: restangular.IService;

        constructor(private restanguler: restangular.IElement) {
            this.customerService = restanguler.all('customer');
        }

        saveCustomer(customer: MongoAngular.Model.ICustomer) {
            return this.customerService.post(customer);
        }

        getCustomers() {
            return this.customerService.getList();
        }

        getCustomerById(id: string) {
            return this.customerService.one(id).get();
        }
    }

    angular.module('mongoAngular')
        .service('CustomerService', [
            'Restangular',
            CustomerService
        ]);
}