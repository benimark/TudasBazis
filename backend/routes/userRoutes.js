const express = require("express");
const router = express.Router();
const User = require("../models/userModel")
const {auth} = require("../middleware/auth")
const bcrypt = require("bcryptjs")

router.post("/signup",async(req,res)=>{
    try {
        const newUser = new User(req.body)
        const token = await newUser.generateToken()
        await newUser.save()
        res.send({
            email:newUser.email,
            name:newUser.name,
            token
        })
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/valid',auth,async(req,res)=>{
    if(req.user){
        res.send({email:req.user.email,name:req.user.name,token:req.token})
    }else{
        res.status(400).send(false)
    }
 })
router.post('/login',async(req,res)=>{
    const user = await User.findOne({email:req.body.email})
    if(user){
         if(bcrypt.compareSync(req.body.password,user.password)){
             const token = await user.generateToken()
             res.send({
                 email:user.email,
                 name:user.name,
                 token
             })
         }else{
             res.status(401).send({Error:"Érvénytelen email cím vagy jelszó"})
         }
    }else{
        res.status(401).send({Error:"Érvénytelen email cím vagy jelszó"})
    }
 })
 router.post('/admin-login',async(req,res)=>{
    const user = await User.findOne({email:req.body.email})
    if(user && user.isAdmin){
         if(bcrypt.compareSync(req.body.password,user.password)){
             const token = await user.generateToken()
             res.send({
                 email:user.email,
                 name:user.name,
                 token
             })
         }else{
             res.status(401).send({Error:"ACCESS DENIED"})
         }
    }else{
        res.status(401).send({Error:"ACCESS DENIED"})
    }
})

router.get('/user-list',auth,async(req,res)=>{
    if(req.user.isAdmin){
        const users = await User.find({}).select(['-password','-token'])
        res.send(users)
    }else{
        res.status(401).send("You do not have permission to access this route.")
    }
})


module.exports = router;