var express = require('express')
const mongoose = require('mongoose')
require('./../models/Blog')
const shortid = require('shortid')
const response = require('./../Library/responseLib')
const time = require('./../Library/timeLib')
const check = require('./../Library/checkLib')
const logger = require('./../Library/loggerInfo')


//testRoute
let testRoute = (req, res) =>{
    console.log(req.params);
    res.send(req.params);
};//end test Route

//importing the BlogModel here
let BlogModel = mongoose.model('Blog')

//get all the blogs
let getAllBlogs = (req,res) =>{
    BlogModel.find()
    .select('-__v -__id')
    .lean()
    .exec((err, result) =>{
        if(err){
            logger.error(err.message,'Blog Controller : getAllBlogs',10);
            let apiResponse = response.generate(true,'Failed to find Blog Details',500,null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)){
            logger.captureInfo('No Blog Found','Blog Controller : getAllBlogs', 9)
            let apiResponse = response.generate(true,'No Blog Found',404,null);
            res.send(apiResponse);
        }
        else{
            logger.captureInfo('All Blogs Details Found', 'Blog Controller : getAllBlogs',5);
            let apiResponse = response.generate(false,'All Blog Details Found',200,result);
            res.send(apiResponse);
        }
    })
};//end get all the blogs

//View by blog id
let viewByBlogId = (req,res) =>{
    BlogModel.findOne({'blogId' : req.params.blogId}, (err,result) =>{
        if(err){
            logger.error(err.message,'Blog Controller : viewByBlogId',10);
            let apiResponse = response.generate(true,'Error Occured',500,null);
            res.send(apiResponse);
        } else if(check.isEmpty(result)){
            logger.captureInfo('Blog Not Found','Blog Controller : viewByBlogId', 9);
            let apiResponse = response.generate(true,'Blog Not Found',404,null);
            res.send(apiResponse);
        } else{
            logger.captureInfo('Blog Found Successfully','BlogController : viewByBlogId', 5);
            let apiResponse = response.generate(false,'Blog Found Successfully',200,result);
            res.send(apiResponse);
        }
    })
};//View by blog id

//Create a Blog
let createBlog = (req,res) =>{
    var today = Date.now()
    let blogId = shortid.generate()

    let newBlog = new BlogModel({
        blogId : blogId,
        title : req.body.title,
        description: req.body.description,
        bodyHtml : req.body.bodyHtml,
        isPublished : true,
        category: req.body.category,
        author : req.body.author,
        created : today,
        lastModified : time.now(),
        tags:req.body.tags
    }) //end create blog

    // let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
    // let tags = req.body.tags? req.body.tags:[];
    // newBlog.tags = tags

    newBlog.save((err,result) =>{
        if(err){
            // return res.send(err);
            logger.captureError(err.message, 'Blog Controller : createBlog', 10);
            let apiResponse = response.generate(true,err,500,null);
            res.send(apiResponse);
        } else{
            console.log(result);
            logger.captureInfo('Blog Created Successfully','Blog Controller : createBlog', 5);
            let apiResponse = response.generate(false,'Blog Created Successfully',200,result);
            res.send(apiResponse);
        }
    });
}

//Editing the blog..
let editBlog = (req, res) =>{
    let options = req.body;
    BlogModel.updateOne({'blogId' : req.params.blogId}, options, {multi : true}).exec((err,result) =>{
        if(err){
            logger.error(err.message,'Blog Controller : editBlog',10);
            let apiResponse = response.generate(true,'Error Occured',500,null)
            res.send(apiResponse);
        } else if(check.isEmpty(result)) {
            logger.captureInfo('No Blog found','Blog Controller : eidtBlog', 9);
            let apiResponse = response.generate(true,'No Blog Found',404,null);
            res.send(apiResponse);
        } else { 
            logger.captureInfo('Blog Updated Successfully','Blog Controller : editBlog', 5);
            let apiResponse = response.generate(false,'Blog Updated Successfully',200,result);
            res.send(apiResponse);
        }
    });
}// End editing the blog

//To increase the blog view
let increaseBlogView = (req,res) =>{
    BlogModel.findOne({'blogId' : req.params.blogId}, (err,result) =>{
        if(err){
            logger.error(err.message,'Blog Controller : increaseBlogView', 10);
            let apiResponse = response.generate(true,'Error Occured',500,null);
            res.send(apiResponse);
        } else if(check.isEmpty(result)){
            logger.captureInfo('No Blog Found','Blog Controller : increaseBlogView', 9);
            let apiResponse = response.generate(true,'No Blog Found',404,null);
            res.send(apiResponse);
        } else{
            result.views += 1;
            result.save(function(err,result){
                if(err){
                    logger.error(err.message,'Blog Controller : increaseBlogView',10);
                    let apiResponse = response.generate(true,'Error Occured',500,null);
                    res.send(apiResponse);
                } else{
                    logger.captureInfo('Blogs views increased successfully','Blog Controller : increaseBlogView',5);
                    let apiResponse = response.generate(false,'Blog Views increased successfully',200,result);
                    res.send(apiResponse);
                }
            })
        }
    });
}; //End to increase the blog view

let deleteBlog = (req,res) =>{
    BlogModel.deleteOne({'blogId':req.params.blogId},(err,result) =>{
        if(err){
            logger.error(err.message,'Blog Controller : deleteBlog',10);
            let apiResponse = response.generate(true,'Error Occured',500,null);
            res.send(apiResponse);
        }else if(check.isEmpty(result)){
            logger.captureInfo('No Blog Found','Blog Controller : deleteBlog',9);
            let apiResponse = response.generate(true,'No Blog Found',404,null);
            res.send(apiResponse);
        } else{
            logger.captureInfo('Blog Deleted Successfully','Blog Controller : deleteBlog',5);
            let apiResponse = response.generate(false,'Blog Deleted successfully',200,result);
            res.send(apiResponse);
        }
    })
}

//Split Name functionality
let splitName = (req,res) =>{
    console.log(req.query.fullName);
    let name = req.query.fullName;
    let nameSplit = name.split(' ');
    let splittedName = {
        firstName : nameSplit[0],
        secondName : nameSplit[1]
    };
    res.send(splittedName);
}//end Split Name functionality

//calculate Age functionality
let calculateAge = (req,res) =>{
    console.log(req.query.dob);
    let today = new Date();
    let date = new Date(req.query.dob);
    let diff = today.getFullYear() - date.getFullYear();
    // console.log(diff);
    let exactAge = {
        age: diff
    }
    res.send(exactAge);
}// End calculate Age functionality

//Get user by id
let getAllUser = (req,res) =>{
    BlogModel.find()
    .select('-__v -__id')
    .lean()
    .exec((err, result) =>{
        if(err){
            res.send('Failed to show users');
        }
        else if (check.isEmpty(result)){
            res.send('Users Not Found');
        }
        else{
            res.send(result);
        }
    })
}

//create User
let createUser = (req,res) =>{
    let blogId = shortid.generate()
    let newBlog = new BlogModel({
        title : req.body.title,
        blogId : blogId,
        userId : req.body.userId,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email
    });
    newBlog.save((err,result) =>{
        if(err){
            res.send(err);
        }
        else {
            res.send(result);
        }
    })
}
//Get user by Id
let getUserById = (req,res) =>{
    BlogModel.findOne({'userId' : req.query.userId}, (err,result) =>{
        if(err){
            res.send('Error Occured');
        } else if(result === undefined || result === null || result === ''){
            res.send('Blog Not Found');
        } else{
            res.send(result);
        }
    })
}

module.exports = {
    getAllBlogs:getAllBlogs,
    viewByBlogId:viewByBlogId,
    createBlog:createBlog,
    editBlog:editBlog,
    increaseBlogView:increaseBlogView,
    deleteBlog: deleteBlog,
    splitName : splitName,
    calculateAge : calculateAge,
    getAllUser : getAllUser,
    createUser : createUser,
    getUserById :getUserById
}