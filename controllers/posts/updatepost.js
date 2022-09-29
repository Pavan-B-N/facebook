const PostModel = require("../../models/postModel")
const UserModel = require("../../models/usersModel")
const { post } = require("../../routes/auth")

const UPDATE_POST = async (req, res) => {
    const { id, userId,desc } = req.body
    try {
        var post = await PostModel.findById(id)
        if(!post) return res.send("No post found")
    }catch(err){
        return res.send("invalid postid")
    }
    if(!(post.userId===userId)) return res.send("only creator can update the posts")
    let isUpdated=await post.updateOne({desc:desc})
    res.send("updated")

}
module.exports= UPDATE_POST