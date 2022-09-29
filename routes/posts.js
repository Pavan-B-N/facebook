const router=require("express").Router()
const ADD_NEW_POST=require("../controllers/posts/addpost")
const UPDATE_POST=require("../controllers/posts/updatepost")
const DELETE_POST=require("../controllers/posts/deletepost")
const JWTVERIFY=require("../controllers/auth/verifyJWT")
const PostModel = require("../models/postModel")
const PostUplaod=require("../controllers/multer/postMulter")


router.get("/",async (req,res)=>{
    const data=await PostModel.find()
    const totalResults=await PostModel.find().sort({_id:-1});
    res.send(totalResults)
})

router.get("/pagination",async (req,res)=>{
    const {page,limit}=req.query;
    const skip=limit*(page-1)
    const totalResults=await PostModel.find();
    const data=await PostModel.find().limit(limit).skip(skip)
    res.json({totalResults:totalResults.length,posts:data})
})
router.get("/reverse",async(req,res)=>{
    const totalResults=await PostModel.find().limit(3).skip(2).sort({ _id: -1 });
    res.send(totalResults)
})

router.get("/:uid",async (req,res)=>{
    const uid=req.params.uid
    const data=await PostModel.find({userId:uid})
    res.send(data)
})

router.post("/:userId",JWTVERIFY,PostUplaod,(req,res)=>{
    ADD_NEW_POST(req,res)
})
router.put("/",(req,res)=>{
    UPDATE_POST(req,res)
})
router.delete("/",(req,res)=>{
    DELETE_POST(req,res)
})
module.exports=router