const UserModel=require("../../models/usersModel")
const GET_FRIENDS=async (req,res)=>{
    const userId=req.params.uid
    const data=await UserModel.findById(userId,{followers:1,_id:0,followings:1})
    const followersArray=data.followers;
    const followingsArray=data.followings;
    var followers=[]
    var followings=[]
    const needed={email:1,username:1,profilePicture:1,coverPicture:1}
    for(var i=0;i<followersArray.length;i++){
        let u=followersArray[i]
        let user=await UserModel.findById(u,needed)
        followers.push(user)
    }
    for(var i=0;i<followingsArray.length;i++){
        let u=followingsArray[i]
        let user=await UserModel.findById(u,needed)
        followings.push(user)
    }
    res.json({
        followers,
        followings
    })
}
module.exports=GET_FRIENDS;