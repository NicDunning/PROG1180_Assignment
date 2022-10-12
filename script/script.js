document.onreadystatechange = function () {
    // Get name of HTML page.
    
    var pageName = window.location.pathname.split("/").pop();
    if (document.readyState == "interactive") {
        if(pageName = "inventory.html"){
            RefreshInventoryDisplayedData();
        }
    }
    // const navs = document.querySelectorAll("nav > a");
    // navs.forEach( link => {
    //     link.addEventListener("click", Store("db", itemsOnHand));
    // })
    
    // A tags in table have OnClick
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
        //<a href='' class='${JSON.stringify(itemsOnHand)}' >Edit</a>
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
    // Store the cookie.
    Store("db", itemsOnHand);
    Retrieve(); 
}

function sendToEdit(){
    console.log(JSON.parse(this.className));
    console.log(itemsOnHand[parseInt(this.className)]);
    upc = document.getElementById("upc");
    productName = document.getElementById("pname");
    itemDescription = document.getElementById("itemdesc");
    itemQuantity = document.getElementById("quan");

    selectedItem = itemsOnHand[parseInt(this.className)];
    upc.value = selectedItem["UPC"];
    productName.value = selectedItem["Name"];
    itemDescription.value = selectedItem["Details"];
    itemQuantity.value = selectedItem["QtyOnHand"]
}
