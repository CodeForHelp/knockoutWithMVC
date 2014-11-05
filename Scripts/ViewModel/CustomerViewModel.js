// Initialized the namespace
var KnockoutWithMvcNamespace = {};

// View model declaration
KnockoutWithMvcNamespace.initViewModel = function (customer) {
    var customerViewModel = {
        Id: ko.observables(customer.Id),
        FirstName: ko.observable(customer.FirstName),
        LastName: ko.observable(customer.LastName),
        LoginId: ko.observable(customer.LoginId),
        Password: ko.observable(customer.Password)
    };

    return customerViewModel;
};

// Bind the customer
KnockoutWithMvcNamespace.bindCustomer = function (customer) {
    // Create the view model
    var viewModel = KnockoutWithMvcNamespace.initViewModel(customer);
    ko.applyBindings(viewModel);
};

// Display all the customers
KnockoutWithMvcNamespace.getCustomerList = function () {
    $.ajax({
        url: "/Customer/CustomerList",
        type: 'post',
        contentType: 'application/json',
        success: function (result) {
            KnockoutWithMvcNamespace.bindCustomer(result);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            $('#message').html(jqXhr.responseText + ", " + textStatus + ", " + errorThrown);
        }
    });
};

// Get Customer by Id
KnockoutWithMvcNamespace.getCustomerById = function(customerId) {
    $.ajax({
        url: "/Customer/Edit",
        type: 'post',
        data: "{'id':'" + customerId + "' }",
        contentType: 'application/json',
        success: function (result) {
            KnockoutWithMvcNamespace.bindCustomer(result);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            $('#message').html(jqXhr.responseText + ", " + textStatus + ", " + errorThrown);
        }
    });
};

// Add new customer
KnockoutWithMvcNamespace.createCustomer = function () {
    $.ajax({
        url: "/Customer/Create/",
        type: 'post',
        data: ko.toJSON(this),
        contentType: 'application/json',
        success: function (result) {
            $('#message').html(result);
            window.location.href = 'Customer/Index';
        }
    });
};

// Document ready function
$(document).ready(function () {
    KnockoutWithMvcNamespace.getCustomer(1);
});