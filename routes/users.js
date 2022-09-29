const router=require("express").Router()
const VERIFYJWT=require("../controllers/auth/verifyJWT")

//local
const DELETE_ACCOUNT=require("../controllers/users/deleteAccount")
const FOLLOW=require("../controllers/users/follow")
const UNFOLLOW=require("../controllers/users/unfollow")
const UpdateProfilePicture=require("../controllers/users/updateProfile")
const USERINFO=require("../controllers/users/UserInfo")
const GetAllUsers=require("../controllers/users/getAllUsers")
const GET_FRIENDS=require("../controllers/users/getFriends")
const upload=require("../controllers/multer/upload")
const UserModel=require("../models/usersModel")

//get all users
router.get("/",(req,res)=>{
    GetAllUsers(req,res)
})

//get specified user 
router.get("/:uid/userInfo",(req,res)=>{
    USERINFO(req,res)
})

//get followers and followings
router.get("/:uid/friends",async (req,res)=>{
    GET_FRIENDS(req,res)
})

//update profile
router.put("/:id/updateProfile",upload,(req,res)=>{
    UpdateProfilePicture(req,res)
})

//follow another users
router.put("/:fid/follow",(req,res)=>{
    FOLLOW(req,res)
})



//unfollow another users
router.put("/:fid/unfollow",(req,res)=>{
    UNFOLLOW(req,res)
})

//delete account
router.delete("/",(req,res)=>{
    DELETE_ACCOUNT(req,res)
})

module.exports=router