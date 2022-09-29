const UserModel=require("../../models/usersModel")
const GetAllUsers=async(req,res)=>{
    const AllUsers=await UserModel.find(null,{email:1,username:1,profilePicture:1,coverPicture:1});
    res.send(AllUsers)
}
module.exports= GetAllUsers;