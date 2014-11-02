module mongoAngular.Models {

    export class Customer {
        constructor() {
            this.id = '';
            this.firtName = '';
            this.middleInitial = '';
            this.lastName = '';
            this.birthDate = new Date();
            this.address = '';
        }

        public id: string;
        public firtName: string;
        public lastName: string;
        public middleInitial: string;
        public birthDate: Date;
        public address: string;
    }
}

