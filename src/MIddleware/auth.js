const jwt=require("jsonwebtoken")
const {TOKEN_KEY}=process.env

const verifyToken=async(req, res,next)=>{
    const token=req.body.token || req.query.token
    if(!token){
       return res.status(403).send("Authorization id require")

    }
    try {
        const decodedToken= jwt.verify(token, TOKEN_KEY)
        req.currentUser=decodedToken

    }
        catch (error) {
        return res.status(401).send("Invalid Token provided")

    }
    return next()
}
module.exports=verifyToken