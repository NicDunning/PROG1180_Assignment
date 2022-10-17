document.onreadystatechange = function () {
    // Get name of HTML page.
    
    var pageName = window.location.pathname.split("/").pop();
    console.log(pageName);
    if (document.readyState == "interactive") {
        if(pageName == "inventory.html" || pageName == "test.html"){
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
                    manufacturers = Retrieve("manufacturers");
                }
                // Do the adding to DB.
                
                var newOnHandItem = {};
                newOnHandItem["UPC"] = document.getElementById("upc").value;
                newOnHandItem["QtyOnHand"] = document.getElementById("quan").value;
                newOnHandItem["DateReceived"] = document.getElementById("date").value;
                newOnHandItem["Cost"] = document.getElementById("cost").value;
                console.log(addInventoryItem(newOnHandItem["UPC"], newOnHandItem["QtyOnHand"], newOnHandItem["Cost"], newOnHandItem["DateReceived"]));
                RefreshInventoryDisplayedData();
            });

            btnCommit = document.getElementById("btnSubmit");
            // On btn click retrieve stored data, modify data, redisplay data
            btnCommit.addEventListener("click", function(){
                upc = document.getElementById("upc").value;
                quantity = document.getElementById("quan").value;
                dateReceived = document.getElementById("date").value;
                cost = document.getElementById("cost").value;
                

                console.log(editInventoryItem(upc, quantity, cost, dateReceived));
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
                    manufacturers = Retrieve("manufacturers");
                }
                // Do the adding to DB.
                
                var newItem = {};
                newItem["UPC"] = document.getElementById("upc").value;
                newItem["Status"] = document.getElementById("status").checked;
                newItem["Name"] = document.getElementById("pname").value;
                newItem["Details"] = document.getElementById("itemdesc").value;
                newItem["ManFactID"] = document.getElementById("manfactid").value;
                newItem["SerialNum"] = document.getElementById("serialnum").value;
                
                console.log(addProduct(newItem["UPC"], newItem["Status"], newItem["Name"], newItem["Details"], newItem["ManFactID"], newItem["SerialNum"]));
                RefreshItemsDisplayedData();
            });

            btnCommit.addEventListener("click", function(){
                upc = document.getElementById("upc").value;
                Status = document.getElementById("status").checked;
                Name = document.getElementById("pname").value;
                details = document.getElementById("itemdesc").value;
                manfactid = document.getElementById("manfactid").value;
                serialnum = document.getElementById("serialnum").value;

                console.log(editProduct(upc, Status, Name, details, manfactid, serialnum));
                RefreshItemsDisplayedData();
            })
            RefreshItemsDisplayedData();
            ButtonFunctionality();
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
    var tblInventoryHeaders = ["UPC", "Product", "Details", "Quantity", "Price", "Modify"];
    var tblInventoryHTML = "<tr>";
    
    tblInventory.innerHTML = "";
    // Foreach value in headers make a column.
    tblInventoryHeaders.forEach(header => {
        tblInventoryHTML += `<th>${header}</th>`;
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
        manufacturers = Retrieve("manufacturers");
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
        +`<td><input type="submit" value="Edit" class="${counter} edit">` 
        + `<input type="submit" value="Delete" class="${counter} delete"></td></tr>`
        counter++;
    });
    
    // Add the row to the table.
    tblInventory.innerHTML += itemRow;   
    // Store the cookies.
    Store("itemsOnHand", itemsOnHand, 1);
    Store("items", items, 1);
    Store("manufacturers", manufacturers, 1);
    ButtonFunctionality();
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
        tblInventoryHTML += `<th>${header}</th>`;
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
    Store("manufacturers", manufacturers, 1);
    ButtonFunctionality();
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
        console.log(selectedItem["DateReceived"]);

        document.getElementById("upc").value = selectedItem["UPC"];
        document.getElementById("quan").value = selectedItem["QtyOnHand"];
        document.getElementById("date").value = String(selectedItem["DateReceived"]);
        document.getElementById("cost").value = selectedItem["Cost"];
    }
    else if (pageName == "items.html"){
        // Generate DB
        if(document.cookie == ""){
            var itemsDB = items;
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
        }
    }
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
}


