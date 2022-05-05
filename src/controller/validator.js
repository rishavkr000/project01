const ObjectId = require("mongoose").Types.ObjectId

let isValidRequestBody = function (body) {
    if (Object.keys(body).length === 0) return false;
    return true;
}

let isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.trim().length === 0) return false;
    return true;
}

let isValidObjectId = function (objectId) {
    if (!ObjectId.isValid(objectId)) return false;
    return true;
}

let isValidEmail = function (email) {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(email)
}

let isValidMobile = function (number) {
    let mobileRegex = /^\d{10}$/
    return mobileRegex.test(number)
}



module.exports = { isValidRequestBody, isValid, isValidObjectId, isValidEmail, isValidMobile }