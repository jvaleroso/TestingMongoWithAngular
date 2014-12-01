
module mongoAngular.Resource {

    import customerModel = mongoAngular.Models.Customer;

    export class CustomerService {

        private customerService: restangular.IElement;
        private restangularService: restangular.IService;

        constructor(private restangular: restangular.IElement) {
            this.customerService = restangular.all('api/customers');
        }

        saveCustomer(customer: customerModel) {
            return this.customerService.post(customer);
        }

        getCustomers() {
            return this.customerService.getList();
        }

        getCustomerById(id: string) {
            return this.customerService.one(id).get();
        }

        removeCustomer(id:string) {
            return this.customerService.customDELETE('', { id: id });
        }

        updateCustomer(customer) {
            return this.customerService.customPUT(customer);
        }
    }

    angular.module('mongoAngular')
        .service('CustomerService', [
            'Restangular',
            CustomerService
        ]);
}