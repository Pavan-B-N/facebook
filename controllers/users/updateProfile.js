const UserModel=require("../../models/usersModel")
const UpdateProfilePicture=async (req,res)=>{
   const filename=req.file.filename
    const id=req.params.id
    try{
        const d={profilePicture:filename}
        console.log(d)
        var update=await UserModel.findByIdAndUpdate(id,{$set:d})
        if(!update) return res.status(404).json("error")
    }catch(err){ 
        res.status(500).json({message:"error"})
    }
    console.log("updated")
    res.send("success")
}
module.exports=UpdateProfilePicture