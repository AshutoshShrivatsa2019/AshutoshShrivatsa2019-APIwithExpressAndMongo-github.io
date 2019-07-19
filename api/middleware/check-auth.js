const jwt=require("jsonwebtoken");
const config=require("../../config");

module.exports=(req,res,next)=>{
    try{
        if(req.method!="GET"){
        const token = req.headers.authorization.split(" ")[1];
        const verified=jwt.verify(token,config.jwtSecretKey,null,null)
        req.verifiedData=verified;
        }
        next();

    }
    catch(err){
        return res.status(404).json({
            error:"Authentication Failed"
        })
    }

}