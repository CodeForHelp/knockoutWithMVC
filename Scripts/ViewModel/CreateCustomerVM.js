$(function () {
    ko.applyBindings(createCustomerViewModel);
});

var createCustomerViewModel = {
    FirstName: ko.observable(),
    LastName: ko.observable(),
    LoginId: ko.observable(),
    Password: ko.observable(),
    btnCreate: function () {
        
        $.ajax({
            url: '/Customer/Create',
            type: 'POST',
            dataType: 'json',
            data: ko.toJSON(this),
            contentType: 'application/json',
            success: function (result) {
                if (result == "success") {
                    window.location.href = '/Customer/Index';
                } else {
                    $('#message').html(result);
                }
            },
            error: function (err) {
                if (err.responseText == "success") {
                    window.location.href = '/Customer/Index';
                } else {
                    $('#message').html("Error: " + err.responseText);
                }
            },
            complete: function () {
                window.location.href = '/Customer/Index/';
            }
        });
    }
};