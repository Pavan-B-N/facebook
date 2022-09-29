import "./chat.css"

import Receivers from '../../components/realTimeChat/recievers'
import ChatBox from '../../components/realTimeChat/chatbox'

import AXIOS from "../../API/AXIOS"
import AutContext from "../../API/AuthContext"
import { useEffect, useState, useContext, useRef } from "react"
import {Link} from "react-router-dom"
//socket
import { io } from "socket.io-client";

import notify from "../../media/notify-1.wav"

export default function Chat() {
  //socket
  const socket = useRef();
  //
  const { creditionals } = useContext(AutContext)
  const [chats, setChats] = useState(null)
  const [currentChat, setCurrentChat] = useState(null)


  //socket new
  const [OnlineUserList, setOnlineUserList] = useState(null)
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [notificationsArray, setNotificationsArray] = useState([])


 



  useEffect(() => {

    socket.current = io("ws://localhost:4040");
    socket.current.emit("new-user-add", creditionals.id);
    socket.current.on("get-users", (users) => {
      setOnlineUserList(users);
    });
    socket.current.on("recieve-message", (data) => {
      const x = document.getElementById("audio")
      x.play()
      setReceivedMessage(data)

    });

  }, [creditionals]);


  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    if (creditionals) {
      const URL = "/chats/" + creditionals.id
      AXIOS.get(URL)
        .then(res => {
          setChats(res.data)

        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [creditionals])

  return (
    <>
      <audio id="audio" >
        <source src={notify}></source>
      </audio>
      <header className="header" >
        <pre className="header-title" >Messenger</pre>
        <div>
          <Link to="/"  className="home-url" >
          Home
          </Link>
        </div>
      </header>
      <div className='chat' >
        <ChatBox currentChat={currentChat}  setSendMessage={setSendMessage} receivedMessage={receivedMessage} setNotificationsArray={setNotificationsArray} notificationsArray={notificationsArray} />
        <Receivers chats={chats} OnlineUserList={OnlineUserList} setCurrentChat={setCurrentChat} setNotificationsArray={setNotificationsArray} notificationsArray={notificationsArray} />

      </div>
    </>
  )
}
