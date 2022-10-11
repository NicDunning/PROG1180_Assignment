// $(document).ready(function() {

//     // $('#tbInventory tr').click(function() {
//     //     var href = $(this).find("a").attr("href");
//     //     if(href) {
//     //         window.location = href;
//     //     }
//     // });

//     RefreshDisplayedData;
// });


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
    // Foreach value in headers make a column.
    tblInventoryHeaders.forEach(header => {
        tblInventoryHTML += `<th>${header}</th>`;
    });
    // Set innerHTML add table header.
    tblInventory.innerHTML += tblInventoryHTML + "</tr>";
    // Foreach key/ value pair in items dictionary[0]
    var itemRow = "<tr><td><a href='inventory.html'>Edit</a></td>";
    for (const [key, value] of Object.entries(items[0])){
        // If it is a displayed value.
        if(!(["Status", "ManFactID", "SerialNum"].includes(key))){
            // Add it to the row.
            itemRow += `<td>${value}</td>`;
        }
    }
    itemRow += "</tr>";
    // Add the row to the table.
    tblInventory.innerHTML += itemRow; 


    
}
