var express = require('express')
const mongoose = require('mongoose')
require('./../models/Blog')
const shortid = require('shortid')
const response = require('./../Library/responseLib')

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
            console.log(err);
            let apiResponse = response.generate(true,'Failed to find Blog Details',500,null);
            res.send(apiResponse);
        }
        else if (result == undefined || result == null || result == ''){
            let apiResponse = response.generate(true,'No Blog Found',404,null);
            res.send(apiResponse);
        }
        else{
            let apiResponse = response.generate(false,'All Blog Details Found',200,result);
            res.send(apiResponse);
        }
    })
};//end get all the blogs

//View by blog id
let viewByBlogId = (req,res) =>{
    console.log(req.user);
    BlogModel.findOne({'blogId' : req.params.blogId}, (err,result) =>{
        if(err){
            let apiResponse = response.generate(true,'Error Occured',500,result);
            res.send(apiResponse);
        } else if(result == undefined || result == null || result == ''){
            let apiResponse = response.generate(true,'Blog Not Found',404,result);
            res.send(apiResponse);
        } else{
            let apiResponse = response.generate(false,'Blog Found successfully',200,result);
            res.send(result);
        }
    })
};//View by blog id

//Create a Blog
let createBlog = (req,res) =>{
    // console.log('blog called')
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
        lastModified : today
    }) //end create blog

    let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
    newBlog.tags = tags

    newBlog.save((err,result) =>{
        if(err){
            let apiResponse = response.generate(false,'Error Occured',500,null);
            res.send(apiResponse);
        } else{
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
            // console.log(err);
            let apiResponse = response.generate(true,'Error Occured',500,null)
            res.send(apiResponse);
        } else if(result == undefined || result == null || result =='') {
            // console.log('No Blog found');
            let apiResponse = response.generate(true,'No Blog Found',404,null);
            res.send(apiResponse);
        } else { 
            let apiResponse = response.generate(false,'Blog Updated successfully',200,result);
            res.send(result);
        }
    });
}// End editing the blog

//To increase the blog view
let increaseBlogView = (req,res) =>{
    BlogModel.findOne({'blogId' : req.params.blogId}, (err,result) =>{
        if(err){
            // console.log(err);
            let apiResponse = response.generate(true,'Error Occured',500,null);
            res.send(apiResponse);
        } else if(result == undefined || result == null || result == ''){
            // console.log('No Blog found');
            let apiResponse = response.generate(true,'No Blog Found',404,null);
            res.send(apiResponse);
        } else{
            result.views += 1;
            result.save(function(err,result){
                if(err){
                    // console.log(err);
                    let apiResponse = response.generate(true,'Error Occured',500,null);
                    res.send(apiResponse);
                } else{
                    // console.log('Blog updated successfully');
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
            // console.log(err);
            let apiResponse = response.generate(true,'Error Occured',500,null);
            res.send(apiResponse);
        }else if(result == undefined || result == null || result == ''){
            // console.log('No Blog found');
            let apiResponse = response.generate(true,'No Blog Found',404,null);
            res.send(apiResponse);
        } else{
            // console.log('Blog deleted successfully');
            let apiResponse = response.generate(false,'Blog Deleted successfully',200,result);
            res.send(apiResponse);
        }
    })
}

module.exports = {
    getAllBlogs:getAllBlogs,
    viewByBlogId:viewByBlogId,
    createBlog:createBlog,
    editBlog:editBlog,
    increaseBlogView:increaseBlogView,
    deleteBlog: deleteBlog
}