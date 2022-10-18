
//Declare Variables.
d = new Date();
datestring = d.getFullYear().toString().padStart(4, '0') + '-' + (d.getMonth()+1).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');
contactUs = "If you think this is incorrect please contact your Database Administrator.";

items = [
    {
        "UPC" : 123456789012,
        "Status" : true,
        "Name" : "Wrench",
        "Details" : "12-Inch Wrench",
        "ManFactID" : 0,
        "SerialNum" : 10000
    }
    ,
    {
        "UPC" : 123456789013,
        "Status" : false,
        "Name" : "Screw Driver",
        "Details" : "Phillips Head Size 2",
        "ManFactID" : 2,
        "SerialNum" : 20000
    }
    // Template for items
    // ,
    // {
    //     "UPC" : ,
    //     "Status" : ,
    //     "Name" : "",
    //     "Details" : "",
    //     "ManFactID" : ,
    //     "SerialNum" : ,
    //     "Quantity" : ,
    //     "Cost" :
    // }
]

manufacturers = [
    {
        "ID" : "0",
        "Name" : "WrenchGuyz",
        "Details" : "Sells Wrenches"
    }
    ,
    {
        "ID" : "1",
        "Name" : "DriverBoyz",
        "Details" : "Sells Screwdrivers"
    }
    // Template for manufacturers
    // ,
    // {
    //     "ID" : "",
    //     "Name" : "",
    //     "Details" : ""
    // }
]


onHandInventory = [
    {
        "UPC" : 123456789012,
        "QtyOnHand" : 10,
        "DateReceived" : datestring,
        "Cost" : 2.0
    }
    ,
    {
        "UPC" : 123456789013,
        "QtyOnHand" : 2,
        "DateReceived" : datestring,
        "Cost" : 2.5
    },
    {
        "UPC" : 123456789012,
        "QtyOnHand" : 4,
        "DateReceived" : d.getFullYear().toString().padStart(4, '0') + '-' + (d.getMonth()+1).toString().padStart(2, '0') + '-' + (d.getDate()-1).toString().padStart(2, '0'),
        "Cost" : 3
    },
    
    // Template for onHandInventory 
    // ,
    // {
    //     "UPC" : ,
    //     "QtyOnHand" : ,
    //     "DateReceived" : Date.now(),
    //     "Cost" :
    // }
]

invoice = [
    {
        "InvoiceID" : "1000",
        "OrderDate" : datestring,
        "AltSysCode" : "31342",
        "CustomerID" : "00001",
        "EmployeeID" : "004",
        "EquipmentID" : "00001"
    },
    {
        "InvoiceID" : "1001",
        "OrderDate" : datestring,
        "AltSysCode" : "24313",
        "CustomerID" : "00002",
        "EmployeeID" : "002",
        "EquipmentID" : "00003"
    },
    {
        "InvoiceID" : "1002",
        "OrderDate" : datestring,
        "AltSysCode" : "12452",
        "CustomerID" : "00003",
        "EmployeeID" : "003",
        "EquipmentID" : "00012"
    }
    // {
    //     "InvoiceID" : "",
    //     "OrderDate" : "",
    //     "AltSysCode" : "",
    //     "CustomerID" : "",
    //     "EmployeeID" : "",
    //     "EquipmentID" : ""
    // }
]

function Store(key, data, expireDays){
    const date = new Date();
    date.setTime(date.getTime() + (expireDays*24*60*60*1000));
    let expires = "expires="+ date.toUTCString();
    document.cookie = `${key} = ${JSON.stringify(data)};${expires};path=:/`;
}

function Retrieve(key){
    var cookies = {};
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            console.log(c.substring(name.length, c.length));
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return "";
}

function Delete(key){
    document.cookie = key +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// joiningDB is the child,  joinedDB is the parent.
function JoinDB(joiningDB, joinedDB, matchingKey){
    // Foreach record in database 1
    joiningDB.forEach(record1 => {
        // Foreach record in database 2
        joinedDB.forEach(record2 => {
            // If they both contain the matching key and they have the same value.
            if((record1[matchingKey] != undefined) && (record2[matchingKey] != undefined) && (record2[matchingKey] == record1[matchingKey])){
                for (const[key, value] of Object.entries(record2)){
                    if(!(key in record1)){
                        record1[key] = value;
                    }
                }
            }
        })
    });
    return(joiningDB);
}

function addInventoryItem(UPC, qtyOnHand, cost, dateReceived, invoiceID = -1, invoiceQTY = -1) {
    let funcStatus = "Failed to add item to inventory."

    

    // pull down invoice array
    // let invoices = JSON.parse("JSON STRING")
    // ensure invoice exists
    // if (invoices.findIndex(invoice => invoice["InvoiceID"] === invoiceID) === -1) {
    //     funcStatus = "Invoice does not exist. Please create invoice before adding items to inventory."
    //     return funcStatus
    // }

    let onHandInv = [];
    // pull down inventory arrays
    if(document.cookie != ""){
        onHandInv = Retrieve("itemsOnHand");
        items = Retrieve("items");
    }
    else{
        onHandInv = onHandInventory;
    }

    // ensure item is in products
    index = -1;
    onHandInv.forEach( item => {
        if((item["UPC"] == UPC) && (item["DateReceived"] == dateReceived)){
            index = onHandInv.indexOf(item);
        }
    })

    if(index != -1){
        return "Item has already been recorded as ordered for that day. Please update the existing record rather than adding a new one. " + contactUs;
    }
    
    // let orderInv = JSON.parse("JSON STRING")

    // check for duplicate item
    // if ((orderInv.findIndex(item => item["InvoiceId"] === invoiceID && item["UPC"] === UPC)) != -1) {
    //     funcStatus = "An item listing with this UPC from this invoice is already in the system."
    //     return funcStatus
    // }

    // construct new objects
    let newOnHandInvItem = {
        //"InvoiceID": invoiceID,
        "UPC": UPC,
        "QtyOnHand": qtyOnHand,
        "Cost": cost,
        "DateReceived": dateReceived
    }
    // let newOrderInvItem = {
    //     "InvoiceID": invoiceID,
    //     "UPC": UPC,
    //     "InvoiceQTY": invoiceQTY
    // }

    // push new objects into respective arrays
    onHandInv.push(newOnHandInvItem)
    
    // orderInv.push(newOrderInvItem)

    // return arrays to JSON
    // idk man make Nic do it lol

    if(document.cookie == ""){
        onHandInventory = onHandInv;
    }
    else{
        Store("itemsOnHand", onHandInv, 1);
    }
    
    // if (success) {
        funcStatus = "Item added successfully."
        return funcStatus
    // }
}

function editInventoryItem(UPC, qtyOnHand, cost, dateReceived,  invoiceID = -1, invoiceQTY = -1) {
    // pull down arrays
    let onHandInv = [];
    if(document.cookie != ""){
        onHandInv = Retrieve("itemsOnHand");
    }
    else{
        onHandInv = onHandInventory;
    }
    // orderInv = JSON.parse("JSON STRING")

    // Invoice ID can be nullable so we need to match for UPC and dateReceived then InvoiceID if it exists ( You wont have two of the same item invoiced at the same time ).
    // slice item from OnHandInv array
    index = -1;
    onHandInv.forEach( item => {
        if((item["UPC"] == UPC) && (item["DateReceived"] == dateReceived)){
            index = onHandInv.indexOf(item);
        }
    })
    // index = onHandInv.findIndex(item => (item["UPC"] === UPC && item["DateReceived" === dateReceived])); 
    if (index === -1) {return("editInventoryItem indexing error in OnHandInv table.")}
    // let onHandItem = onHandInv.slice(index, index + 1)

    onHandInv[index] = 
    {
        "UPC" : UPC,
        "QtyOnHand" : qtyOnHand,
        "DateReceived" : dateReceived,
        "Cost" : cost
    }
    // // update OnHandInv item, ignoring any nulls
    // onHandItem["QtyOnHand"] = qtyOnHand != null ? qtyOnHand : onHandItem["QtyOnHand"]
    // onHandItem["DateReceived"] = dateReceived != null ? dateReceived : onHandItem["DateReceived"]
    // onHandItem["Cost"] = cost != null ? cost : onHandItem["Cost"]

    // // slice item from OrderInv array
    // index = orderInv.findIndex(item => item["UPC"] === UPC && item["InvoiceID" === invoiceID]) 
    // if (index === -1) {throw new error("editInventoryItem indexing error in OrderInv table.")}
    // let orderInvItem = orderInv.slice(index, index + 1)
    // // update OrderInv item, ignoring any nulls
    // orderInvItem["InvoiceQTY"] = invoiceQTY != null ? invoiceQTY : orderInvItem["InvoiceQTY"]

    // update the JSON with updated arrays
    // idk man make Nic do it lol
    if(document.cookie == ""){
        onHandInventory = onHandInv;
    }
    else{
        Store("itemsOnHand", onHandInv, 1);
    }
    // if (success) {
        funcStatus = "Inventory item edited successfully."
        return funcStatus
    // }
}

function addProduct(UPC, status, name, details, manFactID, serialNum) {
    let funcStatus = "Failed to add product."
    // pull down array
    // let products = JSON.parse("JSON STRING")

    // check for duplicate item in array
    // if (products.findIndex(item => item["UPC"] === UPC) != -1) {
    //     funcStatus = "Item with this UPC already exists."
    //     return funcStatus
    // }

    let carriedItems = [];
    // pull down inventory arrays
    if(document.cookie != ""){
        carriedItems = Retrieve("items");
    }
    else{
        carriedItems = items;
    }

    // ensure item is in products
    index = -1;
    carriedItems.forEach( item => {
        if(item["UPC"] == UPC){
            index = carriedItems.indexOf(item);
        }
    })

    if(index != -1){
        return "An Item already exists with that UPC. Did you make a typo? " + contactUs;
    }

    // construct new item
    let newItem = {
        "UPC": UPC,
        "Status": status,
        "Name": name,
        "Details": details,
        "ManFactID": manFactID,
        "SerialNum": serialNum
    }

    // push to array
    carriedItems.push(newItem)

    if(document.cookie == ""){
        items = carriedItems;
    }
    else{
        Store("items", carriedItems, 1);
    }

    // return array to JSON
    // idk man make Nic do it lol
    // if (success) {
        funcStatus = "Item added successfully."
    // }
    return funcStatus
}

function editProduct(UPC, status, name, details, manFactID, serialNum) {
    let funcStatus = "Failed to edit product."
    // pull down array
    let products = [];
    if(document.cookie != ""){
        products = Retrieve("items");
    }
    else{
        products = items;
    }
    // check for missing product in array and store index for slice
    index = -1;
    products.forEach( item => {
        if((item["UPC"] == UPC)){
            index = products.indexOf(item);
        }
    })
    if (index === -1) {return("editInventoryItem indexing error in OnHandInv table.")}

    console.log(status);

    // slice product from array
    products[index] =
    {
        "UPC" : UPC,
        "Status" : status,
        "Name" : name,
        "Details" : details,
        "ManFactID" : manFactID,
        "SerialNum" : serialNum
    }

    
    // // update product, ignoring any nulls
    // product["Status"] = status != null ? status : product["Status"]
    // product["Name"] = name != null ? name : product["Name"]
    // product["Details"] = details != null ? details : product["Details"]
    // product["ManFactID"] = manFactID != null ? manFactID : product["ManFactID"]
    // product["SerialNum"] = serialNum != null ? serialNum : product["SerialNum"]

    // return array to JSON
    if(document.cookie == ""){
        items = products;
    }
    else{
        Store("items", products, 1);
    }
    // if (success) {
    funcStatus = "Product updated successfully."
    // }
    return funcStatus
}