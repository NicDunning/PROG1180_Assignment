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
    }
    // Template for onHandInventory 
    // ,
    // {
    //     "UPC" : ,
    //     "QtyOnHand" : ,
    //     "DateRecieved" : Date.now(),
    //     "Cost" :
    // }
]

function Store(key, data){
    localStorage.setItem(key, JSON.stringify(data));
}

function Retrieve(key){
    var retrievedData = JSON.parse(localStorage.getItem(key));

    console.log(JSON.stringify(retrievedData), "as a string");

    sessionStorage.removeItem(key);
    localStorage.clear();
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
