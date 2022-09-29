import { useEffect, useState } from 'react'
import AXIOS from "../../API/AXIOS"

import { useParams } from "react-router-dom"
const FriendItem = (props) => {
    return (
        <div className='friends'>
            <img src={props.src} alt="error" className='friendImage' />
            <p>{props.name}</p>
        </div>

    )
}
export default function Friends() {
    const { userId } = useParams()

    const [followers, setFollowers] = useState(null)
    const [followings, setFollowings] = useState(null)
    useEffect(() => {
        const FRIENDS_URL = `/users/${userId}/friends`
        AXIOS.get(FRIENDS_URL)
            .then(res => {
                setFollowers(res.data.followers)
                setFollowings(res.data.followings)
            })
            .catch(err => {
                console.log(err)
            })
    }, [userId])
    return (
        <>
            <h1 className='title'>Follwers</h1>

            <div className="friendBoxContainer" >
                {
                    followers &&
                    followers.length!==0
                    ?
                    followers.map(obj => {
                        return <FriendItem src={`http://localhost:8800/${obj.profilePicture}`} name={obj.username} />
                    })
                    :
                    <pre className='noFriends'>No followers</pre>
                }
            </div>
            <h1 className='title'>followings</h1>
            <div className="friendBoxContainer" >
                {
                    followings &&
                    followings.length!==0
                    ?
                    followings.map(obj => {
                        return <FriendItem src={`http://localhost:8800/${obj.profilePicture}`} name={obj.username} />
                    })
                    :
                    <pre className='noFriends'>No followings</pre>

                }
            </div>
        </>

    )
}
