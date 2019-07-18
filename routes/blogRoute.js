var express = require('express')
var blogController = require('./../Controllers/blogControllers')
let appConfig = require('./../Config/appConfig')
// const middleware = require('./../Middlewares/middleware')
const authentication = require('./../Middlewares/authentication')


let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion+'/blogs';
    app.get(baseUrl+'/split/name',blogController.splitName);
    app.get(baseUrl+'/calculate/age',blogController.calculateAge);
    app.post(baseUrl+'/createUser',blogController.createUser);
    app.get(baseUrl+'/users',blogController.getAllUser);
    app.get(baseUrl+'/users/:userId',blogController.getUserById);
    app.get(baseUrl+'/all', blogController.getAllBlogs);
    /**
     * @api {Get} /api/v1/blogs/all Get All Blogs
     * @apiVersion 0.0.1
     * @apiGroup Fetch
     * 
     * @apiParam {String} authToken The token for authentication
     * @apiParam {String} blogId blogId of the blog passes as URL parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
     * "error" : false,
     * "message" : "All Blog Details Found Successfully",
     * "status" : 200,
     * "data" : [
     *              {
     *                  blogId: "string",
     *                  title: "string",
     *                  description : "string",
     *                  bodyHtml : "string",
     *                  views : number,
     *                  isPublished : boolean,
     *                  category : "string",
     *                  author : "string",
     *                  tags : object(type = array),
     *                  created : "date",
     *                  lastModified : "date"
     *              }
     *          ]
     * }
     * 
     * @apiErrorExample {json} Error-Response:
     * 
     * {
     * "error" : true,
     * "message" : "Error Occured",
     * "status" : 500,
     * "data" : null
     * }
     */

    app.get(baseUrl+'/view/:blogId',authentication.isAuthenticated,blogController.viewByBlogId);
    /**
     * @api {Get} /api/v1/blogs/view/:blogId View Blog by blogId
     * @apiVersion 0.0.1
     * @apiGroup View
     * 
     * @apiParam {String} authToken The token for authentication
     * @apiParam {String} blogId blogId of the blog passed as URL parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
     * "error" : false,
     * "message" : "Blog Found Successfully",
     * "status" : 200,
     * "data" : []
     * }
     * 
     * @apiErrorExample {json} Error-Response:
     * 
     * {
     * "error" : true,
     * "message" : "Error Occured",
     * "status" : 500,
     * "data" : null
     * }
     */
    app.post(baseUrl+'/create',authentication.isAuthenticated, blogController.createBlog);
    /**
     * @api {post} /api/v1/blogs/create Create Blog
     * @apiVersion 0.0.1
     * @apiGroup Create
     * 
     * @apiParam {String} authToken The token for authentication
     * @apiParam {String} title title of the blog passed as a body parameter
     * @apiParam {String} description description of the blog passed as a body parameter
     * @apiParam {String} blogBody blogBody of the blog passed as a body parameter
     * @apiParam {String} category category of the blog passed as a body parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
     * "error" : false,
     * "message" : "Blog Created Successfully",
     * "status" : 200,
     * "data" : [
     *              {
     *                  blogId: "string",
     *                  title: "string",
     *                  description : "string",
     *                  bodyHtml : "string",
     *                  views : number,
     *                  isPublished : boolean,
     *                  category : "string",
     *                  author : "string",
     *                  tags : object(type = array),
     *                  created : "date",
     *                  lastModified : "date"
     *              }
     *          ]
     * }
     * 
     * @apiErrorExample {json} Error-Response:
     * 
     * {
     * "error" : true,
     * "message" : "Error Occured",
     * "status" : 500,
     * "data" : null
     * }
     */
    app.put(baseUrl+'/:blogId/edit', authentication.isAuthenticated, blogController.editBlog);
    /**
     * @api {Put} /api/v1/blogs/:blogId/edit Update Blog by blogId
     * @apiVersion 0.0.1
     * @apiGroup Update
     * 
     * @apiParam {String} authToken The token for authentication
     * @apiParam {String} blogId blogId of the blog passed as URL parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
     * "error" : false,
     * "message" : "Blog Updated Successfully",
     * "status" : 200,
     * "data" : []
     * }
     * 
     * @apiErrorExample {json} Error-Response:
     * 
     * {
     * "error" : true,
     * "message" : "Error Occured",
     * "status" : 500,
     * "data" : null
     * }
     */
    app.get(baseUrl+'/:blogId/count/view',authentication.isAuthenticated, blogController.increaseBlogView);
    /**
     * @api {Get} /api/v1/blogs/:blogId/count/view View Blog by blogId
     * @apiVersion 0.0.1
     * @apiGroup View Count
     * 
     * @apiParam {String} authToken The token for authentication
     * @apiParam {String} blogId blogId of the blog passed as the URL parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
     * "error" : false,
     * "message" : "Blog Count Updated Successfully",
     * "status" : 200,
     * "data" : [
     *              {
     *                  blogId: "string",
     *                  title: "string",
     *                  description : "string",
     *                  bodyHtml : "string",
     *                  views : number,
     *                  isPublished : boolean,
     *                  category : "string",
     *                  author : "string",
     *                  tags : object(type = array),
     *                  created : "date",
     *                  lastModified : "date"
     *              }
     *          ]
     * }
     * 
     * @apiErrorExample {json} Error-Response:
     * 
     * {
     * "error" : true,
     * "message" : "Error Occured",
     * "status" : 500,
     * "data" : null
     * }
     */
    app.post(baseUrl+'/delete/:blogId', authentication.isAuthenticated, blogController.deleteBlog);
    /**
     * @api {post} /api/v1/blogs/delete/:blogId Delete blog by blogId
     * @apiVersion 0.0.1
     * @apiGroup Delete
     * 
     * @apiParam {String} authToken The token for authentication
     * @apiParam {String} blogId blogId of the blog passed as URL parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
     * "error" : false,
     * "message" : "Blog Deleted Successfully",
     * "status" : 200,
     * "data" : []
     * }
     * 
     * @apiErrorExample {json} Error-Response:
     * 
     * {
     * "error" : true,
     * "message" : "Error Occured",
     * "status" : 500,
     * "data" : null
     * }
     */
}

module.exports = {
    setRouter : setRouter
}