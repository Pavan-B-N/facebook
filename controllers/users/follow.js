const UserModel=require("../../models/usersModel")
const FOLLOW=async (req,res)=>{
    const followerid=req.params.fid
    const userid=req.body.userid
    if(followerid===userid) return res.send("You cant follow yourself")
    try{
     var follower=await UserModel.findById(followerid)
        if(!follower) return res.send("follwer no found")
         var user=await UserModel.findById(userid)
        if(!user) return res.send("user not found")
    }catch(err){
        res.send("Invalid id")
    }

    if(follower.followers.includes(userid)) return res.send("You are already folloeing")
    await follower.updateOne({$push:{followers:userid}})
    await user.updateOne({$push:{followings:followerid}})
    res.send("successfully follwed")
}

module.exports=FOLLOW