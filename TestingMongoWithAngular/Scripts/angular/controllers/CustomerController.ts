module mongoAngular.Controllers {

    'use strict';

    import customerModel = mongoAngular.Models.Customer;
    import customerSrvc = mongoAngular.Resource.CustomerService;

    export class CustomerController {
        private customerList: customerModel[];
        private customer: customerModel;
        private showUpdateButton: boolean;
        private isLoadingData: boolean;
        public birthDate: string;

        constructor(private customerService: customerSrvc) {

            $("#birthdate").datepicker({
                dateFormat: 'dd-M-yy',
                changeMonth: true,
                changeYear: true,
            });

            this.customer = new customerModel();
            this.customerList = [];
            this.getCustomers();
            this.showUpdateButton = false;
        }

        private logError(error: Error): void {
            console.log(error.message);
        }

        private resetCustomer(): void {
            this.customer = new customerModel();
            this.birthDate = null;
        }

        public cancel() {
            this.customer = null;
            this.birthDate = null;
            this.showUpdateButton = false;
        }

        public addCustomer(customer: customerModel) {
            this.customerService.saveCustomer(customer).then((c) => {
                this.customerList.push(c);
                this.resetCustomer();
            }, this.logError);
        }

        public updateBirthDate(): void {
            this.birthDate = $("#birthdate").val();
            var birthday: string[] = this.birthDate.split('-');
            var months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            var date: number = parseInt(birthday[0], 10);
            var month: number = months.indexOf(birthday[1]);
            var year: number = parseInt(birthday[2], 10);

            this.customer.birthDate = new Date(Date.UTC(year, month, date));
        }

        public updateCustomer(customer: customerModel) {

            this.customerService.updateCustomer(customer).then(
                () => {
                    this.showUpdateButton = false;
                    this.resetCustomer();
                    this.getCustomers();
                }, this.logError);
        }

        public deleteCustomer(id: string) {

            this.customerService.getCustomerById(id).then((c) => {
                this.customerService.removeCustomer(c).then(
                    () => {
                        this.getCustomers();
                    }, (error: Error) => {
                        console.log(error.message);
                    });
            },
                (error: Error) => {
                    console.log(error.message);
                });
        }

        public getCustomers() {
            this.isLoadingData = true;

            this.customerService.getCustomers().then((customers: customerModel[]) => {
                this.customerList = customers;
                this.isLoadingData = false;
            }, this.logError);
        }

        public editCustomer(id: string) {
            this.showUpdateButton = true;
            this.customerService.getCustomerById(id).then(
                (customer: customerModel) => {
                    this.customer = customer;
                    var date: Date = new Date(customer.birthDate.toString());
                    $("#birthdate").datepicker("setDate", date);
                    this.updateBirthDate();
                }, this.logError);
        }
    }

    angular.module('mongoAngular')
        .controller('CustomerController', [
            'CustomerService',
            CustomerController
        ]);
} 