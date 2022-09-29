const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


//local
const UserModel=require("../../models/usersModel")

async function LOGIN(req,res){
    const {email,password}=req.body
    try{
        var userobj=await UserModel.findOne({email:email},{password:1})
        // console.log(userobj)
        if(!userobj) return res.status(401).send("user not found")
    }catch(err){
        console.log("error occured during email search")
        return res.status(500).send("try again")
    }

    let isValidPassword=await bcrypt.compare(password,userobj.password);
    if(!isValidPassword) return res.status(401).send("Wrong password")

    const token=jwt.sign(
        {email:email},
        process.env.SECRETE_KEY,
        {expiresIn:"1h"}
    )

    res.json({
        token:token,
        id:userobj._id,
        loggedTime:new Date()
    })


}
module.exports=LOGIN