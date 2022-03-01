const jwt = require("jsonwebtoken")
const User = require("../models/userModel.js")
const dotenv = require("dotenv")
dotenv.config()

const authPublic = async(req,res,next) =>{
        try
        {
        const token = req.header('Authorization').replace('Bearer ','')
        const isGood = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({_id:isGood._id})
        req.user = user
        req.token = token
        next()
        }catch(error){
            req.user = null
            req.token = null
            next()
        }
}

const auth = async(req,res,next) =>{
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const isGood = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({_id:isGood._id})
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(400).send("Unauthorized")
    }
}
module.exports = {
    auth,
    authPublic
}