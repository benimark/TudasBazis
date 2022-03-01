const mongoose = require("mongoose")
const validator = require("validator")
const uniqueValidator = require("mongoose-unique-validator")

const menuSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        validate(value){
            if(value.length<3){
                throw new Error("A menüszövegnek minimum 3 karakterből kell állnia!")
            }
        }
    },
    url:{
        type:String
    },
    type:{
        type:String,
        required:true,
        default:"normal"
    },
    isPublic:{
        type:Number,
        required:true,
        default:1
    },
    icon:{
        type:String,
        default:"bi-list"
    },
    content:{
        type:String
    }
},{
    timestamps:true
})

const Menu = mongoose.model("Menu",menuSchema)

module.exports = Menu