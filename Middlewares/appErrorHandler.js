//Example for Error handling middleware
// implementing errorHandler
let globalErrorHandler = (err, req, res, next) => {
    console.log('application error handler called');
    console.log(err);
    res.send('some error occured at global level..');
} //end errorHandler

//implementing notFoundHandler
let globalNotFoundHandler = (req, res, next) =>{
    console.log('Global not found handler called..');
    res.status(404).send('Route not found in the application')
}//end notFoundHandler

module.exports = {
    globalErrorHandler : globalErrorHandler,
    globalNotFoundHandler : globalNotFoundHandler
}