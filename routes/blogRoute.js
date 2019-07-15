var express = require('express')
var blogController = require('./../Controllers/blogControllers')
let appConfig = require('./../Config/appConfig')
const middleware = require('./../Middlewares/middleware')


let setRouter = (app) =>{
    let baseUrl = appConfig.apiVersion+'/blogs';
    app.get(baseUrl+'/all', blogController.getAllBlogs);
    app.get(baseUrl+'/view/:blogId',middleware.middleware,blogController.viewByBlogId);
    app.post(baseUrl+'/create',blogController.createBlog);
    app.put(baseUrl+'/:blogId/edit', blogController.editBlog);
    app.get(baseUrl+'/:blogId/count/view', blogController.increaseBlogView);
    app.post(baseUrl+'/delete/:blogId',blogController.deleteBlog);
}

module.exports = {
    setRouter : setRouter
}