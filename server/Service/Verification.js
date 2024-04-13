import  Jwt  from "jsonwebtoken";

export const verifyToken = (req,res,next) =>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({"code":401, message:"unAuthorized Activity"});

    Jwt.verify(token,process.env.TOKEN_SCR,(err,user)=>{
        if(err) return res.status(403).json({"code":403, message:"Token is not Valid"});
        req.user = user;
        next()
    });
}