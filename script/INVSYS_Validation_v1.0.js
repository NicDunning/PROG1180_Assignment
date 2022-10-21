/***********************
* INVENTORY VALIDATION *
************************/
function validateUPC(UPC) {
    let regex = "^\\d{12}$"
    let string = UPC.ToString().split("-").join("").split(" ").join("")

    if (!string.match(regex)) {
        return "Invalid UPC. Please provide a 12 digit number."
    }
    return
}

function validateQuantity(qty) {
    if (!Number.isInteger(+qty)) {
        return "Invalid quantity. Please provide a positive integer value."
    }
    if (qty < 0) {
        return "Invalid quantity. Please provide a positive integer value."
    }
    return
}

function validateDate(input) {
    var today = new Date()
    var date = new Date(input)

    if (date.getFullYear() > today.getFullYear()) {
        return "Invalid date. Please provide a date no later than today."
    }
    if ((date.getFullYear() == today.getFullYear()) && (date.getMonth() > today.getMonth())) {
        return "Invalid date. Please provide a date no later than today."
    }
    if ((date.getFullYear() == today.getFullYear()) && (date.getMonth() == today.getMonth()) && (date.getDate() > today.getDate())) {
        return "Invalid date. Please provide a date no later than today."
    }
    return
}

function validateCost(cost) {
    let string = cost.ToString()
    
    if (Number.isNaN(+cost)) {
        return "Invalid cost. Please provide a positive numerical value."
    }
    if (qty < 0) {
        return "Invalid cost. Please provide a positive value."
    }
    if (string.includes(".")) {
        if (string.split(".")[1].length > 2) {
            return "Invalid cost. Please provide a positive value with no more than two digits after the decimal point."
        }   
    }
    return
}



/*********************
* PRODUCT VALIDATION *
**********************/
function validateUPC(UPC) {
    let regex = "^\\d{12}$"
    let string = UPC.ToString().split("-").join("").split(" ").join("")

    if (!string.match(regex)) {
        return "Invalid UPC. Please provide a 12 digit number."
    }
    return
}

function validateName(string) {
    if (string.length > 30)  {
        return "Invalid name. Please provide a name of length 30 characters or less."
    }
    return
}

function validateDetails(string) {
    if (string.length > 100)  {
        return "Invalid product details. Please provide product details of length 100 characters or less."
    }
    return
}

function validateSerial(string) {
    let regex = "^[A-Za-z0-9]+$"
    
    if (!string.match(regex)) {
        return "Invalid Serial Number. Please provide a serial number containing only letters and/or numbers."
    }
    return
}



/**********************
* SUPPLIER VALIDATION *
***********************/
function validateName(string) {
    if (string.length > 30)  {
        return "Invalid name. Please provide a name of length 30 characters or less."
    }
    return
}

function validateStreet(string) {
    if (string.length > 50) {
        return "Invalid Street Address. Please provide a street address of length 50 characters or less."
    }
    return
}

function validateCity(string) {
    if (string.length > 80) {
        return "Invalid City Name. Please provide a city name of length 80 characters or less."
    }
    return
}

function validateProvince(string) {
    provinces = [AB, BC, MB, NB, NL, NS, NT, NU, ON, PE, QC, SK, YE]
    if (!provinces.includes(string.ToUpper())) {
        return "Invalid Province Code. Please provide a valid two-letter province code."
    }
    return
}

function validatePostCode(string) {
    let regex = "^[A-Za-z]\\d[A-Za-z][ \-]?\\d[A-Za-z]\\d$"
    if (!string.match(regex)) {
        return "Invalid Post Code. Please provide a valid post code. Example: \"L3C 7L3\""
    }
    return
}

function validatePhone(string) {
    let regex = "^\\s*\\+?\\d{0,2}[. -]?\\(?\\d{3}\\)?[. -]?\\d{3}[. -]?\\d{4}[. -]?x?(\\d{4})?"
    if (!string.match(regex)) {
        return "Invalid Phone Number. Please provide a valid phone number."
    }
    return
}



/**********************
* CUSTOMER VALIDATION *
***********************/
function validateFirstName(string) {
    let regex = "^[A-Za-zÀ-ÖØ-öø-ÿ -.']{1,50}$"
    if (!string.match(regex)) {
        return "Invalid First Name. Please provide a first name of length 50 characters or shorter using only letters, spaces, or the following characters: - . '"
    }
    return
}

function validateLastName(string) {
    let regex = "^[A-Za-zÀ-ÖØ-öø-ÿ -.']{1,100}$"
    if (!string.match(regex)) {
        return "Invalid Last Name. Please provide a last name of length 100 characters or shorter using only letters, spaces, or the following characters: - . '"
    }
    return
}

function validateStreet(string) {
    if (string.length > 50) {
        return "Invalid Street Address. Please provide a street address of length 50 characters or less."
    }
    return
}

function validateCity(string) {
    if (string.length > 80) {
        return "Invalid City Name. Please provide a city name of length 80 characters or less."
    }
    return
}

function validateProvince(string) {
    provinces = [AB, BC, MB, NB, NL, NS, NT, NU, ON, PE, QC, SK, YE]
    if (!provinces.includes(string.ToUpper())) {
        return "Invalid Province Code. Please provide a valid two-letter province code."
    }
    return
}

function validatePostCode(string) {
    let regex = "^[A-Za-z]\\d[A-Za-z][ \-]?\\d[A-Za-z]\\d$"
    if (!string.match(regex)) {
        return "Invalid Post Code. Please provide a valid post code. Example: \"L3C 7L3\""
    }
    return
}

function validatePhone(string) {
    let regex = "^\\s*\\+?\\d{0,2}[. -]?\\(?\\d{3}\\)?[. -]?\\d{3}[. -]?\\d{4}[. -]?x?(\\d{4})?"
    if (!string.match(regex)) {
        return "Invalid Phone Number. Please provide a valid phone number."
    }
    return
}



/**********************
 * INVOICE VALIDATION *
 *********************/
function validateDate(input) {
    var today = new Date()
    var date = new Date(input)

    if (date.getFullYear() > today.getFullYear()) {
        return "Invalid date. Please provide a date no later than today."
    }
    if ((date.getFullYear() == today.getFullYear()) && (date.getMonth() > today.getMonth())) {
        return "Invalid date. Please provide a date no later than today."
    }
    if ((date.getFullYear() == today.getFullYear()) && (date.getMonth() == today.getMonth()) && (date.getDate() > today.getDate())) {
        return "Invalid date. Please provide a date no later than today."
    }
    return
}



/***********************
 * EMPLOYEE VALIDATION *
 **********************/
function validateFirstName(string) {
    let regex = "^[A-Za-zÀ-ÖØ-öø-ÿ -.']{1,50}$"
    if (!string.match(regex)) {
        return "Invalid First Name. Please provide a first name of length 50 characters or shorter using only letters, spaces, or the following characters: - . '"
    }
    return
}

function validateLastName(string) {
    let regex = "^[A-Za-zÀ-ÖØ-öø-ÿ -.']{1,100}$"
    if (!string.match(regex)) {
        return "Invalid Last Name. Please provide a last name of length 100 characters or shorter using only letters, spaces, or the following characters: - . '"
    }
    return
}

function validateDeptName(string) {
    let regex="^[A-Za-z0-9]{4}$"
    if (!string.match(regex)) {
        return "Invalid Department Name. Please provide a department name four characters in length using only letters and/or numbers."
    }
    return
}