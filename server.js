const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()

// const helmet=require("helmet")
const cors=require("cors")
// const morgan=require("morgan")

//port
const port=process.env.PORT || 8800


//mongoose connection
mongoose.connect(process.env.MOONGODB_URL,(err)=>{
    if(err) console.log("Cannot connect to the database")
    else console.log("Database connected successfully")
})

//local
const UserRoute=require("./routes/users")
const Auth=require("./routes/auth")
const PostsRoute=require("./routes/posts")
const ChatRoute=require("./routes/chats")
const MessageRoute=require("./routes/messages")
//middlewares
app.use(express.json())

// app.use(helmet())
app.use(cors())
app.use(express.static("./cloud/profile"))
app.use(express.static("./cloud/posts"))
// app.use(morgan("common"))

//local middleware
app.use("/users",UserRoute)
app.use("/auth",Auth)
app.use("/posts",PostsRoute)
app.use("/chats",ChatRoute)
app.use("/messages",MessageRoute)

app.get("/",(req,res)=>{
    res.send("<h1>Facebook server</h1>")
})


app.listen(port,()=>console.log(`server started with port ${port}`))