var ViewModel = function () {
    this.itemToAdd = ko.observable("");
    
    // Initial items
    this.allItems = ko.observableArray(["Zebra", "Tiger", "Anaconda", "Cheeta"]);
    
    // Initial selection
    this.selectedItems = ko.observableArray(["Tiger"]);

    this.addItem = function () {
        // Prevent blanks and duplicates
        if ((this.itemToAdd() != "") && (this.allItems.indexOf(this.itemToAdd()) < 0)) {
            this.allItems.push(this.itemToAdd());
        }

        // Clear the text box
        this.itemToAdd("");
    };

    this.removeSelected = function () {
        this.allItems.removeAll(this.selectedItems());
        
        // Clear selection
        this.selectedItems([]); 
    };

    this.sortItems = function () {
        this.allItems.sort();
    };
};

ko.applyBindings(new ViewModel());