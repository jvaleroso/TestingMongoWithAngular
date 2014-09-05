module MongoAngular.Controllers {

    export interface ICustomerParam extends ng.route.IRouteParamsService {
        id: string;
    }

    export class CustomerController {
        private customers: MongoAngular.Model.ICustomer[];
        private customer: MongoAngular.Model.ICustomer;
        private restangularService: restangular.IService;
        private showUpdateButton: boolean;

        constructor(
            private $routeParams: ICustomerParam,
            private customerService: MongoAngular.Resource.CustomerService) {

            this.getCustomers();
            this.showUpdateButton = false;
        }

        public addCustomer(customer: MongoAngular.Model.ICustomer) {
            this.customerService.saveCustomer(customer).then((c) => {
                this.customers.push(c);
                this.resetCustomer();
            },
                (error: Error) => {
                    console.log(error.message);
                });
        }

        private resetCustomer() {
            this.customer = null;
        }

        public updateCustomer(customer) {
            customer.put().then(() => {
                this.resetCustomer();
                this.getCustomers();
            }, (error: Error) => {
                console.log(error.message);
            });
        }

        public getCustomers() {
            this.customerService.getCustomers().then((customers: MongoAngular.Model.ICustomer[]) => {
                this.customers = customers;
            }, (error: Error) => {
                    console.log(error.message);
                });
        }

        public editCustomer(id: string) {
            this.showUpdateButton = true;
            this.customerService.getCustomerById(id).then((c) => {
                this.customer = c;
            });
        }
    }

    angular.module('mongoAngular')
        .controller('CustomerController', [
            '$routeParams',
            'CustomerService',
            CustomerController
        ]);
} 