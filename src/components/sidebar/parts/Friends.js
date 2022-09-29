import { useEffect, useState } from 'react'
import { Avatar } from "@mui/material"
import {Link} from "react-router-dom"
import AXIOS from '../../../API/AXIOS'
const FriendItem = (props) => {

  return (
    <div className='friendbox'>
      <Avatar
        src={`http://localhost:8800/${props.src}`}
        sx={{ width: "40px", height: "40px", marginRight: "12px" }}
      />
      <pre>{props.name}</pre>
    </div>
  )
}


export default function Friends() {
  const GET_ALL_USERS_URL = "/users"
  const [data, setData] = useState('')
  useEffect(() => {
    AXIOS.get(GET_ALL_USERS_URL)
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <div>

        {
          data
          &&
          data.map(obj => {
            return <Link style={{textDecoration:"none"}}
            to={`/${obj._id}/profile`} key={obj._id}
            ><FriendItem src={obj.profilePicture} name={obj.username} /></Link>
          })
        }
      </div>
    </>
  )
}
