// // const mongoose=require("mongoose");
// const {Schema,model}=require("mongoose");
// const {createHmac, randomBytes}=require("crypto");

// // mongoose.connect('mongodb://127.0.0.1:27017/code-editor')
// // .then(()=>console.log("MongoDb connected"))
// // .catch((err)=> console.log("MongoDb error",err));

// const userSchema =new Schema({
//     fullName:{
//         type : String,
//         required : true,
//     },
//     email:{
//         type:String,
//         required:true,
//         unique : true,
//     },
//     salt:{
//         type:String,
//         required:true,
        
//     },
//     password:{
//         type:String,
//         required:true,
        
//     },
    
// },{timestamps:true});

// userSchema.pre("save",function(next){
//     const user=this;

//     if(!user.isModified("password"))return;
//     const salt=randomBytes(16).toString();
//     const hashedPassword=createHmac("sha256",salt)
//     .update(user.password)
//     .digest("hex");

//     this.salt=salt;
//     this.password=hashedPassword;

//     next();


// });

// const User=model("user",userSchema);

// module.exports = User; 