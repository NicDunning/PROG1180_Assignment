
//Declare Variables.
d = new Date();
datestring = d.getFullYear().toString().padStart(4, '0') + '-' + (d.getMonth()+1).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');
contactUs = "If you think this is incorrect please contact your Database Administrator.";
missing = "Entry fields cannot be blank. Please check your field to make sure they contain values.";
itemExists = "An Item already exists with that UPC. Did you make a typo?";

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
        "ManFactID" : 1,
        "SerialNum" : 20000
    }
    ,
    {
        "UPC" : 123456789014,
        "Status" : true,
        "Name" : "Screw",
        "Details" : "Philips Head Size 2",
        "ManFactID" : 2,
        "SerialNum" : 30000
    }
    // Template for items
    // ,
    // {
    //     "UPC" : ,
    //     "Status" : ,
    //     "Name" : "",
    //     "Details" : "",
    //     "ManFactID" : ,
    //     "SerialNum" : 
    // }
]

Suppliers = [
    {
        "SupplierID" : 0,
        "Name" : "WrenchGuyz",
        "Street" : "Jacobson Way",
        "City" : "Toronto",
        "Province" : "Ontario",
        "PostCode" : "L3S2R4",
        "PhoneNumber" : "123-456-7890"
    }
    ,
    {
        "SupplierID" : 1,
        "Name" : "DriverBoyz",
        "Street" : "Alabama Court",
        "City" : "Buffalo",
        "Province" : "Saskachewan",
        "PostCode" : "A1D4S2",
        "PhoneNumber" : "987-654-3210"
    }
    ,
    {
        "SupplierID" : 2,
        "Name" : "ScrewBallz",
        "Street" : "Mackay Avenue",
        "City" : "TimbuckToo",
        "Province" : "Quebec",
        "PostCode" : "D2R9V4",
        "PhoneNumber" : "132-435-4657"
    }
    // Template for Suppliers
    // ,
    // {
    //     "SupplierID" : 2,
    //     "Name" : "ScrewBallz",
    //     "Street" : "Mackay Avenue",
    //     "City" : "TimbuckToo",
    //     "Province" : "Quebec",
    //     "PostCode" : "D2R9V4",
    //     "PhoneNumber" : "132-435-4657"
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
        "UPC" : 123456789014,
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

orders = [
    {
        "InvoiceID" : 1001,
        "OrderDate" : d.getFullYear().toString().padStart(4, '0') + '-' + (d.getMonth()+1).toString().padStart(2, '0') + '-' + (d.getDate()-1).toString().padStart(2, '0'),
        "CustomerFirst" : "James",
        "CustomerLast" : "Jones",
        "ItemUPC" : ["123456789012", "123456789013"],
        "ItemQuantity" : [4, 2]
    },
    {
        "InvoiceID" : 1002,
        "OrderDate" : datestring,
        "CustomerFirst" : "John",
        "CustomerLast" : "Jackson",
        "ItemUPC" : ["123456789013"],
        "ItemQuantity" : [2]
    },
    {
        "InvoiceID" : 1004,
        "OrderDate" : datestring,
        "CustomerFirst" : "Jamie",
        "CustomerLast" : "Jameson",
        "ItemUPC" : ["123456789012"],
        "ItemQuantity" : [2]
    }
    // {
    //     "InvoiceID" : "",
    //     "OrderDate" : "",
    //     "CustomerID" : "",
    //     "ItemUPC" : "",
    //     "ItemQuantity" : ,
    //     "OrderDetails" : ""
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
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return "";
}

function SortByUPC(list, sort){
    list.sort(function comparefn(a, b){
        if(a["UPC"] > b["UPC"]){return sort ? 1 : -1}
        if(b["UPC"] > a["UPC"]){return sort ? -1 : 1}
        if(a["UPC"] = b["UPC"]){return 0}
    });
    return list;
}

function SortByDate(list, sort){
    list.sort(function comparefn(a, b){
        if(a["DateReceived"] > b["DateReceived"]){return sort ? 1 : -1}
        if(b["DateReceived"] > a["DateReceived"]){return sort ? -1 : 1}
        if(a["DateReceived"] = b["DateReceived"]){return 0}
    });
    return list;
}

function SortInventoryOnHand(list, sort, sortBy){
    list.sort(function comparefn(a, b){
        if(a[sortBy] > b[sortBy]){return sort ? 1 : -1}
        if(b[sortBy] > a[sortBy]){return sort ? -1 : 1}
        if(a[sortBy] = b[sortBy]){return 0}
    });
    return list;
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

    // Validation
    index = -1;
    onHandInv.forEach( item => {
        if((item["UPC"] == UPC) && (item["DateReceived"] == dateReceived)){
            index = onHandInv.indexOf(item);
        }
    })
    if(index != -1){
        return "Item has already been recorded as ordered for that day. Please update the existing record rather than adding a new one. " + contactUs;
    }
    if(UPC == "" || qtyOnHand == "" || cost == "" ||  dateReceived == ""){
        return missing + ' ' + contactUs;
    };
    onHandInv.forEach( item => {
        if((item["UPC"] == UPC)){
            index = onHandInv.indexOf(item);
        }
    })
    if(index == -1){
        return "There are no items currently that exist with that UPC code. Please check to make sure your items exists or if your data is correct. " + contactUs;
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
        return itemExists + ' ' + contactUs;
    }
    if(UPC == "" || status == "" || name == "" ||  details == "" || manFactID == "" || serialNum == ""){
        return missing + ' ' + contactUs;
    };

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

function addOrder(invoiceID, UPC, itemQuantity, orderDate, customerFirst, customerLast) {
    let funcStatus = "Failed to add order."

    // pull down array of Orders
    if(document.cookie != ""){
        orders = Retrieve("orders");
    }
    else{
    }

    // check for duplicate invoice
    // Validation
    index = -1;
    orders.forEach( item => {
        if((item["InvoiceID"] == invoiceID)){
            index = orders.indexOf(item);
        }
    })
    if(index != -1){
        return "That Invoice already Exists. Please enter a different number " + contactUs;
    }
    if(invoiceID == "" || UPC == "" || itemQuantity == "" ||  orderDate == "" || customerFirst == "" || customerLast == ""){
        return missing + ' ' + contactUs;
    };

    // Not sure why this doesnt work
    console.log(undefined in UPC);

    UPC.forEach(value => {
        if((typeof value) != String){
            return `You are missing 1 or more UPCs Please make sure you've entered your data correctly. `+ contactUs;
        }
    });

    itemQuantity.forEach(value => {
        if((typeof value) != String){
            return `You are missing 1 or more Item Quantities Please make sure you've entered your data correctly. `+ contactUs;
        }
    });
        

    // build new object
    let newOrder = 
    {
        "InvoiceID" : invoiceID,
        "OrderDate" : orderDate,
        "CustomerFirst" : customerFirst,
        "CustomerLast" : customerLast,
        "ItemUPC" : UPC,
        "ItemQuantity" : itemQuantity
    };

    // add to invoices array
    orders.push(newOrder)
    if(document.cookie == ""){
    }
    else{
        Store("orders", orders, 1);
    }
    

    // return array to JSON
    // idk man make Nic do it lol
    // if (success) {
        funcStatus = "Invoice added successfully."
    // }
    return funcStatus
}

function editOrder(invoiceID, UPC, itemQuantity, orderDate, customerFirst, customerLast) {
    let funcStatus = "Failed to edit product."
    // pull down array of Orders
    if(document.cookie != ""){
        orders = Retrieve("orders");
    }
    else{
    }
    // check for missing product in array and store index for slice
    index = -1;
    orders.forEach( order => {
        if((order["InvoiceID"] == invoiceID)){
            index = orders.indexOf(order);
        }
    })
    if (index === -1) {return("indexing error in orders table.")}

    // slice product from array
    orders[index] =
    {
        "InvoiceID" : invoiceID,
        "OrderDate" : orderDate,
        "CustomerFirst" : customerFirst,
        "CustomerLast" : customerLast,
        "ItemUPC" : UPC,
        "ItemQuantity" : itemQuantity
    };

    
    // // update product, ignoring any nulls
    // product["Status"] = status != null ? status : product["Status"]
    // product["Name"] = name != null ? name : product["Name"]
    // product["Details"] = details != null ? details : product["Details"]
    // product["ManFactID"] = manFactID != null ? manFactID : product["ManFactID"]
    // product["SerialNum"] = serialNum != null ? serialNum : product["SerialNum"]

    // return array to JSON
    if(document.cookie == ""){
    }
    else{
        Store("orders", orders, 1);
    }
    // if (success) {
    funcStatus = "Product updated successfully."
    // }
    return funcStatus
}

function addManufacturer(supID, supName, supStreet, supCity, supProv, supPost, supPhone) {
    let funcStatus = "Failed to add manufacturer."

    // pull down array of manufacturers
    if(document.cookie != ""){
        Suppliers = Retrieve("suppliers");
    }
    else{
    }
    // check for duplicate manufacturer
    // if (manufacturers.getIndex(manufacturer => manufacturer["Name"] === name) != -1) {
    //     let funcStatus = "This manufacturer is already in the system."
    //     return funcStatus
    // }

    // build new object
    let newSupplier = 
    {   "SupplierID" : supID,
        "Name" : supName,
        "Street" : supStreet,
        "City" : supCity,
        "Province" : supProv,
        "PostCode" : supPost,
        "PhoneNumber" : supPhone
    }

    // add to manufacturers array
    Suppliers.push(newSupplier);

    // return array to JSON
    // idk man make Nic do it lol
    if(document.cookie == ""){
    }
    else{
        Store("suppliers", Suppliers, 1);
    }
    // if (success) {
        funcStatus = "Manufacturer added successfully."
    // }
    return funcStatus
}

function editManufacturer(supID, supName, supStreet, supCity, supProv, supPost, supPhone) {
    let funcStatus = "Failed to edit manufacturer."
    // pull down array of manufacturers
    if(document.cookie != ""){
        Suppliers = Retrieve("suppliers");
    }
    else{
    }
    // check for missing manufacturer in array and store index for slice
    let index = Suppliers.findIndex(supplier => supplier["SupplierID"] == supID)
    if (index === -1) {
        funcStatus = "The manufacturer you are trying to edit does not exist."
        return funcStatus
    }


    // update manufacturer, ignoring any nulls
    Suppliers[index]= 
    {   "SupplierID" : supID,
        "Name" : supName,
        "Street" : supStreet,
        "City" : supCity,
        "Province" : supProv,
        "PostCode" : supPost,
        "PhoneNumber" : supPhone
    }
    // return array to JSON
    // idk man make Nic do it lol
    if(document.cookie == ""){
    }
    else{
        Store("suppliers", Suppliers, 1);
    }
    // if (success) {
    funcStatus = "Manufacturer updated successfully."
    // }
    return funcStatus
}