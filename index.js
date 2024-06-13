const express = require("express");
const { connectToMongoDb } = require("./connection");
const {restrictToLoggedinUserOnly,checkAuth}=require("./middleware/auth")
const URL = require("./models/url");
const cookieParser=require("cookie-parser");


const urlRoute = require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user")

const path=require("path")
//inbuilt modual

const app = express();
const PORT = 8001;


connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("connection with mongo is done!")
);

app.set("view engine","ejs")
app.set("views",path.resolve("./views"));

app.use(express.json());
//json formate
//we need a form data so use bellow one
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());




// app.get("/test",async(req,res)=>{
//   const allUrls=await URL.find({});
//   return res.render("home",{
//     urls:allUrls
//   });
// });

app.use("/url",restrictToLoggedinUserOnly, urlRoute);
app.use("/user",userRoute);
app.use("/",checkAuth,staticRoute);
app.use("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {        
      shortId,
    },
    {
      $push: {
        visitHistory:{
            timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectURL);
});



app.listen(PORT, () => console.log(`server started at PORT : ${PORT}`));
