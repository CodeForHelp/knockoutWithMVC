var urlPath = window.location.pathname;
 
$(function () {
    ko.applyBindings(indexCustomerViewModel);
    indexCustomerViewModel.loadCustomers();
});
 
var indexCustomerViewModel = {
    customerList: ko.observableArray([]),
 
    loadCustomers: function () {
        var self = this;
        
        $.ajax({
            type: 'GET',
            url: 'Customer/CustomerList',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                //Put the response in ObservableArray
                self.customerList(data);
            },
            error: function(err) {
                alert(err.status + ' : ' + err.statusText);
            }
        });
    }
};
 
function customerList(customerList) {
    this.FirstName = ko.observable(customerList.FirstName);
    this.LastName = ko.observable(customerList.LastName);
    this.LoginId = ko.observable(customerList.LoginId);
}