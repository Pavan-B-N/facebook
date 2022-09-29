const mongoose = require("mongoose")
const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    username:{
        type:String,
        required:true
    },
    
    profilePicture:{
        type:String,
        default:""
    },
    mediaType: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required:true
    },
    desc: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    }
})

const PostModel = mongoose.model("posts", PostSchema)

module.exports = PostModel