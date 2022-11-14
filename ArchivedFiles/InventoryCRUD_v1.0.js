/***********************
* PRODUCT INTERACTIONS *
***********************/
function searchProducts(UPC, status, name, details, manFactID, serialNum) {
    // initialize output array
    let products = JSON.parse("JSON STRING")
    let output = []

    // if product matches all provided criteria, add it to output
    for (product of products) {
        if (
            (UPC == null       || UPC == product["UPC"]) &&
            (status == null    || status == product["Status"]) &&
            (name == null      || name == product["Name"]) &&
            (details == null   || details == product["Details"]) &&
            (manFactID == null || manFactID == product["ManFactID"]) &&
            (serialNum == null || serialNum == product["SerialNum"])
        ) { output.push(product) }
    }

    return output
}

function addProduct(UPC, status, name, details, manFactID, serialNum) {
    let funcStatus = "Failed to add product."
    // pull down array
    let products = JSON.parse("JSON STRING")

    // check for duplicate item in array
    if (products.findIndex(item => item["UPC"] === UPC) != -1) {
        funcStatus = "Item with this UPC already exists."
        return funcStatus
    }

    // construct new item
    let newProduct = {
        "UPC": UPC,
        "Status": status,
        "Name": name,
        "Details": details,
        "ManFactID": manFactID,
        "SerialNum": serialNum
    }

    // push to array
    products.push(newProduct)

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
    let products = JSON.parse("JSON STRING")

    // check for missing product in array and store index for slice
    let index = products.findIndex(item => item["UPC"] === UPC)
    if (index === -1) {
        funcStatus = "No item with this UPC exists."
        return funcStatus
    }

    // slice product from array
    let product = products.slice(index, index + 1)

    // update product, ignoring any nulls
    product["Status"] = status != null ? status : product["Status"]
    product["Name"] = name != null ? name : product["Name"]
    product["Details"] = details != null ? details : product["Details"]
    product["ManFactID"] = manFactID != null ? manFactID : product["ManFactID"]
    product["SerialNum"] = serialNum != null ? serialNum : product["SerialNum"]

    // return array to JSON
    // idk man make Nic do it lol
    // if (success) {
    funcStatus = "Product updated successfully."
    // }
    return funcStatus
}

function deleteProduct(UPC) {
    let funcStatus = "Failed to delete product"
    // pull down array
    let products = JSON.parse("JSON STRING")

    // check for missing product in array and store index for deletion
    let index = products.findIndex(item => item["UPC"] === UPC)
    if (index === -1) {
        funcStatus = "No item with this UPC exists."
        return funcStatus
    }

    // delete product
    products.splice(index, 1)

    // return array to JSON
    // idk man make Nic do it lol
    // if (success) {
    funcStatus = "Product deleted successfully."
    // }
    return funcStatus
}



/*************************
* INVENTORY INTERACTIONS *
*************************/
function searchInventory(UPC, name, details, quantity) {
    // build arrays
    let inventory = JSON.parse("JSON STRING")
    let output = []

    // if an inventory item matches all not-null criteria, add it to output
    for (item of inventory) {
        if (
            UPC != null          && UPC == item["UPC"] &&
            name != null         && name == item["Name"] &&
            details != null      && details == item["Details"] &&
            quantity != null     && quantity == item["QTY"]
        ) { output.push(item)}
    }

    return output
}

function addInventoryItem(invoiceID, UPC, QTY, quantity, cost, dateReceived) {
    let funcStatus = "Failed to add item to inventory."

    // pull down array of products
    let products = JSON.parse("JSON STRING")
    // ensure item is in products
    if(products.findIndex(item => item["UPC"] === itemUPC) === -1) {
        funcStatus = "Item is not in list of products. Please add item to list of products before adding to inventory."
        return funcStatus
    }

    // pull down invoice array
    let invoices = JSON.parse("JSON STRING")
    // ensure invoice exists
    if (invoices.findIndex(invoice => invoice["InvoiceID"] === invoiceID) === -1) {
        funcStatus = "Invoice does not exist. Please create invoice before adding items to inventory."
        return funcStatus
    }

    // pull down inventory arrays
    let onHandInv = JSON.parse("JSON STRING")
    let orderInv = JSON.parse("JSON STRING")

    // check for duplicate item
    if ((orderInv.findIndex(item => item["InvoiceId"] === invoiceID && item["UPC"] === UPC)) != -1) {
        funcStatus = "An item listing with this UPC from this invoice is already in the system."
        return funcStatus
    }

    // construct new objects
    let newOnHandInvItem = {
        "InvoiceID": invoiceID,
        "UPC": UPC,
        "QTY": QTY,
        "Cost": cost,
        "DateReceived": dateReceived
    }
    let newOrderInvItem = {
        "InvoiceID": invoiceID,
        "UPC": UPC,
        "Quantity": quantity
    }

    // push new objects into respective arrays
    onHandInv.push(newOnHandInvItem)
    orderInv.push(newOrderInvItem)

    // return arrays to JSON
    // idk man make Nic do it lol
    // if (success) {
        funcStatus = "Item added successfully."
        return funcStatus
    // }
}

function editInventoryItem(UPC, invoiceID, QTY, quantity, cost, dateReceived) {
    // pull down arrays
    let onHandInv = JSON.parse("JSON STRING")
    let orderInv = JSON.parse("JSON STRING")

    // slice item from OnHandInv array
    let index = onHandInv.findIndex(item => item["UPC"] === UPC && item["InvoiceID" === invoiceID]) 
    if (index === -1) {throw new error("editInventoryItem indexing error in OnHandInv table.")}
    let onHandItem = onHandInv.slice(index, index + 1)
    // update OnHandInv item, ignoring any nulls
    onHandItem["QTY"] = QTY != null ? QTY : onHandItem["QTY"]
    onHandItem["Cost"] = cost != null ? cost : onHandItem["Cost"]
    onHandItem["DateReceived"] = dateReceived != null ? dateReceived : onHandItem["DateReceived"]

    // slice item from OrderInv array
    let index = orderInv.findIndex(item => item["UPC"] === UPC && item["InvoiceID" === invoiceID]) 
    if (index === -1) {throw new error("editInventoryItem indexing error in OrderInv table.")}
    let orderInvItem = orderInv.slice(index, index + 1)
    // update OrderInv item, ignoring any nulls
    orderInvItem["Quantity"] = quantity != null ? quantity : orderInvItem["Quantity"]

    // update the JSON with updated arrays
    // idk man make Nic do it lol
    // if (success) {
        funcStatus = "Inventory edited successfully."
        return funcStatus
    // }
}

function deleteOrderInvItem(UPC, invoiceID) {
    let funcStatus = "Failed to delete inventory record."
    // pull down arrays
    let orderInv = JSON.parse("JSON STRING")

    // ensure record exists and store index for splice
    let index = orderInv.findIndex(item => item["InvoiceId"] === invoiceID && item["UPC"] === UPC)
    if (index === -1) {
        funcStatus = "The inventory record you are trying to delete does not exist."
        return funcStatus
    }

    // delete item
    orderInv.splice(index,1)

    // return array to JSON
    // idk man make Nic do it lol
    // if (success) {
    funcStatus = "Inventory record deleted successfully."
    // }
    return funcStatus
}

function deleteOnHandInvItem(UPC, invoiceID) {
    let funcStatus = "Failed to delete inventory item."
    // pull down arrays
    let onHandInv = JSON.parse("JSON STRING")

    // ensure item exists and store index for splice
    let index = onHandInv.findIndex(item => item["InvoiceId"] === invoiceID && item["UPC"] === UPC)
    if (index === -1) {
        funcStatus = "The inventory item you are trying to delete does not exist."
        return funcStatus
    }

    // delete item
    onHandInv.splice(index,1)

    // return array to JSON
    // idk man make Nic do it lol
    // if (success) {
    funcStatus = "Inventory item deleted successfully."
    // }
    return funcStatus
}



/*****************************
 * MANUFACTURER INTERACTIONS *
 ****************************/
function searchManufacturers(manFactID, name, details) {
    // pull down manufacturers array and  initialize output array
    let manufacturers = JSON.parse("JSON STRING")
    let output = []

    // if manufacturer matches all provided criteria, add it to output
    for (manufacturer of manufacturers) {
        if (
            (manFactID == null || manFactID == manufacturer["ManFactID"]) &&
            (name == null      || name == manufacturer["Name"]) &&
            (details == null   || details == manufacturer["Details"])
        ) { output.push(manufacturer) }
    }

    return output
}

function addManufacturer(manFactID, name, details) {
    let funcStatus = "Failed to add manufacturer."

    // pull down array of manufacturers
    let manufacturers = JSON.parse("JSON STRING")

    // check for duplicate manufacturer
    if (manufacturers.getIndex(manufacturer => manufacturer["Name"] === name) != -1) {
        let funcStatus = "This manufacturer is already in the system."
        return funcStatus
    }

    // build new object
    let newManufacturer = {
        "ID": manFactID,
        "Name": name,
        "Details": details
    }

    // add to manufacturers array
    manufacturers.push(newManufacturer)

    // return array to JSON
    // idk man make Nic do it lol
    // if (success) {
        funcStatus = "Manufacturer added successfully."
    // }
    return funcStatus
}

function editManufacturer(manFactID, name, details) {
    let funcStatus = "Failed to edit manufacturer."
    // pull down array
    let manufacturers = JSON.parse("JSON STRING")

    // check for missing manufacturer in array and store index for slice
    let index = manufacturers.findIndex(manufacturer => manufacturer["ID"] === manFactID)
    if (index === -1) {
        funcStatus = "The manufacturer you are trying to edit does not exist."
        return funcStatus
    }

    // slice manufacturer from array
    let manufacturer = manufacturers.slice(index, index + 1)

    // update manufacturer, ignoring any nulls
    manufacturer["Name"] = name != null ? name : manufacturer["Name"]
    manufacturer["Details"] = details != null ? details : manufacturer["Details"]

    // return array to JSON
    // idk man make Nic do it lol
    // if (success) {
    funcStatus = "Manufacturer updated successfully."
    // }
    return funcStatus
}

function deleteManufacturer(manFactID) {
    let funcStatus = "Failed to delete manufacturer."
    // pull down arrays
    let manufacturers = JSON.parse("JSON STRING")

    // ensure record exists and store index for splice
    let index = manufacturers.findIndex(manufacturer => manufacturer["ManFactID"] === manFactID)
    if (index === -1) {
        funcStatus = "The manufacturer you are trying to delete does not exist."
        return funcStatus
    }

    // delete manufacturer
    manufacturers.splice(index,1)

    // return array to JSON
    // idk man make Nic do it lol
    // if (success) {
    funcStatus = "Manufacturer deleted successfully."
    // }
    return funcStatus
}



/************************
 * INVOICE INTERACTIONS *
 ***********************/
function searchInvoices(invoiceID,orderDate,altSysCode,customerID,equipmentID) {
    // pull down invoices array and initialize output array
    let invoices = JSON.parse("JSON STRING")
    let output = []

    // if invoice matches all provided criteria, add it to output
    for (invoice of invoices) {
        if (
            (invoiceID == null   || invoiceID == invoice["InvoiceID"]) &&
            (orderDate == null   || orderDate == invoice["OrderDate"]) &&
            (altSysCode == null  || altSysCode == invoice["AltSysCode"]) &&
            (customerID == null  || customerID == invoice["CustomerID"]) &&
            (equipmentID == null || equipmentID == invoice["EquipmentID"])
        ) { output.push(invoice) }
    }

    return output
}

function addInvoice(invoiceID,orderDate,altSysCode,customerID,equipmentID) {
    let funcStatus = "Failed to add invoice."

    // pull down array of invoice
    let invoices = JSON.parse("JSON STRING")

    // check for duplicate invoice
    if (invoices.getIndex(invoice => invoice["AltSysCode"] === altSysCode) != -1) {
        let funcStatus = "This invoice is already in the system."
        return funcStatus
    }

    // build new object
    let newInvoice = {
        "ID": invoiceID,
        "OrderDate": orderDate,
        "AltSysCode": altSysCode,
        "CustomerID": customerID,
        "EquipmentID": equipmentID
    }

    // add to invoices array
    invoices.push(newInvoice)

    // return array to JSON
    // idk man make Nic do it lol
    // if (success) {
        funcStatus = "Invoice added successfully."
    // }
    return funcStatus
}

function editInvoice(invoiceID,orderDate,altSysCode,customerID,equipmentID) {
    let funcStatus = "Failed to edit invoice."
    // pull down array
    let invoices = JSON.parse("JSON STRING")

    // check for missing invoice in array and store index for slice
    let index = invoices.findIndex(invoice => invoice["ID"] === invoiceID)
    if (index === -1) {
        funcStatus = "The invoice you are trying to edit does not exist."
        return funcStatus
    }

    // slice invoice from array
    let invoice = invoices.slice(index, index + 1)

    // update invoice, ignoring any null inputs
    invoice["OrderDate"] = orderDate != null ? orderDate : invoice["OrderDate"]
    invoice["AltSysCode"] = altSysCode != null ? altSysCode : invoice["AlySysCode"]
    invoice["CustomerID"] = customerID != null ? customerID : invoice["CustomerID"]
    invoice["EquipmentID"] = equipmentID  != null ? equipmentID : invoice["EquipmentID"]

    // return array to JSON
    // idk man make Nic do it lol
    // if (success) {
    funcStatus = "Invoice updated successfully."
    // }
    return funcStatus
}

function deleteInvoice(invoiceID) {
    let funcStatus = "Failed to delete invoice."
    // pull down arrays
    let invoices = JSON.parse("JSON STRING")

    // ensure record exists and store index for splice
    let index = invoices.findIndex(invoice => invoice["InvoiceID"] === invoiceID)
    if (index === -1) {
        funcStatus = "The invoice you are trying to delete does not exist."
        return funcStatus
    }

    // delete invoice
    invoices.splice(index,1)

    // return array to JSON
    // idk man make Nic do it lol
    // if (success) {
    funcStatus = "Invoice deleted successfully."
    // }
    return funcStatus
}



/*************************
 * CUSTOMER INTERACTIONS *
 ************************/
function searchCustomers(customerID, fName, lName, street, city, postCode, province, phone) {
    // pull down customers array and initialize output array
    let customers = JSON.parse("JSON STRING")
    let output = []

    // if customer matches all provided criteria, add it to output
    for (customer of customers) {
        if (
            (customerID == null || customerID == invoice["CustomerID"]) &&
            (fName == null      || fName == invoice["FName"]) &&
            (lName == null      || lName == invoice["LName"]) &&
            (street == null     || street == invoice["Street"]) &&
            (city == null       || city == invoice["City"]) &&
            (postCode == null   || postCode == invoice["PostCode"]) &&
            (province == null   || province == invoice["Province"]) &&
            (phone == null      || phone == invoice["Phone"])
        ) { output.push(customer) }
    }

    return output
}

function addCustomer(customerID, fName, lName, street, city, postCode, province, phone) {
    let funcStatus = "Failed to add customer."

    // pull down array of customer
    let customers = JSON.parse("JSON STRING")

    // check for duplicate customer
    // Is there a way to ask user to confirm duplicate name is a new person?

    // build new object
    let newCustomer = {
        "ID": customerID,
        "FName": fName,
        "LName": lName,
        "Street": street,
        "City": city,
        "PostCode": postCode,
        "Province": province,
        "Phone": phone
    }

    // add to customers array
    customers.push(newCustomer)

    // return array to JSON
    // idk man make Nic do it lol
    // if (success) {
        funcStatus = "Customer added successfully."
    // }
    return funcStatus
}

function editCustomer(customerID, fName, lName, street, city, postCode, province, phone) {
    let funcStatus = "Failed to edit customer."
    // pull down array
    let customers = JSON.parse("JSON STRING")

    // check for missing customer in array and store index for slice
    let index = customers.findIndex(customer => customer["ID"] === customerID)
    if (index === -1) {
        funcStatus = "The customer you are trying to edit does not exist."
        return funcStatus
    }

    // slice customer from array
    let customer = customers.slice(index, index + 1)

    // update customer, ignoring any null inputs
    customer["FName"] = fName != null ? fName : customer["FName"]
    customer["LName"] = lName != null ? lName : customer["LName"]
    customer["Street"] = street != null ? street : customer["Street"]
    customer["City"] = city != null ? city : customer["City"]
    customer["PostCode"] = postCode != null ? postCode : customer["PostCode"]
    customer["Province"] = province != null ? province : customer["Province"]
    customer["Phone"] = phone != null ? phone : customer["Phone"]

    // return array to JSON
    // idk man make Nic do it lol
    // if (success) {
    funcStatus = "Customer updated successfully."
    // }
    return funcStatus
}

function deleteCustomer(customerID) {
    let funcStatus = "Failed to delete customer."
    // pull down arrays
    let customers = JSON.parse("JSON STRING")

    // ensure record exists and store index for splice
    let index = customers.findIndex(customer => customer["CustomerID"] === customerID)
    if (index === -1) {
        funcStatus = "The customer you are trying to delete does not exist."
        return funcStatus
    }

    // delete customer
    customers.splice(index,1)

    // return array to JSON
    // idk man make Nic do it lol
    // if (success) {
    funcStatus = "customer deleted successfully."
    // }
    return funcStatus
}
