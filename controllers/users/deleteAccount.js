const UserModel=require("../../models/usersModel")
const bcrypt=require("bcrypt")

const DELETE_ACCOUNT= async (req,res)=>{
    const {email,password}=req.body
    try{
        var user=await UserModel.findOne({email:email})
        if(!user) return res.status(403).json({message:"You cannot deltete account,Invalid emails"})
    }catch(err){
        return res.json({message:"email not found"})
    }
    let isValidPassword=await bcrypt.compare(password,user.password)
    if(user.email!==email || !isValidPassword){
        return res.status(401).send("!invalid email or password")
    }
    try{
        let isDeleted=await user.delete()
        res.status(200).send("Successfully user deleted")
    }catch(err){
        res.send("something went wrong")
    }
}

module.exports=DELETE_ACCOUNT