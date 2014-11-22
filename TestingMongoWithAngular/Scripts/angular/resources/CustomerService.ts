
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
            return this.customerService.customGET('', id);
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