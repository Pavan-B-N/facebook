import React from 'react'
import "./rightbar.css"
import { Avatar, Typography } from "@mui/material"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
const FriendBox = (props) => {
  return (
    <>
      <div className='frinedbox  conatiner ' >
        <div className='frinedbox'  >
          <Avatar
            src={props.src}
            sx={{ height: "40px", width: "40px", marginRight: "25px" }}
          />
          <Typography variant='body1' >{props.name}</Typography>
        </div>
        <div>
          <FiberManualRecordIcon className='statusIcon' />
        </div>
      </div>
    </>
  )
}

const arr = [
    {src:"/",name:"pavan"}      
]
export default function Rightbar() {
  return (
    <div className='rightbar'>
      <pre className='online-title' >Online Friends</pre>
      {
        arr.length === 0 ?
          <pre className='userNotFound' >No Users are online</pre>
          :
          arr.map(obj => {
            return <FriendBox src={obj.src} name={obj.name} key={obj.src} />
          })
      }
    </div>
  )
}
