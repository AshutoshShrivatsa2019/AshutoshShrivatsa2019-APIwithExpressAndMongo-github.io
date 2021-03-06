const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const config=require("../../config");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const User=require("../models/user");

router.post("/signup",(req,res,next)=>{

    

    let validate=new User().joiValidateUser(req.body);
    if(validate.error)
    {
        res.status(401).json({message:validate.error.details[0].message});
        return;
    }

    User.find({email:req.body.email})
    .exec()
    .then(data=>{
        if(data.length>=1){
        return res.status(409).json({
            message:"User Exists"
        })
    }
    else
    {
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                res.status(401).json({
                    error:err
                })
            }
            else{
                 const user=new User({
                    _id:new mongoose.Types.ObjectId(),
                    email:req.body.email,
                    password:hash
                });
    
                user.save()
                .then(result=>{
                    console.log(result);
                    return res.status(201).json({
                        message:"User created Sucessfully"
                    })
                })
                .catch(err=>{
                    res.status(401).json({
                        error:err
                    })
                })
            }
        })
    }
    })
    .catch(err=>{
        res.status(401).json({
            error:err
        })
    })

    

})

router.post("/login",(req,res,next)=>{

    User.findOne({email:req.body.email})
    .exec()
    .then(data=>{
        if(data.length<1){
        return res.status(401).json({
            message:"Authentication Failed"
        })
    }
    else{
        bcrypt.compare(req.body.password,data.password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    error:"Authentication Failed"
                })
            }

            if(result){

                const token=jwt.sign({
                    email:data.email,
                    userId:data._id
                },
                config.jwtSecretKey,
                {
                    expiresIn:"1h"
                }
                )

                return res.status(205).json({
                    message:"User Authentication Successful",
                    token:token
                })
            }
            else{
                return res.status(401).json({
                    message:"Authentication Failed"
                })
            }
        })
    }
    })
    .catch();

})

router.delete("/:userID",(req,res,next)=>{
    User.remove({_id:req.params.userID})
    .exec()
    .then(result=>{
        return res.status(202).json({
            message:"User Removed"
        })
    })
    .catch(err=>{
        return res.status(401).json({
            error:err
        })
    });
})













module.exports=router;