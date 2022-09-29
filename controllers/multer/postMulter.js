const multer=require("multer")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,`./cloud/posts/`)
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const PostUplaod=multer({storage:storage}).single("file")

module.exports=PostUplaod;

