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
                    var itemsOnHand = JoinDB(onHandInventory, items, "UPC");
                }
                else{
                    var itemsOnHand = Retrieve("itemsOnHand");
                    var items = Retrieve("items");
                    var manufacturers = Retrieve("manufacturers");
                }
                // Do the adding to DB.
                
                var newOnHandItem = {};
                newOnHandItem["UPC"] = document.getElementById("upc").value;
                newOnHandItem["QtyOnHand"] = document.getElementById("quan").value;
                newOnHandItem["DateRecieved"] = Date.now();
                newOnHandItem["Cost"] = document.getElementById("cost").value;
                console.log(addInventoryItem(newOnHandItem["UPC"], newOnHandItem["QtyOnHand"], newOnHandItem["Cost"], newOnHandItem["DateRecieved"]));
                RefreshInventoryDisplayedData();
            });
        
            // buttons in table have OnClick
            ButtonFunctionality();
        }

        if(pageName == "items.html"){
            btnNew.addEventListener("click", function(){
                if(document.cookie == ""){

                }
                else{
                    var itemsOnHand = Retrieve("itemsOnHand");
                    var items = Retrieve("items");
                    var manufacturers = Retrieve("manufacturers");
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
            RefreshItemsDisplayedData();
            ButtonFunctionality();
        }
    }
}

function ButtonFunctionality(){
    // buttons in table have OnClick
    editButtons = document.querySelectorAll("td > input");
    editButtons.forEach( button => {
        button.addEventListener("click", sendToEdit);
    })
}

function RefreshInventoryDisplayedData(){
    // Init Variables
    const tblInventory = document.getElementById("tbInventory");
    var tblInventoryHeaders = ["Edit", "UPC", "Product", "Details", "Quantity", "Price"];
    var tblInventoryHTML = "<tr>";
    const blacklist = ["Status", "ManFactID", "SerialNum", "DateRecieved"];
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
        var itemsOnHand = JoinDB(onHandInventory, items, "UPC");
    }
    else{
        var itemsOnHand = JoinDB(Retrieve("itemsOnHand"), Retrieve("items"), "UPC");
    }
    
    // Foreach item on hand
    var counter = 0;
    itemsOnHand.forEach(item => {
        itemRow += `<tr><td><input type="submit" value="Edit" class="${counter} edit">` 
        + `<input type="submit" value="Delete" class="${counter} delete"></td>`;
        counter++;
        itemRow += `<td>${item["UPC"]}</td>`
        +`<td>${item["Name"]}</td>`
        +`<td>${item["Details"]}</td>`
        +`<td>${item["QtyOnHand"]}</td>`
        +`<td>${item["Cost"]}</td></tr>`
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
    var tblInventoryHeaders = ["Edit", "UPC", "Status", "Name", "Details", "ManFactID", "SerialNum"];
    var tblInventoryHTML = "<tr>";
    const blacklist = ["Status", "ManFactID", "SerialNum", "DateRecieved"];
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
        var items = Retrieve("items");
    }
    
    // Foreach item on hand
    var counter = 0;
    items.forEach(item => {
        itemRow += `<tr><td><input type="submit" value="Edit" class="${counter} edit">` 
        + `<input type="submit" value="Delete" class="${counter} delete"></td>`;
        counter++;
        itemRow += `<td>${item["UPC"]}</td>`
        +`<td>${item["Status"]}</td>`
        +`<td>${item["Name"]}</td>`
        +`<td>${item["Details"]}</td>`
        +`<td>${item["ManFactID"]}</td>`
        +`<td>${item["SerialNum"]}</td></tr>`
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
            var itemsOnHand = JoinDB(onHandInventory, items, "UPC");
        }
        else{
            var itemsOnHand = JoinDB(Retrieve("itemsOnHand"), Retrieve("items"), "UPC");
        }
        var selectedItem = itemsOnHand[parseInt(this.className)];
        document.getElementById("upc").value = selectedItem["UPC"];
        document.getElementById("quan").value = selectedItem["QtyOnHand"];
        document.getElementById("cost").value = selectedItem["Cost"];
    }
    else if (pageName == "items.html"){
        // Generate DB
        itemsDB = [];
        if(document.cookie == ""){
            itemsDB = items;
        }
        else{
            var itemsDB = Retrieve("items");
        }
        var selectedItem = itemsDB[parseInt(this.className)];
        document.getElementById("upc").value = selectedItem["UPC"];
        document.getElementById("pname").value = selectedItem["Name"];
        document.getElementById("itemdesc").value = selectedItem["Details"];
        document.getElementById("manfactid").value = selectedItem["ManFactID"];
        document.getElementById("serialnum").value = selectedItem["SerialNum"];
    }
};
