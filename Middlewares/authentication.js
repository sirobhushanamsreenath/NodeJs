const logger = require('./../Library/loggerInfo');
const response = require('./../Library/responseLib');

let isAuthenticated = (req, res, next) =>{
    if(req.params.authToken || req.query.authToken || req.header('authToken')){
        if(req.params.authToken == "Admin" || req.query.authToken =="Admin" || req.header('authToken') == "Admin"){
            req.user = {fullName : 'Admin', userId:'Admin'}
            next();
        }
        else {
            logger.captureError('Authentication token is incorrect','authentication : isAuthenticated',10);
            let apiResponse = response.generate(true,'Authentication token is incorrect',403,null);
            res.send(apiResponse);
        }
    } else {
        logger.captureError('Access is denied','authentication : isAuthenticated',10);
        let apiResponse = response.generate(true,'Access is denied',403,null);
        res.send(apiResponse);
    }

}

module.exports = {
    isAuthenticated : isAuthenticated
}