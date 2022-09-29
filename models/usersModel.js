const mongoose=require("mongoose")

const UserScema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:"coverPicture.jpg"
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    }
},
{timestamps:true}
);


const userModel=mongoose.model("users",UserScema)

module.exports=userModel