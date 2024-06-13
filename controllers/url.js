const shortid=require("shortid");
const URL=require("../models/url")

async function handleGenerateNewURL(req,res){
    const shortId=shortid();
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"url is require"});
    await URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[],
        createBy:req.user._id,
    });
    // return res.json({id:shortId});
    return res.render("home",{id:shortId})
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({totleClicks:result.visitHistory.length,
        analytics:result.visitHistory
    });
}

module.exports={handleGenerateNewURL,handleGetAnalytics}
