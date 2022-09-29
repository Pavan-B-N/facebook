const express=require("express")
const router=express.Router()

const ChatModel=require("../models/chatModel")

//createChat
router.post("/",async (req,res)=>{
    const newChat=new ChatModel({
        members:[req.body.senderId,req.body.receiverId]
    })
    try{
        const chat=await newChat.save()
        res.send(chat)
    }catch(err){
        res.send("error")
    }
})

//userChats
router.get("/:userId",async(req,res)=>{
    try{
        const userChats=await ChatModel.find({members:{$in:[req.params.userId]}})
        res.send(userChats)
    }catch(err){
        res.send("erropr")
    }
})

//findChat
router.get("/find/:firstId/:secondId",async (req,res)=>{
    try{
        const chat=await ChatModel.findOne(
            {
                members:{$all:[req.params.firstId,req.params.secondId]}
            }
        )
        res.send(chat)
    }catch(err){
        res.send("error")
    }
})

module.exports=router