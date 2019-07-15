//example of a Application middleware function
let middleware = (req,res,next) =>{
    req.user = {'firstName':'Sreenath','lastName':'Sirobhushanam'}
    next();
}

module.exports = {
    middleware : middleware
}