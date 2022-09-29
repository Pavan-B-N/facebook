const express=require("express")
const router=express.Router()

const MessageModel=require("../models/messageModel")

router.post("/",async (req,res)=>{
    const {chatId,senderId,text}=req.body
    const message=new MessageModel({
        chatId,senderId,text
    })
    try{
        const msg=await message.save()
        res.send(msg)
    }catch(err){
        res.send(err)
    }

})

router.get("/:chatId",async (req,res)=>{
    const chatId=req.params.chatId
    try{
        const chats=await MessageModel.find({chatId:chatId})
        res.send(chats)
    }catch(err){
        res.send(err)
    }
})

module.exports=router
