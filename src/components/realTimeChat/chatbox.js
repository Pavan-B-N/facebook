import "./chatTemplate.css"
import { useEffect, useContext, useState } from 'react'

import AutContext from "../../API/AuthContext"
import AXIOS from "../../API/AXIOS"


import { Avatar, Typography } from "@mui/material"
import { EmojiEmotions, PhotoAlbumOutlined } from "@mui/icons-material"

import ScrollToBottom from "react-scroll-to-bottom"

import { format } from "timeago.js"

export default function ChatBox(props) {
    const notificationsArray = props.notificationsArray
    const setNotificationsArray = props.setNotificationsArray
    const currentChat = props.currentChat
    // const chat = props.chat
    const setSendMessage = props.setSendMessage
    const receivedMessage = props.receivedMessage

    const { creditionals } = useContext(AutContext)
    const [currentFriend, setCurrentFriend] = useState('')
    const [messages, setMessages] = useState([])
    const [textMessage, setTextMessage] = useState('')


    useEffect(() => {
        let newArray = [];
        notificationsArray.map(e => {
            if (e !== currentFriend._id) {
                newArray.push(e)
            }
        })
        setNotificationsArray(newArray)
    }, [currentFriend])


    //socket set message
    useEffect(() => {
        if (receivedMessage !== null && receivedMessage.senderId === currentFriend._id) {
            setMessages([...messages, receivedMessage])
            // console.log('receivedMessage=',receivedMessage)
        } else if (receivedMessage !== null) {
            setNotificationsArray([...notificationsArray, receivedMessage.senderId])
        }
    }, [receivedMessage])



    useEffect(() => {
        if (currentChat) {
            const friendId = currentChat.members.find(element => element !== creditionals.id)
            AXIOS.get(`/users/${friendId}/userInfo`)
                .then(res => {
                    setCurrentFriend(res.data)
                })
                .catch(err => {
                    console.log(err)
                })

            const currentChatId = currentChat._id
            AXIOS.get(`/messages/${currentChatId}`)
                .then(res => {
                    setMessages(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [currentChat])







    function sendMessage() {

        const data = {
            chatId: currentChat._id,
            senderId: creditionals.id,
            text: textMessage,
            receiverId: currentFriend._id,
            createdAt: new Date()
        }
        setSendMessage(data)
        AXIOS.post(`/messages`, {
            chatId: currentChat._id,
            senderId: creditionals.id,
            text: textMessage,
        })
            .then(res => {
                //socket
                setMessages([...messages, res.data])
                setTextMessage('')
            })
            .catch(err => {
                console.log(err)
            })
    }
    function handleEnterBtn(e) {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }
    return (
        <>
            <div className='chatbox' id="chatbox" >
                {
                    currentChat ?
                        <div>
                            <div className="cureentChatUser">
                                <Avatar sx={{ marginRight: "20px" }}
                                    src={`http://localhost:8800/${currentFriend.profilePicture}`}

                                />
                                <div className="people-detail">
                                    <Typography variant="body1">{currentFriend.username}</Typography>

                                </div>
                            </div>
                            <ScrollToBottom className="messages-container">
                                <div className="msg-parent">
                                    {
                                        messages &&
                                        messages.map(obj => {
                                            const isMine = !!(obj.senderId === creditionals.id)
                                            return (
                                                <>
                                                    <div className={isMine ? "own-MSGcontainer MSGcontainer " : "others-MSGcontainer MSGcontainer"} >
                                                        <div className={isMine ? "msg msg-own" : "msg msg-other"}
                                                            key={obj.senderId}
                                                        >{obj.text}</div>
                                                        <pre className="timeagoText" >{format(obj.createdAt)}</pre>

                                                    </div>

                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </ScrollToBottom>


                            <div className="msg-box">
                                <EmojiEmotions className="emoji" />
                                <input placeholder="Type Message.." className="msg-input-box"
                                    value={textMessage}
                                    onChange={(e) => setTextMessage(e.target.value)}
                                    onKeyPress={handleEnterBtn}
                                />
                                <PhotoAlbumOutlined className="emoji" />
                                <button className="sendBtn" onClick={sendMessage} >send
                                </button>
                            </div>
                        </div>
                        :
                        <Typography className="non-chat-box"
                            variant="h2"
                        >Open Conversation to see Chat box</Typography>
                }
            </div>

        </>
    )
}
