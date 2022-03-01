const express = require("express");
const router = express.Router();
const Menu = require("../models/menuModel")
const {authPublic} = require("../middleware/auth")

router.get('/get-items',authPublic,async(req,res)=>{
    if(req.user){
        const menus = await Menu.find({}).select(['-_id','-isPublic'])
        res.send(menus)
    }else{
        const public_menus = await Menu.find({isPublic:1}).select(['-_id','-isPublic'])
        res.send(public_menus)
    }
 })

module.exports = router;