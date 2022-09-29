const UserModel=require("../../models/usersModel")
const UNFOLLOW=async (req,res)=>{
    const followerid=req.params.fid
    const userid=req.body.userid
    if(followerid===userid) return res.send("You cant unfollow yourself")
    try{
        var follower=await UserModel.findById(followerid)
        if(!follower) return res.send("follwer not found")
        var user=await UserModel.findById(userid)
        if(!user) return res.send("user not found")
    }catch(err){
        res.send("Invalid id")
    }

    if(!(follower.followers.includes(userid))) return res.send("You are not following the user")
    await user.updateOne({$pull:{followings:followerid}})
    await follower.updateOne({$pull:{followers:userid}})
    
    res.send("successfully Unfollwed")
}

module.exports=UNFOLLOW