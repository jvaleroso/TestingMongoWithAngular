module MongoAngular.Controllers {

    export class HomeController {
        private customers: MongoAngular.Model.ICustomer[];
        private customer: MongoAngular.Model.ICustomer;

        constructor(
            private customerService: MongoAngular.Resource.CustomerService) {
            this.getCustomers();
        }

        addCustomer(customer: MongoAngular.Model.ICustomer) {
            this.customerService.saveCustomer(customer).then((c) => {
                this.customers.push(c);
            },
                (error: Error) => {
                    console.log(error.message);
                });
        }

        updateCustomer(customer: MongoAngular.Model.ICustomer) {
            this.customerService.updateCustomer(customer).then(() => {
                this.getCustomers();
            }, (error: Error) => {
                    console.log(error.message);
                });
        }

        getCustomers() {
            this.customerService.getCustomers().then((customers: MongoAngular.Model.ICustomer[]) => {
                this.customers = customers;
            }, (error: Error) => {
                    console.log(error.message);
                });
        }
    }

    angular.module('mongoAngular')
        .controller('HomeController', [
            'CustomerService',
            HomeController
        ]);
} 