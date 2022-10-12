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

function Store(key, data, expireDays){
    const date = new Date();
    date.setTime(date.getTime() + (expireDays*24*60*60*1000));
    let expires = "expires="+ date.toUTCString();
    document.cookie = `${key} = ${JSON.stringify(data)};${expires};path=:/`;
}

function Retrieve(key){
    var cookies = {};
    console.log(document.cookie);
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
            return c.substring(name.length, c.length);
        }
    }
    return "";
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
