const mongoose=require("mongoose")

const MessageShema=new mongoose.Schema(
    {
        chatId:{
            type:String
        },
        senderId:{
            type:String
        },
        text:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

const messageModel=mongoose.model("messages",MessageShema)
module.exports=messageModel