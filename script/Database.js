
//Declare Variables.
d = new Date();
datestring = d.getFullYear().toString().padStart(4, '0') + '-' + (d.getMonth()+1).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');
contactUs = "If you think this is incorrect please contact your Database Administrator.";
missing = "Entry fields cannot be blank. Please check your field to make sure they contain values.";
itemExists = "An Item already exists with at least one of those unique values. Did you make a typo?";
upcLength = "UPC's are exactly 12 numbers in length"

items = [
    {
        "UPC" : 123456789012,
        "Status" : true,
        "Name" : "Wrench",
        "Details" : "12-Inch Wrench",
        "ManFactID" : "WrenchGuyz",
        "SerialNum" : 10000
    }
    ,
    {
        "UPC" : 123456789013,
        "Status" : false,
        "Name" : "Screw Driver",
        "Details" : "Phillips Head Size 2",
        "ManFactID" : "DriverBoyz",
        "SerialNum" : 20000
    }
    ,
    {
        "UPC" : 123456789014,
        "Status" : true,
        "Name" : "Screw",
        "Details" : "Philips Head Size 2",
        "ManFactID" : "ScrewBallz",
        "SerialNum" : 30000
    },
    {
        "UPC" : 123456789017,
        "Status" : true,
        "Name" : "Screw",
        "Details" : "Philips Head Size 2",
        "ManFactID" : "ScrewBallz",
        "SerialNum" : 30000
    },
    {
        "UPC" : 123456789018,
        "Status" : true,
        "Name" : "Screw",
        "Details" : "Philips Head Size 2",
        "ManFactID" : "ScrewBallz",
        "SerialNum" : 30000
    },
    {
        "UPC" : 123456789019,
        "Status" : true,
        "Name" : "Screw",
        "Details" : "Philips Head Size 2",
        "ManFactID" : "ScrewBallz",
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
        "CustomerName" : "James Jones",
        "ItemUPC" : ["123456789012", "123456789013"],
        "ItemQuantity" : [4, 2]
    },
    {
        "InvoiceID" : 1002,
        "OrderDate" : datestring,
        "CustomerName" : "John Jackson",
        "ItemUPC" : ["123456789013"],
        "ItemQuantity" : [2]
    },
    {
        "InvoiceID" : 1004,
        "OrderDate" : datestring,
        "CustomerName" : "Jamie Jameson",
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

customers = [
    {
        "Name" : "Will Smith",
        "Street" : "1411 Jacobson Parkway",
        "City" : "Toronto",
        "Province" : "Ontario",
        "PostCode" : "L3S2R4",
        "PhoneNumber" : "123-456-7890"
    },
    {
        "Name" : "Tom Hanks",
        "Street" : "123 Walloughby Way",
        "City" : "Toronto",
        "Province" : "Ontario",
        "PostCode" : "L3S2R4",
        "PhoneNumber" : "123-456-7890"
    },
    {
        "Name" : "John Jackson",
        "Street" : "1411 Jacobson Parkway",
        "City" : "Toronto",
        "Province" : "Ontario",
        "PostCode" : "L3S2R4",
        "PhoneNumber" : "123-456-7890"
    },
    {
        "Name" : "Jamie Jameson",
        "Street" : "123 Walloughby Way",
        "City" : "Toronto",
        "Province" : "Ontario",
        "PostCode" : "L3S2R4",
        "PhoneNumber" : "123-456-7890"
    }
]

accounts = [
    {
        username : "nicd123",
        password : "passw0rd",
        lastlogin : "",
        lastlogout : "",
        isloggedin : true
    }
]

sales = [
    {
        "InvoiceID" : 1002,
        "CustomerName" : "John Jackson",
        "OrderDate" : datestring,
        "ItemUPC" : [123456789013],
        "ItemQuantity" : [2],
        "AltCode" : "1002"
    },
    {
        "InvoiceID" : 1001,
        "CustomerName" : "James Jones",
        "OrderDate" : d.getFullYear().toString().padStart(4, '0') + '-' + (d.getMonth()+1).toString().padStart(2, '0') + '-' + (d.getDate()-1).toString().padStart(2, '0'),
        "ItemUPC" : [123456789013],
        "ItemQuantity" : [2],
        "AltCode" : "1001"
    },
    {
        "InvoiceID" : 1004,
        "CustomerName" : "Jamie Jameson",
        "OrderDate" : datestring,
        "ItemUPC" : ["123456789012"],
        "ItemQuantity" : [2],
        "AltCode" : "1003"
    }

    
]

fakepp = [
    {
        "InvoiceID" : 1002,
        "CustomerName" : "John Jackson",
        "OrderDate" : datestring,
        "ItemUPC" : [123456789013],
        "ItemQuantity" : [2],
        "AltCode" : "1002"
    },
    {
        "Name" : "John Jackson",
        "Street" : "1411 Jacobson Parkway",
        "City" : "Toronto",
        "Province" : "Ontario",
        "PostCode" : "L3S2R4",
        "PhoneNumber" : "123-456-7890"
    },
    [{
        "UPC" : 123456789013,
        "Status" : false,
        "Name" : "Screw Driver",
        "Details" : "Phillips Head Size 2",
        "ManFactID" : "DriverBoyz",
        "SerialNum" : 20000
    }],
    [2]
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

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

function generateListForAutocomplete(list, requestedKey){
    var outputList = [];
    list.forEach(item => {
        for(var key in item){
            if(key == requestedKey){
                if(!(outputList.includes(item[key]))){
                    outputList.push(item[key].toString());
                }
                
            }
        }
    })
    return outputList;
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
    if(UPC.length !=12){
        return upcLength + ' ' + contactUs;
    }
    

    var today = new Date()
    var date = new Date(dateReceived)

    console.log(date.getFullYear(), today.getFullYear());

    if (date.getFullYear() > today.getFullYear()) {
        funcStatus = "Invalid date. Please input a date no later than today."
        return funcStatus
    }
    if ((date.getFullYear() == today.getFullYear()) && (date.getMonth() > today.getMonth())) {
        funcStatus = "Invalid date. Please input a date no later than today."
        return funcStatus
    }
    if ((date.getFullYear() == today.getFullYear()) && (date.getMonth() == today.getMonth()) && (date.getDate() > today.getDate())) {
        funcStatus = "Invalid date. Please input a date no later than today."
        return funcStatus
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

    if(UPC.length !=12){
        return upcLength + ' ' + contactUs;
    }



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
        if(item["SerialNum"] == serialNum){
            index = carriedItems.indexOf(item); 
        }
    })

    if(index != -1){
        return itemExists + ' (UPC or Serial Number) ' + contactUs;
    }
    if(UPC == "" || status == "" || name == "" ||  details == "" || manFactID == "" || serialNum == ""){
        return missing + ' ' + contactUs;
    };

    if(UPC.length !=12){
        return upcLength + ' ' + contactUs;
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

    if(UPC.length !=12){
        return upcLength + ' ' + contactUs;
    }

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

function addOrder(invoiceID, UPC, itemQuantity, orderDate, customerName) {
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
    if(invoiceID == "" || UPC == "" || itemQuantity == "" ||  orderDate == "" || customerName == ""){
        return missing + ' ' + contactUs;
    };

    var today = new Date()
    var date = new Date(orderDate)


    if (date.getFullYear() > today.getFullYear()) {
        funcStatus = "Invalid date. Please input a date no later than today."
        return funcStatus
    }
    if ((date.getFullYear() == today.getFullYear()) && (date.getMonth() > today.getMonth())) {
        funcStatus = "Invalid date. Please input a date no later than today."
        return funcStatus
    }
    if ((date.getFullYear() == today.getFullYear()) && (date.getMonth() == today.getMonth()) && (date.getDate() > today.getDate())) {
        funcStatus = "Invalid date. Please input a date no later than today."
        return funcStatus
    }

    // if(UPC.length !=12){
    //     return upcLength + ' ' + contactUs;
    // }

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
        "CustomerName" : customerName,
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

function editOrder(invoiceID, UPC, itemQuantity, orderDate, customerFirst) {
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
    UPC.forEach(c => {
        if(c.length !=12){
            return upcLength + ' ' + contactUs;
        }
    })
    

    // slice product from array
    orders[index] =
    {
        "InvoiceID" : invoiceID,
        "OrderDate" : orderDate,
        "CustomerName" : customerFirst,
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

function addManufacturer(supName, supStreet, supCity, supProv, supPost, supPhone) {
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
    index = -1;
    Suppliers.forEach( item => {
        // console.log(item, supID, supName);
        if((item["Name"] == supName)){
            index = Suppliers.indexOf(item);
        }
    })

    if(index != -1){
        return "A Manufacturer already exists with that Supplier Name " + contactUs;
    }

    // build new object
    let newSupplier = 
    {
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

function editManufacturer(supName, supStreet, supCity, supProv, supPost, supPhone) {
    let funcStatus = "Failed to edit manufacturer."
    // pull down array of manufacturers
    if(document.cookie != ""){
        Suppliers = Retrieve("suppliers");
    }
    else{
    }
    // check for missing manufacturer in array and store index for slice
    let index = Suppliers.findIndex(supplier => supplier["Name"] == supName)
    if (index === -1) {
        funcStatus = "The manufacturer you are trying to edit does not exist."
        return funcStatus
    }


    // update manufacturer, ignoring any nulls
    Suppliers[index]= 
    {
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

function addCustomer(custName, custStreet, custCity, custProv, custPost, custPhone) {
    let funcStatus = "Failed to add customer."

    // pull down array of manufacturers
    if(document.cookie != ""){
        customers = Retrieve("customers");
    }
    else{
    }
    // check for duplicate manufacturer
    // if (manufacturers.getIndex(manufacturer => manufacturer["Name"] === name) != -1) {
    //     let funcStatus = "This manufacturer is already in the system."
    //     return funcStatus
    // }
    index = -1;
    customers.forEach( item => {
        // console.log(item, custID, custName);
        if((item["Name"] == custName)){
            index = customers.indexOf(item);
        }
    })

    // if(index != -1){
    //     return "A Custmer already exists with that Name " + contactUs;
    // }

    // build new object
    let newcustplier = 
    {
        "Name" : custName,
        "Street" : custStreet,
        "City" : custCity,
        "Province" : custProv,
        "PostCode" : custPost,
        "PhoneNumber" : custPhone
    }

    // add to manufacturers array
    customers.push(newcustplier);

    // return array to JSON
    // idk man make Nic do it lol
    if(document.cookie == ""){
    }
    else{
        Store("customers", customers, 1);
    }
    // if (success) {
        funcStatus = "Customer added successfully."
    // }
    return funcStatus
}

function editCustomer(custName, custStreet, custCity, custProv, custPost, custPhone) {
    let funcStatus = "Failed to edit customer."
    // pull down array of manufacturers
    if(document.cookie != ""){
        customers = Retrieve("customers");
    }
    else{
    }
    // check for missing manufacturer in array and store index for slice
    let index = customers.findIndex(customer => customer["Name"] == custName)
    if (index === -1) {
        funcStatus = "The customer you are trying to edit does not exist."
        return funcStatus
    }


    // update manufacturer, ignoring any nulls
    customers[index]= 
    {
        "Name" : custName,
        "Street" : custStreet,
        "City" : custCity,
        "Province" : custProv,
        "PostCode" : custPost,
        "PhoneNumber" : custPhone
    }
    // return array to JSON
    // idk man make Nic do it lol
    if(document.cookie == ""){
    }
    else{
        Store("customers", customers, 1);
    }
    // if (success) {
    funcStatus = "Customer updated successfully."
    // }
    return funcStatus
}

function addSale(invoiceID, UPC, itemQuantity, orderDate, customerName, altcode) {
    let funcStatus = "Failed to add sale."

    // pull down array of Sales
    if(document.cookie != ""){
        sales = Retrieve("sales");
    }
    else{
    }

    // check for duplicate invoice
    // Validation
    index = -1;
    sales.forEach( item => {
        if((item["InvoiceID"] == invoiceID)){
            index = sales.indexOf(item);
        }
    })
    if(index != -1){
        return "That Invoice already Exists. Please enter a different number " + contactUs;
    }
    if(invoiceID == "" || UPC == "" || itemQuantity == "" ||  orderDate == "" || customerName == ""){
        return missing + ' ' + contactUs;
    };

    var today = new Date()
    var date = new Date(orderDate)


    if (date.getFullYear() > today.getFullYear()) {
        funcStatus = "Invalid date. Please input a date no later than today."
        return funcStatus
    }
    if ((date.getFullYear() == today.getFullYear()) && (date.getMonth() > today.getMonth())) {
        funcStatus = "Invalid date. Please input a date no later than today."
        return funcStatus
    }
    if ((date.getFullYear() == today.getFullYear()) && (date.getMonth() == today.getMonth()) && (date.getDate() > today.getDate())) {
        funcStatus = "Invalid date. Please input a date no later than today."
        return funcStatus
    }

    // if(UPC.length !=12){
    //     return upcLength + ' ' + contactUs;
    // }

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
    let newSale = 
    {
        "InvoiceID" : invoiceID,
        "OrderDate" : orderDate,
        "CustomerName" : customerName,
        "ItemUPC" : UPC,
        "ItemQuantity" : itemQuantity,
        "AltCode": altcode
    };

    // add to invoices array
    sales.push(newSale)
    if(document.cookie == ""){
    }
    else{
        Store("sales", sales, 1);
    }
    

    // return array to JSON
    // idk man make Nic do it lol
    // if (success) {
        funcStatus = "Invoice added successfully."
    // }
    return funcStatus
}

function editSale(invoiceID, UPC, itemQuantity, orderDate, customerFirst, altcode) {
    let funcStatus = "Failed to edit product."
    // pull down array of Sales
    if(document.cookie != ""){
        sales = Retrieve("sales");
    }
    else{
    }
    // check for missing product in array and store index for slice
    index = -1;
    sales.forEach( sale => {
        if((sale["InvoiceID"] == invoiceID)){
            index = sales.indexOf(sale);
        }
    })
    if (index === -1) {return("indexing error in sales table.")}
    UPC.forEach(c => {
        if(c.length !=12){
            return upcLength + ' ' + contactUs;
        }
    })
    

    // slice product from array
    sales[index] =
    {
        "InvoiceID" : invoiceID,
        "OrderDate" : orderDate,
        "CustomerName" : customerFirst,
        "ItemUPC" : UPC,
        "ItemQuantity" : itemQuantity,
        "AltCode" : altcode
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
        Store("sales", sales, 1);
    }
    // if (success) {
    funcStatus = "Product updated successfully."
    // }
    return funcStatus
}
