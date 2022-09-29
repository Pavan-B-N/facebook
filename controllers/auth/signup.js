const bcrypt=require("bcrypt")

//local
const UserModel=require("../../models/usersModel")

async function SIGNUP(req,res){
    const {username,email}=req.body
    let {password}=req.body
    try{
        let isUserExit=!!(await UserModel.findOne({email:email}))
        console.log(isUserExit)
        if(isUserExit) return res.status(403).json({message:"User Already exits"})
    }catch(err){
        return res.status(403).json({message:"error,User Already exits"})
    }
    try{
        password=await bcrypt.hash(password,10)
    }catch(err){
        console.log("error occured during hash the password")
        console.log(err)
        return res.status(500).send("try again")
    }
    const newUser=new UserModel({
        username,
        email,
        password
    })
    try{
        const user=await newUser.save()
        res.send("Successfully user created")
    }catch(err){
        console.log("error occured during account creation")
        console.log(err.message)
        res.send("account not created")
    }
}
module.exports=SIGNUP;