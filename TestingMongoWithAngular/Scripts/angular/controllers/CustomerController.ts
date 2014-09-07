module MongoAngular.Controllers {

    export class CustomerController {
        private customers: MongoAngular.Model.ICustomer[];
        private customer: MongoAngular.Model.ICustomer;
        private showUpdateButton: boolean;
        private isLoadingData: boolean;

        constructor(private customerService: MongoAngular.Resource.CustomerService) {
            this.isLoadingData = true;
            this.getCustomers();
            this.isLoadingData = false;
            this.showUpdateButton = false;
        }

        private logError(error: Error) {
            console.log(error.message);
        }

        private resetCustomer() {
            this.customer = null;
        }

        public cancel() {
            this.customer = null;
            this.showUpdateButton = false;
        }

        public addCustomer(customer: MongoAngular.Model.ICustomer) {
            this.customerService.saveCustomer(customer).then((c) => {
                this.customers.push(c);
                this.resetCustomer();
            }, this.logError);
        }

        public updateCustomer(customer) {

            this.customerService.updateCustomer(customer).then(() => {
                this.showUpdateButton = false;
                this.resetCustomer();
                this.getCustomers();
            }, this.logError);
        }

        public deleteCustomer(id: string) {

            this.customerService.getCustomerById(id).then((c) => {
                this.customerService.removeCustomer(c).then(() => {
                    this.getCustomers();
                }, (error: Error) => {
                        console.log(error.message);
                    });
            }, (error: Error) => {
                    console.log(error.message);
                });
        }

        public getCustomers() {
            this.customerService.getCustomers().then((customers: MongoAngular.Model.ICustomer[]) => {
                this.customers = customers;
            }, this.logError);
        }

        public editCustomer(id: string) {
            this.showUpdateButton = true;
            this.customerService.getCustomerById(id).then((c) => {
                this.customer = c;
            }, this.logError);
        }
    }

    angular.module('mongoAngular')
        .controller('CustomerController', [
            'CustomerService',
            CustomerController
        ]);
} 