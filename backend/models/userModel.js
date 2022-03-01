const mongoose = require("mongoose")
const bcrypt  = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"A név megadása kötelező!"],
        validate(value){
            if(value.length<3){
                throw new Error("A névnek minimum 3 karakterből kell állnia!")
            }
        }
    },
    email:{
        type:String,
        required:[true,"Az email cím megadása kötelező!"],
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Érvénytelen email cím")
            }
        }
    },
    password:{
        type:String,
        required:[true,"A jelszó megadása kötelező!"],
        validate(value){
            if(value.length<8){
                throw new Error("A jelszónak minimum 8 karakterből kell állnia!")
            }
        }
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    },
    token:{
        type:String,
        default:{}
    }
},{
    timestamps:true
})

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.token = token
    await user.save()
    return token
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model("User",userSchema)

module.exports = User