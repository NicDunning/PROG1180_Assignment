items = [
    {
        "UPC" : 123456789012,
        "Status" : true,
        "Name" : "Wrench",
        "Details" : "12-Inch Wrench",
        "ManFactID" : 0,
        "SerialNum" : 10000,
        "Cost" : 2.0
    }
    ,
    {
        "UPC" : 123456789013,
        "Status" : false,
        "Name" : "Screw Driver",
        "Details" : "Phillips Head Size 2",
        "ManFactID" : 2,
        "SerialNum" : 20000,
        "Cost": 2.5
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
        "QTY" : 10,
        "DateRecieved" : Date.now()
    }
    ,
    {
        "UPC" : 123456789013,
        "QTY" : 2,
        "DateRecieved" : Date.now()
    }
    // Template for onHandInventory 
    // ,
    // {
    //     "UPC" : ,
    //     "QTY" : ,
    //     "DateRecieved" : Date.now()
    // }
]

// Testing to make sure objects are visible
// const p = document.getElementById("test");
// const getButt = document.getElementById("get");
// const setButt = document.getElementById("set");


// p.innerHTML += JSON.stringify(items) + "<br/>";
// p.innerHTML += JSON.stringify(manufacturers) + "<br/>";
// p.innerHTML += JSON.stringify(onHandInventory) + "<br/>";

function Store(key, data){
    localStorage.setItem(key, JSON.stringify(data));
}

function Retrieve(key){
    var retrievedData = JSON.parse(localStorage.getItem(key));

    console.log(JSON.stringify(retrievedData), "as a string");

    sessionStorage.removeItem(key);
    localStorage.clear();
}

// setButt.addEventListener("click", Store);
// getButt.addEventListener("click", Retrieve);
