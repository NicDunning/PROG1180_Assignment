document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        RefreshDisplayedData();
    }
}

function RefreshDisplayedData(){
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
    itemsOnHand = JoinDB(onHandInventory, items, "UPC");
    // Foreach item on hand
    itemsOnHand.forEach(item => {
        itemRow += "<tr><td><a href='inventory.html'>Edit</a></td>";
        for (const [key, value] of Object.entries(item)){
            // If it is not a blacklisted value.
            if(!(blacklist.includes(key))){
                // Add it to the row.
                itemRow += `<td>${value}</td>`;
            }
        }
        itemRow += "</tr>";
    });
    
    // Add the row to the table.
    tblInventory.innerHTML += itemRow;    
}
