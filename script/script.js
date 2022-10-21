let sortAsc = true;
document.onreadystatechange = function () {
    // Get name of HTML page.
    var pageName = window.location.pathname.split("/").pop();
    if (document.readyState == "interactive") {
        
        if(pageName == "inventory.html"){
            RefreshInventoryDisplayedData();

            btnNew = document.getElementById("btnNew");
            // On button click retrieve data, add data, store data.
            btnNew.addEventListener("click", function(){
                if(document.cookie == ""){
                    itemsOnHand = JoinDB(onHandInventory, items, "UPC");
                }
                else{
                    itemsOnHand = Retrieve("itemsOnHand");
                    items = Retrieve("items");
                    Suppliers = Retrieve("suppliers");
                }
                // Do the adding to DB.
                
                var newOnHandItem = {};
                newOnHandItem["UPC"] = document.getElementById("upc").value;
                newOnHandItem["QtyOnHand"] = document.getElementById("quan").value;
                newOnHandItem["DateReceived"] = document.getElementById("date").value;
                newOnHandItem["Cost"] = document.getElementById("cost").value;
                alert(addInventoryItem(newOnHandItem["UPC"], newOnHandItem["QtyOnHand"], newOnHandItem["Cost"], newOnHandItem["DateReceived"]));
                RefreshInventoryDisplayedData();
            });

            btnCommit = document.getElementById("btnSubmit");
            // On btn click retrieve stored data, modify data, redisplay data
            btnCommit.addEventListener("click", function(){
                upc = document.getElementById("upc").value;
                quantity = document.getElementById("quan").value;
                dateReceived = document.getElementById("date").value;
                cost = document.getElementById("cost").value;
                

                alert(editInventoryItem(upc, quantity, cost, dateReceived));
                RefreshInventoryDisplayedData();
            })
        
            // buttons in table have OnClick
            ButtonFunctionality;
        }

        if(pageName == "items.html"){
            RefreshItemsDisplayedData();
            btnNew.addEventListener("click", function(){
                if(document.cookie == ""){

                }
                else{
                    itemsOnHand = Retrieve("itemsOnHand");
                    items = Retrieve("items");
                    Suppliers = Retrieve("suppliers");
                }
                // Do the adding to DB.
                
                var newItem = {};
                newItem["UPC"] = document.getElementById("upc").value;
                newItem["Status"] = document.getElementById("status").checked;
                newItem["Name"] = document.getElementById("pname").value;
                newItem["Details"] = document.getElementById("itemdesc").value;
                newItem["ManFactID"] = document.getElementById("manfactid").value;
                newItem["SerialNum"] = document.getElementById("serialnum").value;
                
                alert(addProduct(newItem["UPC"], newItem["Status"], newItem["Name"], newItem["Details"], newItem["ManFactID"], newItem["SerialNum"]));
                RefreshItemsDisplayedData();
            });

            btnCommit.addEventListener("click", function(){
                upc = document.getElementById("upc").value;
                Status = document.getElementById("status").checked;
                Name = document.getElementById("pname").value;
                details = document.getElementById("itemdesc").value;
                manfactid = document.getElementById("manfactid").value;
                serialnum = document.getElementById("serialnum").value;

                alert(editProduct(upc, Status, Name, details, manfactid, serialnum));
                RefreshItemsDisplayedData();
            })
            RefreshItemsDisplayedData();
            ButtonFunctionality();
        }

        if(pageName == "ordering.html"){
            refreshOrders();
            btnNew.addEventListener("click", function(){
                if(document.cookie == ""){

                }
                else{
                    itemsOnHand = Retrieve("orders");
                    items = Retrieve("items");
                }
                // Do the adding to DB.
                var newOrder = {};
                UPCsandQuant = document.getElementById("ordUPC").value.split(",");
                UPCs = [];
                Quants = [];
                UPCsandQuant.forEach(pair => {
                    UPCs.push(pair.split("x")[1]);
                    Quants.push(pair.split("x")[0]);
                })
                newOrder["InvoiceID"] = document.getElementById("custInv").value;
                newOrder["UPC"] = UPCs;
                newOrder["OrderDate"] = document.getElementById("ordDate").value;
                newOrder["CustomerFirst"] = document.getElementById("custFirst").value;
                newOrder["CustomerLast"] = document.getElementById("custLast").value;
                newOrder["ItemQuantity"] = Quants;

                alert(addOrder(newOrder["InvoiceID"], newOrder["UPC"], newOrder["ItemQuantity"], newOrder["OrderDate"], newOrder["CustomerFirst"], newOrder["CustomerLast"]));
                refreshOrders();
            });
            btnCommit.addEventListener("click", function(){
                var newOrder = {};
                UPCsandQuant = document.getElementById("ordUPC").value.split(",");
                UPCs = [];
                Quants = [];
                UPCsandQuant.forEach(pair => {
                    UPCs.push(pair.split("x")[1]);
                    Quants.push(pair.split("x")[0]);
                })
                invoiceID = document.getElementById("custInv").value;
                orderdate = document.getElementById("ordDate").value;
                customerfirst = document.getElementById("custFirst").value;
                customerlast = document.getElementById("custLast").value;

                alert(editOrder(invoiceID, UPCs, Quants, orderdate, customerfirst, customerlast));
                refreshOrders();
            })
        }

        if(pageName == "suppliers.html"){
            console.log("Test")
            RefreshSuppliers();
            btnNew.addEventListener("click", function(){
                if(document.cookie == ""){

                }
                else{
                    Suppliers = Retrieve("suppliers");
                }
                // Do the adding to DB.
                var newSupplier = {};
                
                newSupplier["SupplierID"] = document.getElementById("supID").value;
                newSupplier["Name"] = document.getElementById("supName").value;;
                newSupplier["Street"] = document.getElementById("supStreet").value;
                newSupplier["City"] = document.getElementById("supCity").value;
                newSupplier["Province"] = document.getElementById("supProv").value;
                newSupplier["PostCode"] = document.getElementById("supPost").value;
                newSupplier["PhoneNumber"] = document.getElementById("supPhone").value;


                alert(addManufacturer(newSupplier["SupplierID"], newSupplier["Name"], newSupplier["Street"], newSupplier["City"], newSupplier["Province"], newSupplier["PostCode"], newSupplier["PhoneNumber"]));
                RefreshSuppliers();
            });
            btnCommit.addEventListener("click", function(){
                
                supID = document.getElementById("supID").value;
                supName = document.getElementById("supName").value;;
                supStreet = document.getElementById("supStreet").value;
                supCity = document.getElementById("supCity").value;
                supProv = document.getElementById("supProv").value;
                supPost = document.getElementById("supPost").value;
                supPhone = document.getElementById("supPhone").value;
                alert(editManufacturer(supID, supName, supStreet, supCity, supProv, supPost, supPhone));
                RefreshSuppliers();
            })
        }
    }
}

function ButtonFunctionality(){
    // buttons in table have OnClick
    editButtons = document.querySelectorAll("td > input.edit");
    editButtons.forEach( button => {
        button.addEventListener("click", sendToEdit);
    })
    deleteButtons = document.querySelectorAll("td > input.delete");
    deleteButtons.forEach( button => {
        button.addEventListener("click", ArchiveRecord);
    })
}

function RefreshInventoryDisplayedData(){
    // Init Variables
    const tblInventory = document.getElementById("tbInventory");
    var tblInventoryHeaders = ["UPC", "Product", "Details", "Quantity", "Price", "DateReceived", "Modify"];
    var tblInventoryHTML = "<tr>";
    
    
    tblInventory.innerHTML = "";
    // Foreach value in headers make a column.
    tblInventoryHeaders.forEach(header => {
        tblInventoryHTML += `<th><input type="submit" id="${header}Header" value="${header}" style="width:100%"></th>`;
    });
    // Set innerHTML add table header.
    tblInventory.innerHTML += tblInventoryHTML + "</tr>";
    var itemRow = "";
    // Generate Joined DB
    if(document.cookie == ""){
        itemsOnHand = JoinDB(onHandInventory, items, "UPC");
    }
    else{
        itemsOnHand = JoinDB(Retrieve("itemsOnHand"), Retrieve("items"), "UPC");
        items = Retrieve("items");
        Suppliers = Retrieve("suppliers");
    }
    
    // Foreach item on hand
    var counter = 0;
    itemsOnHand.forEach(item => {
        itemRow += `<tr>`;
        itemRow += `<td>${item["UPC"]}</td>`
        +`<td>${item["Name"]}</td>`
        +`<td>${item["Details"]}</td>`
        +`<td>${item["QtyOnHand"]}</td>`
        +`<td>${item["Cost"]}</td>`
        +`<td>${item["DateReceived"]}</td>`
        +`<td><input type="submit" value="Edit" class="${counter} edit">` 
        + `<input type="submit" value="Delete" class="${counter} delete"></td></tr>`
        counter++;
    });
    
    // Add the row to the table.
    tblInventory.innerHTML += itemRow;   
    // Store the cookies.
    Store("itemsOnHand", itemsOnHand, 1);
    Store("items", items, 1);
    Store("suppliers", Suppliers, 1);
    ButtonFunctionality();
    // Sort Functionality
    document.getElementById("UPCHeader").addEventListener("click", function(){
        sortAsc = !sortAsc;
        itemsOnHand = SortInventoryOnHand(itemsOnHand, sortAsc, "UPC");
        RefreshInventoryDisplayedData();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("UPCHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
    document.getElementById("ProductHeader").addEventListener("click", function(){
        sortAsc = !sortAsc;
        itemsOnHand = SortInventoryOnHand(itemsOnHand, sortAsc, "Name");
        RefreshInventoryDisplayedData();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("ProductHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
    document.getElementById("DateReceivedHeader").addEventListener("click", function(){
        sortAsc = !sortAsc;
        itemsOnHand = SortInventoryOnHand(itemsOnHand, sortAsc, "DateReceived");
        RefreshInventoryDisplayedData();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("DateReceivedHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
}

function RefreshItemsDisplayedData(){
    // Init Variables
    const tblInventory = document.getElementById("tbInventory");
    var tblInventoryHeaders = ["UPC", "Carry?", "Name", "Details", "ManFactID", "SerialNum", "Modify"];
    var tblInventoryHTML = "<tr>";
    const blacklist = ["Status", "ManFactID", "SerialNum", "DateReceived"];
    tblInventory.innerHTML = "";
    // Foreach value in headers make a column.
    tblInventoryHeaders.forEach(header => {
        tblInventoryHTML += `<th><input type="submit" id="${header}Header" value="${header}" style="width:100%"></th>`;
    });
    // Set innerHTML add table header.
    tblInventory.innerHTML += tblInventoryHTML + "</tr>";
    var itemRow = "";
    if(document.cookie == ""){
    }
    else{
        items = Retrieve("items");
    }
    
    // Foreach item on hand
    var counter = 0;
    items.forEach(item => {
        itemRow += `<tr>`;

        itemRow += `<td>${item["UPC"]}</td>`
        +`<td>${item["Status"]}</td>`
        +`<td>${item["Name"]}</td>`
        +`<td>${item["Details"]}</td>`
        +`<td>${item["ManFactID"]}</td>`
        +`<td>${item["SerialNum"]}</td>`
        +`<td><input type="submit" value="Edit" class="${counter} edit">` 
        +`<input type="submit" value="Delete" class="${counter} delete"></td></tr>`
        counter++;
    });
    
    // Add the row to the table.
    tblInventory.innerHTML += itemRow;   
    // Store the cookies.
    Store("items", items, 1);
    Store("suppliers", Suppliers, 1);
    ButtonFunctionality();
    // Sort Functionality
    document.getElementById("UPCHeader").addEventListener("click", function(){
        sortAsc = !sortAsc;
        items = SortInventoryOnHand(items, sortAsc, "UPC");
        RefreshItemsDisplayedData();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("UPCHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
    document.getElementById("NameHeader").addEventListener("click", function(){
        sortAsc = !sortAsc;
        items = SortInventoryOnHand(items, sortAsc, "Name");
        RefreshItemsDisplayedData();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("NameHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
}

function refreshOrders(){
    // Init Variables
    const tblOrders = document.getElementById("tbOrders");
    var tblOrdersHeaders = ["Invoice#", "CustomerFName", "CustomerLName" ,  "DatePlaced", "ItemUPC(s)", "Quantity" , "Modify"];
    var tblOrdersHTML = "<tr>";
    tblOrders.innerHTML = "";
    // Foreach value in headers make a column.
    tblOrdersHeaders.forEach(header => {
        tblOrdersHTML += `<th><input type="submit" id="${header}Header" value="${header}" style="width:100%"></th>`;
    });
    // Set innerHTML add table header.
    tblOrders.innerHTML += tblOrdersHTML + "</tr>";
    var itemRow = "";

    if(document.cookie == ""){
    }
    else{
        items = Retrieve("orders");
    }

    // Foreach item on hand
    var counter = 0;
    orders.forEach(item => {
        itemRow += `<tr>`;

        itemRow += `<td>${item["InvoiceID"]}</td>`
        +`<td>${item["CustomerFirst"]}</td>`
        +`<td>${item["CustomerLast"]}</td>`
        +`<td>${item["OrderDate"]}</td><td>`
        item["ItemUPC"].forEach(upc => {
            itemRow += `${upc}`
            if(item["ItemUPC"].indexOf(upc) != item["ItemUPC"].length-1){
                itemRow += '\n'
            }
        });
        itemRow += "</td><td>";
        item["ItemQuantity"].forEach(quantity => {
            itemRow += `${quantity}<br>`
        });
        
        itemRow += "</td>"
        +`<td><input type="submit" value="Edit" class="${counter} edit">` 
        +`<input type="submit" value="Delete" class="${counter} delete"></td></tr>`;
        counter++;
    });
    
    // Add the row to the table.
    tblOrders.innerHTML += itemRow;   
    // Store the cookies.
    Store("orders", items, 1);
    ButtonFunctionality();
    // Sort Functionality
    document.getElementById("Invoice#Header").addEventListener("click", function(){
        sortAsc = !sortAsc;
        orders = SortInventoryOnHand(orders, sortAsc, "InvoiceID");
        refreshOrders();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("Invoice#Header").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
    document.getElementById("DatePlacedHeader").addEventListener("click", function(){
        sortAsc = !sortAsc;
        orders = SortInventoryOnHand(orders, sortAsc, "OrderDate");
        refreshOrders();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("DatePlacedHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
    // document.getElementById("DateReceivedHeader").addEventListener("click", function(){
    //     sortAsc = !sortAsc;
    //     itemsOnHand = SortInventoryOnHand(itemsOnHand, sortAsc, "DateReceived");
    //     RefreshInventoryDisplayedData();
    //     if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
    //         buttonValue = this.value;
    //     }
    //     document.getElementById("DateReceivedHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    // });
}

function RefreshSuppliers(){
    // Init Variables
    const tblSuppliers = document.getElementById("tbSupplier");
    var tblSuppliersHeaders = ["SupplierID", "Name", "Street", "City", "Province" , "PostCode" , "PhoneNumber" , "Modify"];
    var tblSuppliersHTML = "<tr>";
    tblSuppliers.innerHTML = "";
    // Foreach value in headers make a column.
    tblSuppliersHeaders.forEach(header => {
        tblSuppliersHTML += `<th><input type="submit" id="${header}Header" value="${header}" style="width:100%"></th>`;
    });
    // Set innerHTML add table header.
    tblSuppliers.innerHTML += tblSuppliersHTML + "</tr>";
    var itemRow = "";

    if(document.cookie == ""){
    }
    else{
        Suppliers = Retrieve("Suppliers");
    }

    // Foreach item on hand
    var counter = 0;
    Suppliers.forEach(item => {
        itemRow += `<tr>`;

        itemRow += `<td>${item["SupplierID"]}</td>`
        +`<td>${item["Name"]}</td>`
        +`<td>${item["Street"]}</td>`
        +`<td>${item["City"]}</td>`
        +`<td>${item["Province"]}</td>`
        +`<td>${item["PostCode"]}</td>`
        +`<td>${item["PhoneNumber"]}</td>`
        +`<td><input type="submit" value="Edit" class="${counter} edit">` 
        +`<input type="submit" value="Delete" class="${counter} delete"></td></tr>`;
        counter++;
    });
    
    // Add the row to the table.
    tblSuppliers.innerHTML += itemRow;   
    // Store the cookies.
    Store("Suppliers", Suppliers, 1);
    ButtonFunctionality();
    // Sort Functionality
    // document.getElementById("Invoice#Header").addEventListener("click", function(){
    //     sortAsc = !sortAsc;
    //     Suppliers = SortInventoryOnHand(Suppliers, sortAsc, "InvoiceID");
    //     refreshSuppliers();
    //     if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
    //         buttonValue = this.value;
    //     }
    //     document.getElementById("Invoice#Header").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    // });
    // document.getElementById("DatePlacedHeader").addEventListener("click", function(){
    //     sortAsc = !sortAsc;
    //     Suppliers = SortInventoryOnHand(Suppliers, sortAsc, "OrderDate");
    //     refreshSuppliers();
    //     if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
    //         buttonValue = this.value;
    //     }
    //     document.getElementById("DatePlacedHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    // });
    // document.getElementById("DateReceivedHeader").addEventListener("click", function(){
    //     sortAsc = !sortAsc;
    //     itemsOnHand = SortInventoryOnHand(itemsOnHand, sortAsc, "DateReceived");
    //     RefreshInventoryDisplayedData();
    //     if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
    //         buttonValue = this.value;
    //     }
    //     document.getElementById("DateReceivedHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    // });
}

function sendToEdit(){
    var pageName = window.location.pathname.split("/").pop();

    if(pageName == "inventory.html"){    
        // Generate Joined DB
        if(document.cookie == ""){
            itemsOnHand = JoinDB(onHandInventory, items, "UPC");
        }
        else{
            itemsOnHand = JoinDB(Retrieve("itemsOnHand"), Retrieve("items"), "UPC");
        }
        var selectedItem = itemsOnHand[parseInt(this.className)];

        document.getElementById("upc").value = selectedItem["UPC"];
        document.getElementById("quan").value = selectedItem["QtyOnHand"];
        document.getElementById("date").value = String(selectedItem["DateReceived"]);
        document.getElementById("cost").value = selectedItem["Cost"];
    }
    else if (pageName == "items.html"){
        // Generate DB
        if(document.cookie == ""){
            itemsDB = items;
        }
        else{
            var itemsDB = Retrieve("items");
        }
        var selectedItem = itemsDB[parseInt(this.className)];
        document.getElementById("upc").value = selectedItem["UPC"];
        document.getElementById("status").checked = selectedItem["Status"];
        document.getElementById("pname").value = selectedItem["Name"];
        document.getElementById("itemdesc").value = selectedItem["Details"];
        document.getElementById("manfactid").value = selectedItem["ManFactID"];
        document.getElementById("serialnum").value = selectedItem["SerialNum"];
    }
    else if (pageName == "ordering.html"){
        // Generate DB
        if(document.cookie == ""){
        }
        else{
            orders = Retrieve("orders");
        }
        var selectedItem = orders[parseInt(this.className)];
        count = 0;
        UPCsandQuant = []
        selectedItem["ItemUPC"].forEach(upc => {
            UPCsandQuant.push(`${selectedItem["ItemQuantity"][count]}x${upc}`);
            count++;
        })

        document.getElementById("custFirst").value = selectedItem["CustomerFirst"];
        document.getElementById("custLast").value = selectedItem["CustomerLast"];
        document.getElementById("custInv").value = selectedItem["InvoiceID"];
        document.getElementById("ordUPC").value = UPCsandQuant;
        document.getElementById("ordDate").value = selectedItem["OrderDate"];
    }
    else if (pageName == "suppliers.html"){
        // Generate DB
        if(document.cookie == ""){
        }
        else{
            Suppliers = Retrieve("orders");
        }
        var selectedItem = Suppliers[parseInt(this.className)];

        document.getElementById("supID").value = selectedItem["SupplierID"];
        document.getElementById("supName").value = selectedItem["Name"];
        document.getElementById("supStreet").value = selectedItem["Street"];
        document.getElementById("supCity").value = selectedItem["City"];
        document.getElementById("supProv").value = selectedItem["Province"];
        document.getElementById("supPost").value = selectedItem["PostCode"];
        document.getElementById("supPhone").value = selectedItem["PhoneNumber"];
    }

};

function ArchiveRecord(){
    let archivedRecords = [];
    var pageName = window.location.pathname.split("/").pop();
    // Live/ Local
    if(document.cookie == ""){
        itemsOnHand = JoinDB(onHandInventory, items, "UPC");
    }
    else{
        if(pageName == "inventory.html"){
            itemsOnHand = JoinDB(Retrieve("itemsOnHand"), Retrieve("items"), "UPC");
        }
        if(pageName == "items.html"){
            items = Retrieve("items");
            // itemsonhand?

        }
    }
    cancel = confirm("Are you sure you want to delete this index?");
    if(!cancel) return;
    // Page Differences
    if (pageName == "inventory.html"){
        // Splice the archived item from the list. Add it to archived records.
        archivedRecords.push(itemsOnHand.splice((parseInt(this.className)), 1));
        Store("itemsOnHand", itemsOnHand, 1);
        RefreshInventoryDisplayedData();
        ButtonFunctionality();
    }
    else if(pageName == "items.html"){
        archivedRecords.push(items.splice(parseInt(this.className), 1));
        Store("items", items, 1);
        RefreshItemsDisplayedData();
        ButtonFunctionality();
    }
    if (pageName == "suppliers.html"){
        // Splice the archived item from the list. Add it to archived records.
        archivedRecords.push(Suppliers.splice((parseInt(this.className)), 1));
        Store("suppliers", Suppliers, 1);
        RefreshSuppliers();
        ButtonFunctionality();
    }
    else if(pageName == "ordering.html"){
        archivedRecords.push(orders.splice(parseInt(this.className), 1));
        Store("orders", orders, 1);
        refreshOrders();
        ButtonFunctionality();
    }
    
}

// Prevent forms from reloading page.
// var forms = document.getElementsByTagName("form");
// function handleForm(event) { event.preventDefault(); } 
// forms.forEach(form => function(){
//     form.addEventListener('submit', handleForm);
// });


