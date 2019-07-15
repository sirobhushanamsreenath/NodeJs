//library to generate same format of response for every API
let generate = (error, message, status, data) =>{
    let response = {
        error: error,
        message : message,
        status : status,
        data: data
    }
    return response
}
module.exports = {
    generate : generate
}