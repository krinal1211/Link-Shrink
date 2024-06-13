const User=require("../models/user")
const {v4:uuidv4} = require('uuid')
const {setUser}=require('../service/auth')

async function handleUserSignup(req,res){
const {name,email,password}=req.body
await User.create({
    name,
    email,
    password,
});
return res.redirect("/");
}

async function handleUserLogin(req,res){
    const {email,password}=req.body
    const user=await User.findOne({email,password});
    if (!user) return res.render("login",{
        error:"invalid Username or password",
    });
    // agar tumhara sabkuch thik hoga to pehele session id bah=negi , and ak cookie banayenge jiska name "uid" denge
    const sessionId=uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId)

    return res.redirect("/");
    }

module.exports={
    handleUserSignup,
    handleUserLogin
}
