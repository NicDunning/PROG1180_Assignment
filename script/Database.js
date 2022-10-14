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
        "DateRecieved" : Date.now(),
        "Cost" : 2.0
    }
    ,
    {
        "UPC" : 123456789013,
        "QtyOnHand" : 2,
        "DateRecieved" : Date.now(),
        "Cost" : 2.5
    },
    {
        "UPC" : 123456789012,
        "QtyOnHand" : 4,
        "DateRecieved" : Date.now(),
        "Cost" : 3
    },
    
    // Template for onHandInventory 
    // ,
    // {
    //     "UPC" : ,
    //     "QtyOnHand" : ,
    //     "DateRecieved" : Date.now(),
    //     "Cost" :
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

    // pull down array of products
    let products = Retrieve("items");
    // ensure item is in products
    // if(products.findIndex(item => item["UPC"] === itemUPC) === -1) {
    //     funcStatus = "Item is not in list of products. Please add item to list of products before adding to inventory."
    //     return funcStatus
    // }

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
    }
    else{
        onHandInv = onHandInventory;
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

    if(document.cookie != ""){
        onHandInventory = onHandInv;
    }
    else{
        Store("itemsOnHand", onHandInv, 1/1440);
    }
    
    // if (success) {
        funcStatus = "Item added successfully."
        return funcStatus
    // }
}
