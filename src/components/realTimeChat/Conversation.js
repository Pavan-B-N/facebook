import { useEffect, useContext, useState } from 'react'
import { Avatar, Typography } from "@mui/material"
import AutContext from "../../API/AuthContext"
import AXIOS from "../../API/AXIOS"

export default function Conversation(props) {
    const notificationsArray = props.notificationsArray
    const setNotificationsArray = props.setNotificationsArray

    const { creditionals } = useContext(AutContext)
    const [currentFriend, setCurrentFriend] = useState('')
    const chat = props.chat

    const [isOnline, setIsonline] = useState(false)
    const OnlineUserList = props.OnlineUserList


    useEffect(() => {
        const condition = OnlineUserList?.find(e => e.userId === currentFriend._id)
        console.log(OnlineUserList)
        if (condition) {
            setIsonline(true)
        } else {
            setIsonline(false)
        }
    }, [OnlineUserList])


    let notises = 0;
    notificationsArray.map(e => {
        if (e == currentFriend._id) {
            notises += 1
        }
    })


    useEffect(() => {
        const friendId = chat.members.find(element => element !== creditionals.id)
        AXIOS.get(`/users/${friendId}/userInfo`)
            .then(res => {
                setCurrentFriend(res.data)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    function handleMedia() {
        if (window.innerWidth <= 500) {
            document.getElementById("chatbox").style.display = "block"
            document.getElementById("usersListConversations").style.display = "none"
        }
    }
    return (
        <>
            <div className="peoples" onClick={handleMedia}  >
                <Avatar sx={{ marginRight: "20px" }}
                    src={`http://localhost:8800/${currentFriend.profilePicture}`}
                />
                <div className="people-detail">
                    <Typography variant="body1">{currentFriend.username}</Typography>
                    {

                        isOnline &&
                        <Typography variant="body2" className="online-text">online</Typography>

                    }
                    {
                        notises !== 0 &&
                        <Typography variant="subtitle" className='unread' >{notises}</Typography>

                    }
                </div>
            </div>

        </>
    )
}
