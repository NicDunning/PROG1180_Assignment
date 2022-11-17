let sortAsc = true;
document.onreadystatechange = function () {
    // Get name of HTML page.
    var pageName = window.location.pathname.split("/").pop();
    var chklogin = false;
    var welcomeMessage = document.getElementById("welcome");
    if(document.cookie == ""){InitialLoad()};
    //accounts = Retrieve("accounts");
    accounts.forEach(account => {
        if(pageName != "login.html"){
            if(account["isloggedin"]){
                if(pageName != "pp.html"){
                    welcomeMessage.innerHTML = "Welcome "+ account["username"];
                    chklogin = true;
                }

            }
        }
    })

    if(!chklogin){
        console.log("problem");
        //window.location.replace("./login.html");
    }

    if (document.readyState == "interactive") {
        if(document.cookie == ""){InitialLoad()};
        var logout = document.getElementById("logout");
        if(pageName != "pp.html"){  
            logout.addEventListener("click", function(){
                logoutUser();
                window.location.replace("./login.html");
            });
        }
        if(pageName == "inventory.html"){
            RefreshInventoryDisplayedData();
            btnNew = document.getElementById("btnNew");
            btnNew.addEventListener("click", function(){
                if(this.value == "Clear Fields"){
                    clearInputs();
                    this.value = "New Entry";
                }
                else{
                    clearInputs();
                    unlockFields();
                }


            });
            if(document.cookie == ""){
                itemsOnHand = JoinDB(onHandInventory, items, "UPC");
            }
            else{
                sales = Retrieve("sales");
                itemsOnHand = Retrieve("itemsOnHand");
                items = Retrieve("items");
                Suppliers = Retrieve("suppliers");
                orders = Retrieve("orders");
                customers = Retrieve("customers");
            }
            btnCommit = document.getElementById("btnSubmit");
            // On btn click retrieve stored data, modify data, redisplay data
            btnCommit.addEventListener("click", function(){
                upc = document.getElementById("upc").value;
                quantity = document.getElementById("quan").value;
                dateReceived = document.getElementById("date").value;
                cost = document.getElementById("cost").value;
                add = true;
                checkitem = 
                {
                    "UPC" : upc,
                    "QtyOnHand": quantity,
                    "DateReceived": dateReceived,
                    "Cost" : cost
                };
                itemsOnHand.forEach(item => {
                    if(item["UPC"] == checkitem["UPC"] && item["DateReceived"] == checkitem["DateReceived"]){add = false;}
                });
                if(add){alert(addInventoryItem(upc, quantity, cost, dateReceived));}
                else{alert(editInventoryItem(upc, quantity, cost, dateReceived));}
                RefreshInventoryDisplayedData();
                lockFields();
            })
        
            // buttons in table have OnClick
            ButtonFunctionality;
        }

        if(pageName == "items.html"){
            if(document.cookie == ""){InitialLoad()};
            RefreshItemsDisplayedData();
            if(document.cookie == ""){
            }
            else{
                itemsOnHand = Retrieve("itemsOnHand");
                items = Retrieve("items");
                Suppliers = Retrieve("suppliers");
            }
            btnNew = document.getElementById("btnNew");
            btnNew.addEventListener("click", function(){
                if(this.value == "Clear Fields"){
                    clearInputs();
                    this.value = "New Entry";
                }
                else{
                    clearInputs();
                    unlockFields();
                }
            });
            btnCommit.addEventListener("click", function(){
                upc = document.getElementById("upc").value;
                Status = document.getElementById("status").checked;
                Name = document.getElementById("pname").value;
                details = document.getElementById("itemdesc").value;
                manfactid = document.getElementById("manfactid").value;
                serialnum = document.getElementById("serialnum").value;
                add = true;
                checkitem = 
                {
                    "UPC" : upc,
                    "Status": Status,
                    "Name": Name,
                    "Details": details,
                    "ManFactID": manfactid,
                    "SerialNum": serialnum
                };
                items.forEach(item => {
                    if(item["UPC"] == checkitem["UPC"]){add = false;}
                });
                if(add){alert(addProduct(upc, Status, Name, details, manfactid, serialnum));}
                else{alert(editProduct(upc, Status, Name, details, manfactid, serialnum));}
                RefreshItemsDisplayedData();
                lockFields();
                RefreshItemsDisplayedData();
            })
            RefreshItemsDisplayedData();
            ButtonFunctionality();
        }

        if(pageName == "ordering.html"){
            if(document.cookie == ""){InitialLoad()};
            refreshOrders();
            if(document.cookie == ""){

            }
            else{
                sales = Retrieve("sales");
                itemsOnHand = Retrieve("itemsOnHand");
                items = Retrieve("items");
                Suppliers = Retrieve("suppliers");
                orders = Retrieve("orders");
                customers = Retrieve("customers");
            }
            btnNew = document.getElementById("btnNew");
            btnNew.addEventListener("click", function(){
                if(this.value == "Clear Fields"){
                    clearInputs();
                    this.value = "New Entry";
                }
                else{
                    clearInputs();
                    unlockFields();
                }
            });
            btnCommit.addEventListener("click", function(){
                UPCsandQuant = document.querySelectorAll("#ordUPC");
                UPCs = [];
                Quants = [];
                UPCsandQuant.forEach(pair => {
                    if(pair.value != ""){
                        UPCs.push(pair.value.split("x")[1]);
                        Quants.push(pair.value.split("x")[0]);
                    }
                })
                invoiceID = document.getElementById("custInv").value;
                orderdate = document.getElementById("ordDate").value;
                customername = document.getElementById("custFirst").value;

                add = true;
                checkitem = 
                {
                    "InvoiceID" : invoiceID,
                    "OrderDate" : orderdate,
                    "CustomerName" : customername,
                    "ItemUPC" : UPCs,
                    "ItemQuantity" : Quants
                };
                orders.forEach(item => {
                    if(item["InvoiceID"] == checkitem["InvoiceID"]){add = false;}
                });
                if(add){alert(addOrder(invoiceID, UPCs, Quants, orderdate, customername));}
                else{alert(editOrder(invoiceID, UPCs, Quants, orderdate, customername));}
                refreshOrders();
                lockFields();
                refreshOrders();
            })
        }

        if(pageName == "suppliers.html"){
            if(document.cookie == ""){InitialLoad()};
            RefreshSuppliers();

            if(document.cookie == ""){

            }
            else{
                sales = Retrieve("sales");
                itemsOnHand = Retrieve("itemsOnHand");
                items = Retrieve("items");
                Suppliers = Retrieve("suppliers");
                orders = Retrieve("orders");
                customers = Retrieve("customers");
            }
            
            btnNew = document.getElementById("btnNew");
            btnNew.addEventListener("click", function(){
                if(this.value == "Clear Fields"){
                    clearInputs();
                    this.value = "New Entry";
                }
                else{
                    clearInputs();
                    unlockFields();
                }


            });
            btnCommit.addEventListener("click", function(){
                supName = document.getElementById("supName").value;;
                supStreet = document.getElementById("supStreet").value;
                supCity = document.getElementById("supCity").value;
                supProv = document.getElementById("supProv").value;
                supPost = document.getElementById("supPost").value;
                supPhone = document.getElementById("supPhone").value;
                add = true;
                checkitem = 
                {
                    "supName" : supName,
                    "supStreet": supStreet,
                    "supCity": supCity,
                    "supProv": supProv,
                    "supPost": supPost,
                    "supPhone": supPhone
                };
                Suppliers.forEach(item => {
                    if(item["Name"] == checkitem["supName"]){add = false;}
                });
                if(add){alert(addManufacturer(supName, supStreet, supCity, supProv, supPost, supPhone));}
                else{alert(editManufacturer(supName, supStreet, supCity, supProv, supPost, supPhone));}
                RefreshSuppliers();
                lockFields();
                RefreshSuppliers();
            })
        }

        if(pageName == "customers.html"){
            if(document.cookie == ""){InitialLoad()};
            RefreshCustomers();

            if(document.cookie == ""){

            }
            else{
                sales = Retrieve("sales");
                itemsOnHand = Retrieve("itemsOnHand");
                items = Retrieve("items");
                Suppliers = Retrieve("suppliers");
                orders = Retrieve("orders");
                customers = Retrieve("customers");
            }
            
            btnNew = document.getElementById("btnNew");
            btnNew.addEventListener("click", function(){
                if(this.value == "Clear Fields"){
                    clearInputs();
                    this.value = "New Entry";
                }
                else{
                    clearInputs();
                    unlockFields();
                }


            });
            btnCommit.addEventListener("click", function(){
                custName = document.getElementById("custName").value;;
                custStreet = document.getElementById("custStreet").value;
                custCity = document.getElementById("custCity").value;
                custProv = document.getElementById("custProv").value;
                custPost = document.getElementById("custPost").value;
                custPhone = document.getElementById("custPhone").value;
                add = true;
                checkitem = 
                {
                    "Name" : custName,
                    "Street": custStreet,
                    "City": custCity,
                    "Prov": custProv,
                    "Post": custPost,
                    "Phone": custPhone
                };
                customers.forEach(item => {
                    if(item["Name"] == checkitem["Name"]){add = false;}
                });
                if(add){alert(addCustomer(custName, custStreet, custCity, custProv, custPost, custPhone));}
                else{alert(editCustomer(custName, custStreet, custCity, custProv, custPost, custPhone));}
                RefreshCustomers();
                lockFields();
                RefreshCustomers();
            })
        }

        if(pageName == "sales.html"){
            if(document.cookie == ""){InitialLoad()};
            refreshSales();
            if(document.cookie == ""){

            }
            else{
                sales = Retrieve("sales");
                itemsOnHand = Retrieve("itemsOnHand");
                items = Retrieve("items");
                Suppliers = Retrieve("suppliers");
                orders = Retrieve("orders");
                customers = Retrieve("customers");
            }
            btnNew = document.getElementById("btnNew");
            btnNew.addEventListener("click", function(){
                if(this.value == "Clear Fields"){
                    clearInputs();
                    this.value = "New Entry";
                }
                else{
                    clearInputs();
                    unlockFields();
                }
            });

            btnCommit.addEventListener("click", function(){
                UPCsandQuant = document.querySelectorAll("#ordUPC");
                UPCs = [];
                Quants = [];
                UPCsandQuant.forEach(pair => {
                    if(pair.value != ""){
                        UPCs.push(pair.value.split("x")[1]);
                        Quants.push(pair.value.split("x")[0]);
                    }
                })
                invoiceID = document.getElementById("custInv").value;
                orderdate = document.getElementById("ordDate").value;
                customername = document.getElementById("custFirst").value;
                altcode = document.getElementById("custAlt").value;

                add = true;
                checkitem = 
                {
                    "InvoiceID" : invoiceID,
                    "OrderDate" : orderdate,
                    "CustomerName" : customername,
                    "ItemUPC" : UPCs,
                    "ItemQuantity" : Quants,
                    "AltCode": altcode
                };
                sales.forEach(item => {
                    if(item["InvoiceID"] == checkitem["InvoiceID"]){add = false;}
                });
                if(add){alert(addSale(invoiceID, UPCs, Quants, orderdate, customername, altcode));}
                else{alert(editSale(invoiceID, UPCs, Quants, orderdate, customername, altcode));}
                refreshSales();
                lockFields();
                refreshSales();
            })
        }
        if(pageName == "pp.html"){

            if(document.cookie == ""){
                itemsOnHand = JoinDB(onHandInventory, items, "UPC");
            }
            else{
                sales = Retrieve("sales");
                itemsOnHand = Retrieve("itemsOnHand");
                items = Retrieve("items");
                Suppliers = Retrieve("suppliers");
                orders = Retrieve("orders");
                customers = Retrieve("customers");
            }
            if(Retrieve("pp") != ""){
                fakepp = Retrieve("pp");
            }

            rowPrint = document.getElementById("row-print2");
            tbPrint = document.getElementById("tbPrint");
            customerFields = `<div class="column">`
            + `<p>${fakepp[1]["Name"]}</p>`
            + `<p>${fakepp[1]["Street"]}</p>`
            + `</div>`
            + '<div class="column">'
            + `<p>${fakepp[1]["City"]} ${fakepp[1]["Province"]} ${fakepp[1]["PostCode"]}</p>`
            + `<p>${fakepp[1]["PhoneNumber"]}</p>`
            + '</div>'
            + '</div>'
            rowPrint.innerHTML += customerFields;

            var itemFields = ``
            var count = 0;
            var total = 0;

            fakepp[2].forEach( item => {
                var itemCost = 0;
                itemsOnHand.forEach( onhand => {
                    if(onhand["UPC"] == item["UPC"]){
                        itemCost = onhand["Cost"];
                    }
                })
                itemFields = `<tr>\n`
                +`<td>${fakepp[3][count]}</td>\n`
                +`<td>${item["Details"]}</td>\n`
                +`<td>${item["SerialNum"]}</td>\n`
                +`<td>${itemCost}</td>\n`
                +`<td>${parseFloat(fakepp[3][count]) * parseFloat(itemCost)}</td>\n`
                +`</tr>`;
                
                total += parseFloat(fakepp[3][count]) * parseFloat(itemCost);
                tbPrint.innerHTML += itemFields;
            })

            tbPrint.innerHTML += `<tr>`
            + `<td></td>`
            + `<td></td>`
            + `<td></td>`
            + `<td></td>`
            + `<td></td>`
            + `</tr>`

            tbPrint.innerHTML += `<tr>`
            + `<td></td>`
            + `<td></td>`
            + `<td></td>`
            + `<td style="font-weight: bold;">Subtotal : </td>`
            + `<td>$${total}</td></tr>`;

            tbPrint.innerHTML += `<tr>`
            + `<td>Thank you for your business!</td>`
            + `<td></td>`
            + `<td></td>`
            + `<td style="font-weight: bold;">Tax</td>`
            + `<td>$${total * 0.13}</td></tr>`

            tbPrint.innerHTML += `<tr>`
            + `<td></td>`
            + `<td></td>`
            + `<td></td>`
            + `<td style="font-weight: bold;">Additional discount</td>`
            + `<td>0%</td></tr>`

            tbPrint.innerHTML += `<tr>`
            + `<td></td>`
            + `<td></td>`
            + `<td></td>`
            + `<td style="font-weight: bold;">Balance Due</td>`
            + `<td>$${total + total * 0.13}</td></tr>`

            alt = document.getElementById("altcode");
            date = document.getElementById("date");
            invoice = document.getElementById("InvoiceNum");

            alt.innerHTML = "AltCode : " + fakepp[0]["AltCode"];
            date.innerHTML = "Date : " + fakepp[0]["OrderDate"];
            invoice.innerHTML = "Invoice # : " + fakepp[0]["InvoiceID"];
        }
    }
}

function InitialLoad(){
    itemsOnHand = JoinDB(onHandInventory, items, "UPC");
    Store("itemsOnHand", itemsOnHand, 1);
    Store("items", items, 1);
    Store("suppliers", Suppliers, 1);
    Store("orders", orders, 1);
    Store("accounts", accounts, 1);
    Store("customers", customers, 1);
    Store("sales", sales, 1);

    if(document.cookie != ''){
        itemsOnHand = Retrieve("itemsOnHand");
        items = Retrieve("items");
        Suppliers = Retrieve("suppliers");
        orders = Retrieve("orders");
        customers = Retrieve("customers");
        sales = Retrieve("sales");
    }
}

function logoutUser(){
    accounts.forEach(account => {
        if(account["isloggedin"]){
            account["isloggedin"] = false;
        }
    });
}

function ButtonFunctionality(){
    // buttons in table have OnClick
    editButtons = document.querySelectorAll("td > input.edit");
    editButtons.forEach( button => {
        button.addEventListener("click", sendToEdit);
        button.addEventListener("click", unlockFields);
    })
    deleteButtons = document.querySelectorAll("td > input.delete");
    deleteButtons.forEach( button => {
        button.addEventListener("click", ArchiveRecord);
    })
    ppButtons = document.querySelectorAll("td > input.print")
    ppButtons.forEach( button => {
        button.addEventListener("click", sendToPP);
    })
}

function unlockFields(){
    var inputs = document.querySelectorAll("div > input");
    inputs.forEach(input => {
        input.disabled = false;
        if(input.value == "New Entry"){
            input.value = "Clear Fields";
        }
        else if(input.value == "Clear Fields"){
            input.value = "New Entry";
        }
    })
    disableInputsOrders();
}

function lockFields(){
    var inputs = document.querySelectorAll("div > input");
    inputs.forEach(input => {
        if((input.type != "submit") && (input.type != "button")){
            input.disabled = true;
        }
        if(input.value == "New Entry"){
            input.value = "Clear Fields";
        }
        else if(input.value == "Clear Fields"){
            input.value = "New Entry";
        }
    })
}

function clearInputs(){
    inputs = document.querySelectorAll("div > input");
    inputs.forEach(input => {
        if((input.type != "submit") && (input.type != "button")){
            input.value = "";
            input.disabled = true;
        }
    });
}

function RefreshInventoryDisplayedData(){
    // Init Variables
    const tblInventory = document.getElementById("tbInventory");
    var tblInventoryHeaders = ["UPC", "Product", "Details", "Quantity", "Price", "DateReceived", "Modify"];
    var tblInventoryHTML = "<tr>";
    
    
    tblInventory.innerHTML = "";
    // Foreach value in headers make a column.
    tblInventoryHeaders.forEach(header => {
        tblInventoryHTML += `<th><input type="submit" id="${header}Header" value="${header}" style="width:100%"></th>`;
    });
    // Set innerHTML add table header.
    tblInventory.innerHTML += tblInventoryHTML + "</tr>";
    var itemRow = "";
    // Generate Joined DB
    if(document.cookie == ""){
        itemsOnHand = JoinDB(onHandInventory, items, "UPC");
    }
    else{
        itemsOnHand = JoinDB(Retrieve("itemsOnHand"), Retrieve("items"), "UPC");
        items = Retrieve("items");
        Suppliers = Retrieve("suppliers");
    }
    
    // Foreach item on hand
    var counter = 0;
    itemsOnHand.forEach(item => {
        itemRow += `<tr>`;
        itemRow += `<td>${item["UPC"]}</td>`
        +`<td>${item["Name"]}</td>`
        +`<td>${item["Details"]}</td>`
        +`<td>${item["QtyOnHand"]}</td>`
        +`<td>${item["Cost"]}</td>`
        +`<td>${item["DateReceived"]}</td>`
        +`<td><input type="submit" value="Edit" class="${counter} edit">` 
        + `<input type="submit" value="Delete" class="${counter} delete"></td></tr>`
        counter++;
    });
    
    // Add the row to the table.
    tblInventory.innerHTML += itemRow;   
    // Store the cookies.
    Store("itemsOnHand", itemsOnHand, 1);
    Store("items", items, 1);
    Store("suppliers", Suppliers, 1);
    RefreshAutoCompletes();
    ButtonFunctionality();
    // Sort Functionality
    document.getElementById("UPCHeader").addEventListener("click", function(){
        sortAsc = !sortAsc;
        itemsOnHand = SortInventoryOnHand(itemsOnHand, sortAsc, "UPC");
        Store("itemsOnHand", itemsOnHand, 1);
        RefreshInventoryDisplayedData();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("UPCHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
    document.getElementById("ProductHeader").addEventListener("click", function(){
        sortAsc = !sortAsc;
        itemsOnHand = SortInventoryOnHand(itemsOnHand, sortAsc, "Name");
        Store("itemsOnHand", itemsOnHand, 1);
        RefreshInventoryDisplayedData();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("ProductHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
    document.getElementById("DateReceivedHeader").addEventListener("click", function(){
        sortAsc = !sortAsc;
        itemsOnHand = SortInventoryOnHand(itemsOnHand, sortAsc, "DateReceived");
        Store("itemsOnHand", itemsOnHand, 1);
        RefreshInventoryDisplayedData();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("DateReceivedHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
}

function RefreshItemsDisplayedData(){
    // Init Variables
    const tblInventory = document.getElementById("tbInventory");
    var tblInventoryHeaders = ["UPC", "Carry?", "Name", "Details", "Supplier", "SerialNum", "Modify"];
    var tblInventoryHTML = "<tr>";
    const blacklist = ["Status", "ManFactID", "SerialNum", "DateReceived"];
    tblInventory.innerHTML = "";
    // Foreach value in headers make a column.
    tblInventoryHeaders.forEach(header => {
        tblInventoryHTML += `<th><input type="submit" id="${header}Header" value="${header}" style="width:100%"></th>`;
    });
    // Set innerHTML add table header.
    tblInventory.innerHTML += tblInventoryHTML + "</tr>";
    var itemRow = "";
    if(document.cookie == ""){
    }
    else{
        items = Retrieve("items");
    }
    
    
    // Foreach item on hand
    var counter = 0;
    items.forEach(item => {
        // selectedSupplier = {};
        // Suppliers.forEach(supplier => {
        //     if(supplier["SupplierID"] == item["ManFactID"]){
        //         selectedSupplier = supplier;
        //     }
        // })
        itemRow += `<tr>`;

        itemRow += `<td>${item["UPC"]}</td>`
        +`<td>${item["Status"]}</td>`
        +`<td>${item["Name"]}</td>`
        +`<td>${item["Details"]}</td>`
        +`<td>${item["ManFactID"]}</td>`
        +`<td>${item["SerialNum"]}</td>`
        +`<td><input type="submit" value="Edit" class="${counter} edit">` 
        +`<input type="submit" value="Delete" class="${counter} delete"></td></tr>`
        counter++;
    });
    
    // Add the row to the table.
    tblInventory.innerHTML += itemRow;   
    // Store the cookies.
    Store("items", items, 1);
    Store("suppliers", Suppliers, 1);
    RefreshAutoCompletes();
    ButtonFunctionality();
    // Sort Functionality
    document.getElementById("UPCHeader").addEventListener("click", function(){
        sortAsc = !sortAsc;
        items = SortInventoryOnHand(items, sortAsc, "UPC");
        Store("items", items, 1);
        RefreshItemsDisplayedData();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("UPCHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
    document.getElementById("NameHeader").addEventListener("click", function(){
        sortAsc = !sortAsc;
        items = SortInventoryOnHand(items, sortAsc, "Name");
        Store("items", items, 1);
        RefreshItemsDisplayedData();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("NameHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
}

function refreshOrders(){
    // Init Variables
    const tblOrders = document.getElementById("tbOrders");
    var tblOrdersHeaders = ["Invoice#", "CustomerName",  "DatePlaced", "ItemUPC(s)", "Quantity" , "Modify"];
    var tblOrdersHTML = "<tr>";
    tblOrders.innerHTML = "";
    // Foreach value in headers make a column.
    tblOrdersHeaders.forEach(header => {
        tblOrdersHTML += `<th><input type="submit" id="${header}Header" value="${header}" style="width:100%"></th>`;
    });
    // Set innerHTML add table header.
    tblOrders.innerHTML += tblOrdersHTML + "</tr>";
    var itemRow = "";

    if(document.cookie == ""){
    }
    else{
        orders = Retrieve("orders");
    }

    // Foreach item on hand
    var counter = 0;
    orders.forEach(item => {
        itemRow += `<tr>`;

        itemRow += `<td>${item["InvoiceID"]}</td>`
        +`<td>${item["CustomerName"]}</td>`
        +`<td>${item["OrderDate"]}</td><td>`
        item["ItemUPC"].forEach(upc => {
            itemRow += `${upc}`
            if(item["ItemUPC"].indexOf(upc) != item["ItemUPC"].length-1){
                itemRow += '\n'
            }
        });
        itemRow += "</td><td>";
        item["ItemQuantity"].forEach(quantity => {
            itemRow += `${quantity}<br>`
        });
        
        itemRow += "</td>"
        +`<td><input type="submit" value="Edit" class="${counter} edit">` 
        +`<input type="submit" value="Delete" class="${counter} delete"></td></tr>`;
        counter++;
    });
    
    // Add the row to the table.
    tblOrders.innerHTML += itemRow;   
    // Store the cookies.
    Store("orders", orders, 1);
    createItems(2);
    RefreshAutoCompletes();
    ButtonFunctionality();
    // Sort Functionality
    document.getElementById("Invoice#Header").addEventListener("click", function(){
        sortAsc = !sortAsc;
        orders = SortInventoryOnHand(orders, sortAsc, "InvoiceID");
        Store("orders", orders, 1);
        refreshOrders();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("Invoice#Header").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
    document.getElementById("DatePlacedHeader").addEventListener("click", function(){
        sortAsc = !sortAsc;
        orders = SortInventoryOnHand(orders, sortAsc, "OrderDate");
        Store("orders", orders, 1);
        refreshOrders();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("DatePlacedHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
    // document.getElementById("DateReceivedHeader").addEventListener("click", function(){
    //     sortAsc = !sortAsc;
    //     itemsOnHand = SortInventoryOnHand(itemsOnHand, sortAsc, "DateReceived");
    //     RefreshInventoryDisplayedData();
    //     if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
    //         buttonValue = this.value;
    //     }
    //     document.getElementById("DateReceivedHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    // });
}

function RefreshSuppliers(){
    // Init Variables
    const tblSuppliers = document.getElementById("tbSupplier");
    var tblSuppliersHeaders = ["Name", "Street", "City", "Province" , "PostCode" , "PhoneNumber" , "Modify"];
    var tblSuppliersHTML = "<tr>";
    tblSuppliers.innerHTML = "";
    // Foreach value in headers make a column.
    tblSuppliersHeaders.forEach(header => {
        tblSuppliersHTML += `<th><input type="submit" id="${header}Header" value="${header}" style="width:100%"></th>`;
    });
    // Set innerHTML add table header.
    tblSuppliers.innerHTML += tblSuppliersHTML + "</tr>";
    var itemRow = "";

    if(document.cookie == ""){
    }
    else{
        Suppliers = Retrieve("suppliers");
    }

    // Foreach item on hand
    var counter = 0;
    Suppliers.forEach(item => {
        itemRow += `<tr>`;

        itemRow += `<td>${item["Name"]}</td>`
        +`<td>${item["Street"]}</td>`
        +`<td>${item["City"]}</td>`
        +`<td>${item["Province"]}</td>`
        +`<td>${item["PostCode"]}</td>`
        +`<td>${item["PhoneNumber"]}</td>`
        +`<td><input type="submit" value="Edit" class="${counter} edit">` 
        +`<input type="submit" value="Delete" class="${counter} delete"></td></tr>`;
        counter++;
    });
    
    // Add the row to the table.
    tblSuppliers.innerHTML += itemRow;   
    // Store the cookies.
    Store("suppliers", Suppliers, 1);
    RefreshAutoCompletes();
    ButtonFunctionality();
    // Sort Functionality
    // document.getElementById("SupplierIDHeader").addEventListener("click", function(){
    //     sortAsc = !sortAsc;
    //     Suppliers = SortInventoryOnHand(Suppliers, sortAsc, "SupplierID");
    //     Store("suppliers", Suppliers, 1);
    //     RefreshSuppliers();
    //     if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
    //         buttonValue = this.value;
    //     }
    //     document.getElementById("SupplierIDHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    // });
    document.getElementById("NameHeader").addEventListener("click", function(){
        sortAsc = !sortAsc;
        Suppliers = SortInventoryOnHand(Suppliers, sortAsc, "Name");
        Store("suppliers", Suppliers, 1);
        RefreshSuppliers();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("NameHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
    // document.getElementById("DateReceivedHeader").addEventListener("click", function(){
    //     sortAsc = !sortAsc;
    //     itemsOnHand = SortInventoryOnHand(itemsOnHand, sortAsc, "DateReceived");
    //     RefreshInventoryDisplayedData();
    //     if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
    //         buttonValue = this.value;
    //     }
    //     document.getElementById("DateReceivedHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    // });
}

function RefreshCustomers(){
    // Init Variables
    const tblCustomers = document.getElementById("tbSupplier");
    var tblCustomersHeaders = ["Name", "Street", "City", "Province" , "PostCode" , "PhoneNumber" , "Modify"];
    var tblCustomersHTML = "<tr>";
    tblCustomers.innerHTML = "";
    // Foreach value in headers make a column.
    tblCustomersHeaders.forEach(header => {
        tblCustomersHTML += `<th><input type="submit" id="${header}Header" value="${header}" style="width:100%"></th>`;
    });
    // Set innerHTML add table header.
    tblCustomers.innerHTML += tblCustomersHTML + "</tr>";
    var itemRow = "";

    if(document.cookie == ""){
    }
    else{
        customers = Retrieve("customers");
    }

    // Foreach item on hand
    var counter = 0;
    customers.forEach(item => {
        itemRow += `<tr>`;

        itemRow += `<td>${item["Name"]}</td>`
        +`<td>${item["Street"]}</td>`
        +`<td>${item["City"]}</td>`
        +`<td>${item["Province"]}</td>`
        +`<td>${item["PostCode"]}</td>`
        +`<td>${item["PhoneNumber"]}</td>`
        +`<td><input type="submit" value="Edit" class="${counter} edit">` 
        +`<input type="submit" value="Delete" class="${counter} delete"></td></tr>`;
        counter++;
    });
    
    // Add the row to the table.
    tblCustomers.innerHTML += itemRow;   
    // Store the cookies.
    Store("customers", customers, 1);
    RefreshAutoCompletes();
    ButtonFunctionality();
    // Sort Functionality
    // document.getElementById("SupplierIDHeader").addEventListener("click", function(){
    //     sortAsc = !sortAsc;
    //     Suppliers = SortInventoryOnHand(Suppliers, sortAsc, "SupplierID");
    //     Store("suppliers", Suppliers, 1);
    //     RefreshSuppliers();
    //     if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
    //         buttonValue = this.value;
    //     }
    //     document.getElementById("SupplierIDHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    // });
    document.getElementById("NameHeader").addEventListener("click", function(){
        sortAsc = !sortAsc;
        customers = SortInventoryOnHand(customers, sortAsc, "Name");
        Store("customers", customers, 1);
        RefreshCustomers();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("NameHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
    // document.getElementById("DateReceivedHeader").addEventListener("click", function(){
    //     sortAsc = !sortAsc;
    //     itemsOnHand = SortInventoryOnHand(itemsOnHand, sortAsc, "DateReceived");
    //     RefreshInventoryDisplayedData();
    //     if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
    //         buttonValue = this.value;
    //     }
    //     document.getElementById("DateReceivedHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    // });
}

function refreshSales(){
    // Init Variables
    const tblSales = document.getElementById("tbSales");
    var tblSalesHeaders = ["Invoice#", "Name", "DatePlaced", "ItemUPC(s)", "Quantity", "AltCode", "Modify"];
    var tblSalesHTML = "<tr>";
    tblSales.innerHTML = "";
    // Foreach value in headers make a column.
    tblSalesHeaders.forEach(header => {
        tblSalesHTML += `<th><input type="submit" id="${header}Header" value="${header}" style="width:100%"></th>`;
    });
    // Set innerHTML add table header.
    tblSales.innerHTML += tblSalesHTML + "</tr>";
    var itemRow = "";

    if(document.cookie == ""){
    }
    else{
        sales = Retrieve("sales");
    }

    // Foreach item on hand
    var counter = 0;
    sales.forEach(item => {
        itemRow += `<tr>`;

        itemRow += `<td>${item["InvoiceID"]}</td>`
        +`<td>${item["CustomerName"]}</td>`
        +`<td>${item["OrderDate"]}</td><td>`
        item["ItemUPC"].forEach(upc => {
            itemRow += `${upc}`
            if(item["ItemUPC"].indexOf(upc) != item["ItemUPC"].length-1){
                itemRow += '\n'
            }
        });
        itemRow += "</td><td>";
        item["ItemQuantity"].forEach(quantity => {
            itemRow += `${quantity}<br>`
        });
        itemRow += "</td>"
        itemRow += `<td>${item["AltCode"]}</td>`
        +`<td><input type="submit" value="Edit" class="${counter} edit">` 
        +`<input type="submit" value="Delete" class="${counter} delete">`
        +`<input type="submit" value="Print Preview" class="${counter} print"></td></tr>`;
        counter++;
    });
    
    // Add the row to the table.
    tblSales.innerHTML += itemRow;   
    // Store the cookies.
    Store("sales", sales, 1);
    createItems(2);
    RefreshAutoCompletes();
    ButtonFunctionality();
    // Sort Functionality
    document.getElementById("Invoice#Header").addEventListener("click", function(){
        sortAsc = !sortAsc;
        sales = SortInventoryOnHand(sales, sortAsc, "InvoiceID");
        Store("sales", sales, 1);
        refreshSales();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("Invoice#Header").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
    document.getElementById("DatePlacedHeader").addEventListener("click", function(){
        sortAsc = !sortAsc;
        sales = SortInventoryOnHand(sales, sortAsc, "OrderDate");
        Store("sales", sales, 1);
        refreshSales();
        if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
            buttonValue = this.value;
        }
        document.getElementById("DatePlacedHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    });
    // document.getElementById("DateReceivedHeader").addEventListener("click", function(){
    //     sortAsc = !sortAsc;
    //     itemsOnHand = SortInventoryOnHand(itemsOnHand, sortAsc, "DateReceived");
    //     RefreshInventoryDisplayedData();
    //     if(!(this.value.includes("▲")) && !(this.value.includes("▼"))){
    //         buttonValue = this.value;
    //     }
    //     document.getElementById("DateReceivedHeader").value = buttonValue + `${sortAsc ? "▲":"▼"}`;;
    // });
}


function sendToEdit(){
    var pageName = window.location.pathname.split("/").pop();

    if(pageName == "inventory.html"){    
        // Generate Joined DB
        if(document.cookie == ""){
            itemsOnHand = JoinDB(onHandInventory, items, "UPC");
        }
        else{
            itemsOnHand = JoinDB(Retrieve("itemsOnHand"), Retrieve("items"), "UPC");
        }
        var selectedItem = itemsOnHand[parseInt(this.className)];

        document.getElementById("upc").value = selectedItem["UPC"];
        document.getElementById("quan").value = selectedItem["QtyOnHand"];
        document.getElementById("date").value = String(selectedItem["DateReceived"]);
        document.getElementById("cost").value = selectedItem["Cost"];
    }
    else if (pageName == "items.html"){
        // Generate DB
        if(document.cookie == ""){
            itemsDB = items;
        }
        else{
            var itemsDB = Retrieve("items");
        }
        var selectedItem = itemsDB[parseInt(this.className)];
        document.getElementById("upc").value = selectedItem["UPC"];
        document.getElementById("status").checked = selectedItem["Status"];
        document.getElementById("pname").value = selectedItem["Name"];
        document.getElementById("itemdesc").value = selectedItem["Details"];
        document.getElementById("manfactid").value = selectedItem["ManFactID"];
        document.getElementById("serialnum").value = selectedItem["SerialNum"];
    }
    else if (pageName == "ordering.html"){
        // Generate DB
        if(document.cookie == ""){
        }
        else{
            orders = Retrieve("orders");
        }
        var selectedItem = orders[parseInt(this.className)];
        count = 0;
        UPCsandQuant = []
        selectedItem["ItemUPC"].forEach(upc => {
            UPCsandQuant.push(`${selectedItem["ItemQuantity"][count]}x${upc}`);
            count++;
        })
        createItems(UPCsandQuant.length);
        var things = document.querySelectorAll(".ordUPC")
        count = 0;
        things.forEach(thing => {
            if(count > UPCsandQuant.length){
                return;
            }
            if(UPCsandQuant[count] == undefined){
                thing.value = "";
            }
            else{
                thing.value = UPCsandQuant[count];
            }
            count++;
        })

        document.getElementById("custFirst").value = selectedItem["CustomerName"];
        document.getElementById("custInv").value = selectedItem["InvoiceID"];
        
        //document.getElementById("ordUPC").value = UPCsandQuant;
        document.getElementById("ordDate").value = String(selectedItem["OrderDate"]);
    }
    else if (pageName == "suppliers.html"){
        // Generate DB
        if(document.cookie == ""){
        }
        else{
            Suppliers = Retrieve("suppliers");
        }
        var selectedItem = Suppliers[parseInt(this.className)];

        document.getElementById("supName").value = selectedItem["Name"];
        document.getElementById("supStreet").value = selectedItem["Street"];
        document.getElementById("supCity").value = selectedItem["City"];
        document.getElementById("supProv").value = selectedItem["Province"];
        document.getElementById("supPost").value = selectedItem["PostCode"];
        document.getElementById("supPhone").value = selectedItem["PhoneNumber"];
    }
    else if (pageName == "customers.html"){
        // Generate DB
        if(document.cookie == ""){
        }
        else{
            customers = Retrieve("customers");
        }
        var selectedItem = customers[parseInt(this.className)];

        document.getElementById("custName").value = selectedItem["Name"];
        document.getElementById("custStreet").value = selectedItem["Street"];
        document.getElementById("custCity").value = selectedItem["City"];
        document.getElementById("custProv").value = selectedItem["Province"];
        document.getElementById("custPost").value = selectedItem["PostCode"];
        document.getElementById("custPhone").value = selectedItem["PhoneNumber"];
    }
    else if (pageName == "sales.html"){
        // Generate DB
        if(document.cookie == ""){
        }
        else{
            sales = Retrieve("sales");
        }
        var selectedItem = sales[parseInt(this.className)];
        count = 0;
        UPCsandQuant = []
        selectedItem["ItemUPC"].forEach(upc => {
            UPCsandQuant.push(`${selectedItem["ItemQuantity"][count]}x${upc}`);
            count++;
        })
        createItems(UPCsandQuant.length);
        var things = document.querySelectorAll(".ordUPC")
        count = 0;
        things.forEach(thing => {
            if(count > UPCsandQuant.length){
                return;
            }
            if(UPCsandQuant[count] == undefined){
                thing.value = "";
            }
            else{
                thing.value = UPCsandQuant[count];
            }
            count++;
        })

        document.getElementById("custFirst").value = selectedItem["CustomerName"];
        document.getElementById("custInv").value = selectedItem["InvoiceID"];
        document.getElementById("custAlt").value = selectedItem["AltCode"];
        document.getElementById("ordDate").value = String(selectedItem["OrderDate"]);
    }

};

function sendToPP(){
    var selectedSale = sales[parseInt(this.className)];
    var selectedCustomer;
    var selectedItems = [];
    var selectedQuantities = selectedSale["ItemQuantity"];
    customers.forEach(customer => {
        if(customer["Name"] == selectedSale["CustomerName"]){
            selectedCustomer = customer;
        }
    })
    selectedSale["ItemUPC"].forEach( upc => {
        items.forEach( item => {
            if(item["UPC"] == upc){
                selectedItems.push(item);
            }
        })
    })
    var pp = [];
    pp.push(selectedSale, selectedCustomer, selectedItems, selectedQuantities);

    Store("pp", pp, 1);

    window.location = "./pp.html";

}

function createItems(count){
    var custinfo = document.getElementById("cust-info");
    var btns = document.getElementById("commits");
    var things = document.querySelectorAll("div > .Item");
    var breaks = document.querySelectorAll("div > .remove");
    if(things.length > 1){
        things.forEach(item => {
            item.remove();
        });
    }
    if(breaks.length > 1){
        breaks.forEach(item => {
            item.remove();
        });
    }

    tempinfo = custinfo.innerHTML;
    for(i=0; i<count +1; i++){
        custinfo.innerHTML += `<div class="Item ${i}"  style="position: relative;">`
        +`<img onclick="ToggleHelp('upcs-help')" title="Help" alt="Help" src="photos/Help.png">`
        +`<input type="button" class="clear ${i}" value="clear" style="width:60px; height:40px; margin:5px; padding:5px; font-size:small" disabled>`
        +`<input type="text" class="ordUPC" id="ordUPC" name="ordUPC" placeholder='ex: 1x210987654321' style="max-width: 185px;" disabled>`
        +`<input type="button" class="add ${i}" value="add" style="width:60px; height:40px; margin:5px; padding:5px; font-size:small">`
        +`</div>`
        +`<br class="remove">`
    }

    var clears = document.querySelectorAll(".clear");
    clears.forEach(c => {
        c.addEventListener("click", function(){
            ordUPCs = document.querySelectorAll(".ordUPC");
            ordUPCs[this.className.split(" ")[1]].value = "";
        });
    });

    var adds = document.querySelectorAll(".add");
    count = 0;
    adds.forEach(a => {
        a.addEventListener("click", recursiveFunction)
    })

    disableInputsOrders();
}

function recursiveFunction(){
    var custinfo = document.getElementById("cust-info");
    var newI = document.querySelectorAll(".add").length+1;
    var name = document.getElementById("custFirst").value;
    var inv = document.getElementById("custInv").value;
    var date = document.getElementById("ordDate").value;
    var upcslist = document.querySelectorAll(".ordUPC");
    var upclist = [];
    upcslist.forEach(upc => {
        upclist.push(upc);
    });



    custinfo.innerHTML += `<div class="Item ${newI}"  style="position: relative;">`
    +`<img onclick="ToggleHelp('upcs-help')" title="Help" alt="Help" src="photos/Help.png">`
    +`<input type="button" class="clear ${newI}" value="clear" style="width:60px; height:40px; margin:5px; padding:5px; font-size:small">`
    +`<input type="text" class="ordUPC" id="ordUPC" name="ordUPC" placeholder='ex: 1x210987654321' style="max-width: 185px;">`
    +`<input type="button" class="add ${newI}" value="add" style="width:60px; height:40px; margin:5px; padding:5px; font-size:small">`
    +`</div>`
    +`<br class="remove">`
    adds = document.querySelectorAll(`.add`);
    adds.forEach(newAdd => {
        newAdd.addEventListener("click", recursiveFunction);
        if(newAdd.className.split(" ")[1] != newI){
            newAdd.disabled = true;
        }
    })

    document.getElementById("custFirst").value = name;
    document.getElementById("custInv").value = inv;
    document.getElementById("ordDate").value = String(date);
    var count = 0;
    document.querySelectorAll(".ordUPC").forEach(item => {
        item.value = upclist[count].value;
        count++;
    })


}

function disableInputsOrders(){
    var newI = document.querySelectorAll(".add").length;
    adds = document.querySelectorAll(`.add`);
    adds.forEach(newAdd => {
        if(newAdd.className.split(" ")[1] != newI-1){
            newAdd.disabled = true;
        }
    })
}

function ArchiveRecord(){
    let archivedRecords = [];
    var pageName = window.location.pathname.split("/").pop();
    // Live/ Local
    if(document.cookie == ""){
        itemsOnHand = JoinDB(onHandInventory, items, "UPC");
    }
    else{
        if(pageName == "inventory.html"){
            itemsOnHand = JoinDB(Retrieve("itemsOnHand"), Retrieve("items"), "UPC");
        }
        if(pageName == "items.html"){
            items = Retrieve("items");
            // itemsonhand?

        }
    }
    cancel = confirm("Are you sure you want to delete this index?");
    if(!cancel) return;
    // Page Differences
    if (pageName == "inventory.html"){
        // Splice the archived item from the list. Add it to archived records.
        archivedRecords.push(itemsOnHand.splice((parseInt(this.className)), 1));
        Store("itemsOnHand", itemsOnHand, 1);
        RefreshInventoryDisplayedData();
        ButtonFunctionality();
    }
    else if(pageName == "items.html"){
        archivedRecords.push(items.splice(parseInt(this.className), 1));
        Store("items", items, 1);
        RefreshItemsDisplayedData();
        ButtonFunctionality();
    }
    if (pageName == "suppliers.html"){
        // Splice the archived item from the list. Add it to archived records.
        archivedRecords.push(Suppliers.splice((parseInt(this.className)), 1));
        Store("suppliers", Suppliers, 1);
        RefreshSuppliers();
        ButtonFunctionality();
    }
    else if(pageName == "ordering.html"){
        archivedRecords.push(orders.splice(parseInt(this.className), 1));
        Store("orders", orders, 1);
        refreshOrders();
        ButtonFunctionality();
    }
    
}

function RefreshAutoCompletes(){
    var pageName = window.location.pathname.split("/").pop();
    if(pageName == "inventory.html"){
        autocomplete(document.getElementById("upc"), generateListForAutocomplete(itemsOnHand, "UPC"));
        autocomplete(document.getElementById("date"), generateListForAutocomplete(itemsOnHand, "DateRecieved"));
        autocomplete(document.getElementById("quan"), generateListForAutocomplete(itemsOnHand, "QtyOnHand"));
        autocomplete(document.getElementById("cost"), generateListForAutocomplete(itemsOnHand, "Cost"));
    }
    if(pageName == "items.html"){
        autocomplete(document.getElementById("upc"), generateListForAutocomplete(items, "UPC"));
        autocomplete(document.getElementById("pname"), generateListForAutocomplete(items, "Name"));
        autocomplete(document.getElementById("itemdesc"), generateListForAutocomplete(items, "Details"));
        autocomplete(document.getElementById("manfactid"), generateListForAutocomplete(items, "ManFactID"));
        autocomplete(document.getElementById("serialnum"), generateListForAutocomplete(items, "SerialNum"));
    }
    if(pageName == "suppliers.html"){
        autocomplete(document.getElementById("supName"), generateListForAutocomplete(Suppliers, "Name"));
        autocomplete(document.getElementById("supStreet"), generateListForAutocomplete(Suppliers, "Street"));
        autocomplete(document.getElementById("supCity"), generateListForAutocomplete(Suppliers, "City"));
        autocomplete(document.getElementById("supPost"), generateListForAutocomplete(Suppliers, "PostCode"));
        autocomplete(document.getElementById("supProv"), generateListForAutocomplete(Suppliers, "Province"));
        autocomplete(document.getElementById("supPhone"), generateListForAutocomplete(Suppliers, "PhoneNumber"));
    }
    if(pageName == "ordering.html"){
        autocomplete(document.getElementById("custFirst"), generateListForAutocomplete(orders, "CustomerName"));
        autocomplete(document.getElementById("custInv"), generateListForAutocomplete(orders, "InvoiceID"));
        // autocomplete(document.getElementById("ordUPC"), generateListForAutocomplete(orders, "ManFactID"));
        autocomplete(document.getElementById("ordDate"), generateListForAutocomplete(orders, "OrderDate"));
    }
    if(pageName == "customers.html"){
        autocomplete(document.getElementById("custName"), generateListForAutocomplete(customers, "Name"));
        autocomplete(document.getElementById("custStreet"), generateListForAutocomplete(customers, "Street"));
        autocomplete(document.getElementById("custCity"), generateListForAutocomplete(customers, "City"));
        autocomplete(document.getElementById("custProv"), generateListForAutocomplete(customers, "Province"));
        autocomplete(document.getElementById("custPost"), generateListForAutocomplete(customers, "PostCode"));
        autocomplete(document.getElementById("custPhone"), generateListForAutocomplete(customers, "PhoneNumber"));
        
    }
    if(pageName == "sales.html"){
        autocomplete(document.getElementById("custInv"), generateListForAutocomplete(sales, "InvoiceID"));
        autocomplete(document.getElementById("custFirst"), generateListForAutocomplete(sales, "CustomerName"));
        autocomplete(document.getElementById("custAlt"), generateListForAutocomplete(sales, "AltCode"));
        autocomplete(document.getElementById("ordDate"), generateListForAutocomplete(sales, "OrderDate"));
    }
}


// Prevent forms from reloading page.
// var forms = document.getElementsByTagName("form");
// function handleForm(event) { event.preventDefault(); } 
// forms.forEach(form => function(){
//     form.addEventListener('submit', handleForm);
// });

function ToggleHelp(elementID) {
    var h = document.getElementById(elementID);
    h.style.display = h.style.display == "none" ? "block" : "none";
}


