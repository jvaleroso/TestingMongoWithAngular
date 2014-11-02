var mongoAngular;
(function (mongoAngular) {
    (function (Models) {
        var Customer = (function () {
            function Customer() {
                this.id = '';
                this.firtName = '';
                this.middleInitial = '';
                this.lastName = '';
                this.birthDate = new Date();
                this.address = '';
            }
            return Customer;
        })();
        Models.Customer = Customer;
    })(mongoAngular.Models || (mongoAngular.Models = {}));
    var Models = mongoAngular.Models;
})(mongoAngular || (mongoAngular = {}));
//# sourceMappingURL=Customer.js.map
