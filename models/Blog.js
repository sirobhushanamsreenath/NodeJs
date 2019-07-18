//import mongoose module
const mongoose = require('mongoose')
//import schema
const Schema = mongoose.Schema;
let blogSchema = new Schema(
    {
        blogId : {
            type:String,
            unique:true
        },
        title :{
            type: String,
            required:true
        },
        description :{
            type: String,
            default: ''
        },
        bodyHtml :{
            type: String,
            default: ''
        },
        views :{
            type: Number,
            default: 0
        },
        isPublished : {
            type : Boolean,
            default : false
        },
        category:{
            type : String,
            default : ''
        },
        author:{
            type: String,
            default:''
        },
        tags:{
            type:Object,
            default:[]
        },
        created:{
            type: Date,
            default: Date.now
        },
        lastModified : {
            type : Date,
            default : Date.now
        },
        fullName: {
            type : String,
            default : ''
        },
        firstName: {
            type:String,
            default : ''
        },
        lastName : {
            type:String,
            default: ''
        },
        dob:{
            type: String,
            default : Date.Now
        },
        userId: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            default: ''
        }


    }
)

mongoose.model('Blog', blogSchema);

