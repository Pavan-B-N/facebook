const mongoose=require("mongoose")

const ChatSchema=new mongoose.Schema({
    members:{
        type:Array,
        require:true
    }
})

const chatModel=mongoose.model("chat",ChatSchema)

module.exports=chatModel