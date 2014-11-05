// On load
$(function () {
    ko.applyBindings(customerListViewModel);
    customerListViewModel.loadCustomerList();
});

// Create view model
var customerListViewModel = {
    customerList: ko.observableArray([]),

    loadCustomerList: function () {
        var self = this;

        $.ajax({
            type: 'GET',
            url: 'Customer/CustomerList',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                self.customerList(data);
            },
            error: function (err) {
                alert(err.status + ' : ' + err.statusText);
            }
        });
    }
};

self.editCustomer = function (customerList) {
    window.location.href = '/Customer/Edit/' + customerList.Id;
};
self.deleteCustomer = function (customerList) {
    window.location.href = '/Customer/Delete/' + customerList.Id;
};

// Model
function customerList(customerList) {
    this.FirstName = ko.observable(customerList.FirstName);
    this.LastName = ko.observable(customerList.LastName);
    this.LoginId = ko.observable(customerList.LoginId);
}