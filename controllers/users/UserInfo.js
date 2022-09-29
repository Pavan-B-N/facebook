const UserModel=require("../../models/usersModel")

const USERINFO=async(req,res)=>{
    const id=req.params.uid
    try{
        var user=await UserModel.findById(id,{profilePicture:1,coverPicture:1,email:1,username:1,followers:1,followings:1})
        if(!user) return res.status(401).send("user not found")
        res.send(user)

    }catch(err){
        return res.status(500).send("invalid id")
    }
}
module.exports=USERINFO