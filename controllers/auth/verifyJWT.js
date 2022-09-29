const jwt=require("jsonwebtoken")
const VERIFYJWT=async (req,res,next)=>{
    const authHeader=await req.headers.authorization
    if(!authHeader) return res.status(404).json({message:"token not found"})
    const token=authHeader.split(' ')[1]
    const isVerified=await jwt.verify(
        token,
        process.env.SECRETE_KEY,
        (err,decoded)=>{
            if(err) return res.status(403).json({message:"unAuthorized"})
            req.userEmail=decoded.email//can be accesd any where
            next()
        }
    )
}
module.exports=VERIFYJWT;