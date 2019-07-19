const mongoose=require("mongoose");
const Joi=require("@hapi/joi");

const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:String,
    password:String
});

userSchema.methods.joiValidateUser=function(obj){
    var schema={
        email:Joi.string().email().min(10).required(),
        password:Joi.string().min(5).required()
    }
    return Joi.validate(obj,schema);
}

module.exports=mongoose.model("User",userSchema);