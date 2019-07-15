var express = require('express');
const http = require('http');
let appConfig = require('./Config/appConfig')
let fs = require('fs')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
//let cookieParser = require('cookie-parser')
let globalErrorMiddleware = require('./Middlewares/appErrorHandler');
const routeLoggerMiddleware = require('./Middlewares/routeLogger');
const helmet = require('helmet');
const logger = require('./Library/loggerInfo')

var app = express();


//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
//app.use(cookieParser())
app.use(globalErrorMiddleware.globalErrorHandler);
app.use(routeLoggerMiddleware.logIp);
app.use(helmet());


//Bootstrap models
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function(file){
    if(~file.indexOf('.js')) require(modelsPath+'/'+file)
});//end Bootstrap models


//Bootstrap routes
let routesPath = './routes'
fs.readdirSync(routesPath).forEach(function(file) {
    if(~file.indexOf('.js')){
        let route = require(routesPath+'/'+file)
        console.log('Include the followig file ')
        console.log(routesPath + '/' + file)
        route.setRouter(app)
    }
});//end Bootstrap routes

//calling 404 global handler after route
app.use(globalErrorMiddleware.globalNotFoundHandler)
//end global 404 handler



//handling mongoose connection error
mongoose.connection.on('error', function (err){
    console.log('database connection error');
    console.log(err);
}); //end mongoose connection error

//handling mongoose success event
mongoose.connection.on('open', function(err){
    if(err){
        console.log('database error');
        console.log(err);
    }
    else{
        console.log('database connected successfully..')
    }
}); //end mongoose success event

//listen to the server
app.listen(appConfig.port, () => {
    console.log('Example app is listening on port 3000!');
    //Creating a mongoDb connetion
    let db = mongoose.connect(appConfig.db.uri, {useNewUrlParser: true})
});//end listening to the server

