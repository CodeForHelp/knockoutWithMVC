var viewModel = function (items) {

    this.items = ko.observableArray(items);
    this.itemToAdd = ko.observable("");

    this.addItem = function () {
        if (this.itemToAdd() != "") {
            // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
            this.items.push(this.itemToAdd());

            // Clears the text box, because it's bound to the "itemToAdd" observable
            this.itemToAdd("");
        }

        // Ensure that "this" is always this view model
    }.bind(this);
};

ko.applyBindings(viewModel);