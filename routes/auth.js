const router=require("express").Router()

//local
const SIGNUP=require("../controllers/auth/signup")
const LOGIN=require("../controllers/auth/login")

//register
router.post("/register",(req,res)=>{
    SIGNUP(req,res)
})

router.post("/login",(req,res)=>{
    LOGIN(req,res)
})

module.exports=router