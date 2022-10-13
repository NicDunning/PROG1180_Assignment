document.onreadystatechange = function () {
    // Get name of HTML page.
    
    var pageName = window.location.pathname.split("/").pop();
    if (document.readyState == "interactive") {
        if(pageName = "inventory.html"){
            RefreshInventoryDisplayedData();

            btnNew = document.getElementById("btnNew");
            // On button click retrieve data, add data, store data.
            btnNew.addEventListener("click", function(){
                // Comment swap these next 4 line for live server.
                // var itemsOnHand = Retrieve("itemsOnHand");
                // var items = Retrieve("items");
                // var manufacturers = Retrieve("manufacturers");
                var itemsOnHand = JoinDB(onHandInventory, items, "UPC");
                // Do the adding to DB.
                
                var newitem = {};
                newitem["UPC"] : document.getElementById("upc").value;
                newitem["QtyOnHand"] = document.getElementById("quan").value;
                newitem["DateRecieved"] = Date.now();
                newitem["Cost"] = document.getElementById("cost").value};
                if(itemsOnHand.indexOf(newitem)){
                    console.log(newitem);
                }
                Console.log(addInventoryItem(newitem["UPC"], newitem["QtyOnHand"], newitem["Cost"], newitem["DateRecieved"]));
            });
        
            // buttons in table have OnClick
            editButtons = document.querySelectorAll("td > input");
            editButtons.forEach( button => {
                button.addEventListener("click", sendToEdit);
            })
        }
    }
}

function RefreshInventoryDisplayedData(){
    // Init Variables
    const tblInventory = document.getElementById("tbInventory");
    var tblInventoryHeaders = ["Edit", "UPC", "Product", "Details", "Quantity", "Price"];
    var tblInventoryHTML = "<tr>";
    const blacklist = ["Status", "ManFactID", "SerialNum", "DateRecieved"];
    // Foreach value in headers make a column.
    tblInventoryHeaders.forEach(header => {
        tblInventoryHTML += `<th>${header}</th>`;
    });
    // Set innerHTML add table header.
    tblInventory.innerHTML += tblInventoryHTML + "</tr>";
    var itemRow = "";
    // Generate Joined DB
    var itemsOnHand = JoinDB(onHandInventory, items, "UPC");
    // Foreach item on hand
    var counter = 0;
    itemsOnHand.forEach(item => {
        itemRow += `<tr><td><input type="submit" value="Edit" class="${counter}"</td>`;
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
}

function sendToEdit(){
    var itemsOnHand = JoinDB(onHandInventory, items, "UPC");
    var selectedItem = itemsOnHand[parseInt(this.className)];
    document.getElementById("upc").value = selectedItem["UPC"];
    document.getElementById("pname").value = selectedItem["Name"];;
    document.getElementById("itemdesc").value = selectedItem["Details"];
    document.getElementById("quan").value = selectedItem["QtyOnHand"];
    document.getElementById("cost").value = selectedItem["Cost"];
};
