var ViewModel = function (txtFirstName, txtLastName) {
    this.txtFirstName = ko.observable(txtFirstName);
    this.txtLastName = ko.observable(txtLastName);

    this.txtFullName = ko.computed(function () {
        // Knockout tracks dependencies automatically. 
        // It knows that fullName depends on firstName and lastName,
        // because these get called when evaluating fullName.
        return this.txtFirstName() + " " + this.txtLastName();
    }, this);
};

// This makes Knockout get to work
ko.applyBindings(new ViewModel("Atif", "Nadeem"));