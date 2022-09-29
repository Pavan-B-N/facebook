const multer=require("multer")



const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./cloud/profile")
    },
    filename:(req,file,cb)=>{
        const id=req.params.id
        cb(null,id+".jpg")
    }
})



const uplaod=multer({storage:storage}).single("image")

module.exports=uplaod;

