// const {Router} =require("express");
// // const {  Login } = require("../pages/Login");
// // const {  Signup } = require("../pages/Signup");
// const mongoose = require("mongoose");
// const User = require("../backend/database");

// const router=Router();

// // app.use(express.urlencoded({ extended: true }));

// mongoose.connect('mongodb://127.0.0.1:27017/code-editor')
// .then(()=>console.log("MongoDb connected"))
// .catch((err)=> console.log("MongoDb error",err));

// router.get("/login",(req,res)=>{
//     console.log("fuck");
//     return res.render('Login');

// });

// router.get("/signup",(req,res)=>{
//     return res.render('Signup');
// });

// router.post("/signup",async(req,res)=>{
//     const {fullName,email,password}=req.body;
//     await User.create({
//         fullName,
//         email,
//         password,
//     });
//     return res.redirect("/");
// });

// module.exports=router;