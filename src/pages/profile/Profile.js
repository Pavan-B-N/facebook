import { useParams } from "react-router-dom"
import {  useEffect, useState,useContext } from 'react'
import AXIOS from "../../API/AXIOS"
import AuthContext from '../../API/AuthContext'

import "./profile.css"
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import ProfilePhoto from '../../components/profile/ProfilePhoto'
import Share from "../../components/feed/parts/Share"
import Friends from '../../components/profile/friends'
import Myposts from '../../components/profile/myposts'
import UserInformation from '../../components/profile/userInfo'
export default function Profile() {
  const {creditionals}=useContext(AuthContext)
  const { userId } = useParams()
  const [currentProfile,setCurrentProfile]=useState('')

  useEffect(()=>{
    const USER_INFORMATION_URL = `/users/${userId}/userInfo`
      AXIOS.get(USER_INFORMATION_URL)
        .then(res => {
          setCurrentProfile(res.data)

        })
        .catch(err => {
          console.log(err)
        })
  },[userId])



  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <Sidebar data={currentProfile} />
        <div className='profile'>
          <ProfilePhoto data={currentProfile} />
          <div className='profile-friends' >
            <div className='post-box' >
              {
                currentProfile._id===creditionals.id &&
                <Share />
              }
              <Myposts />
            </div>
            <div className='detail-friend-box'>
              <UserInformation data={currentProfile} />
            <Friends data={currentProfile} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
