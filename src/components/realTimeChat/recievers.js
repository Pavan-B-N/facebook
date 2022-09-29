import "./chatTemplate.css"

import Conversation from "./Conversation"

import AuthContext from "../../API/AuthContext"


import AXIOS from "../../API/AXIOS"
import {useEffect,useState,useContext} from "react"
import {Fab,Tooltip} from "@mui/material"
import { AddBox } from "@mui/icons-material"
import {Drawer,Avatar} from "@mui/material"

const FriendItem = (props) => {
  const {creditionals}=useContext(AuthContext)
  function AddNewFriend(){
    props.setOpen(false)
    const URL=`/chats`
    const data={
      senderId:creditionals.id,
      receiverId:props.id
    }
    AXIOS.post(URL,data)
    .then(res=>{
      window.location.reload(true)
      
    })
    .catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className='friendbox  draweritms'  onClick={AddNewFriend} >
      <Avatar
        src={`http://localhost:8800/${props.src}`}
        sx={{ width: "40px", height: "40px", marginRight: "12px" }}
      />
      <pre>{props.name}</pre>
    </div>
  )
}


function AddConversation(){
  const GET_ALL_USERS_URL = "/users"
  const [data, setData] = useState('')
  const [open,setOpen]=useState(false)
  useEffect(() => {
    AXIOS.get(GET_ALL_USERS_URL)
      .then(res => {
        setData(res.data)
        // console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return(
    <>
    <Tooltip title="Add new conversation"
    >
    <Fab  onClick={()=>setOpen(true)} 
    sx={{position:"absolute",bottom:"20px",right:"20px"}}
    color="success"
    >

      <AddBox/>
    </Fab>
    </Tooltip>

    <Drawer open={open}
    anchor={'left'}
    onClose={()=>setOpen(false)}
    id="drawerParent" 
    >
      <h1>Users List</h1>
     {
      data &&
      data.map(e=>{
        return <FriendItem name={e.username} src={e.profilePicture} id={e._id} key={e._id} setOpen={setOpen} />
      })
     }
      </Drawer>
    </>
  )
}


export default function Receivers(props) {
  const chats = props.chats
  const setCurrentChat = props.setCurrentChat
const unReadMessages=props.unReadMessages
const setUnReadMessages=props.setUnReadMessages
const notificationsArray=props.notificationsArray
const setNotificationsArray=props.setNotificationsArray
const OnlineUserList = props.OnlineUserList

  return (
    <div className='receivers' id="usersListConversations" >
      <div className="conversations">
    <AddConversation/>
        {
          chats &&
          chats.map(chat => {
            return (
              <div onClick={() => setCurrentChat(chat)} key={chat._id}>
                <Conversation chat={chat} OnlineUserList={OnlineUserList}  unReadMessages={unReadMessages} setUnReadMessages={setUnReadMessages} notificationsArray={notificationsArray} setNotificationsArray={setNotificationsArray}  />
              </div>
            )
          })
        }
        


     

      </div>

    </div>
  )
}
