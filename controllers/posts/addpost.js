const PostModel = require("../../models/postModel")
const UserModel = require("../../models/usersModel")
const ADD_NEW_POST = async (req, res) => {
    const userId=req.params.userId
    const userData=await UserModel.findById(userId)
    const media=req.file.filename
    const desc=req.body.desc || null
    const mediaType=req.file.mimetype
    try {
        const isValidUser = await UserModel.findById(userId)
        if(!isValidUser) return res.send("user not belogs to these application")
    }catch(err){
        return res.send("invalid id")
    }

    const newPost=new PostModel({
       userId,
       username:userData.username,
       profilePicture:userData.profilePicture,
       mediaType,
       media,
       desc,
    })
    let isAdded=await newPost.save()
    if(isAdded) return res.send("Successfully added")
    res.send("something went wrong")
}
module.exports= ADD_NEW_POST