const express=require("express");
const URL=require("../models/url")

const router =express.Router();

router.get("/",async(req,res)=>{
    if (!req) return res.redirect('/login')
    const allurls=await URL.find({ createBy: req.user._id});
    console.log(allurls)
    return res.render("home",{
        urls:allurls,
        //ab is url s ko hum front-end pe render karenge
    });
})

router.get("/signup",(req,res)=>{
    return res.render("signup")
})
router.get("/login",(req,res)=>{
    return res.render("login")
})

module.exports=router;