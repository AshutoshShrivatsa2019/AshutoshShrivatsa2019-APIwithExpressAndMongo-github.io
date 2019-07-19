const express=require("express");
const myapp=express();
const morgan=require("morgan");
const mongoose=require("mongoose");
const config=require("./config");
const checkAuth=require("./api/middleware/check-auth");

const productsRoute=require("./api/routes/products");

const ordersRoutes=require("./api/routes/order");

const userRoute=require("./api/routes/user");

myapp.use(morgan("dev"));

myapp.use(express.json());

myapp.use((req,res,next)=>{
    // res.status(200).json({
    //     message:"It works!"
    // });
    next();
//    console.log("It works!");
});

   // var mongoDB="mongodb://localhost/my_database";
   var mongoDB=config.mongoDB.host;
    mongoose.connect(mongoDB,{useNewUrlParser:true});

    var dbConn=mongoose.connection;
 
myapp.use("/api/user",userRoute);   

myapp.use("/",checkAuth);

myapp.use("/api/products",productsRoute);

myapp.use("/api/orders",ordersRoutes);



myapp.use((req,res,next)=>{
    const error=new Error("Route not Found!!");
    error.status=404;
    next(error);
})

myapp.use((error,req,res,next)=>{
    res.status(error.status||999);
    res.json({
        error:{
            errmessage:error.message,
            errstatus:error.status
        }
    })
})

module.exports=myapp;