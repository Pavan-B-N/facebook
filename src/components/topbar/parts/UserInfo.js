import { useState,useContext } from 'react'
import { Menu, MenuItem, Typography } from "@mui/material"
import { Avatar } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';

import AuthContext from '../../../API/AuthContext';
export default function UserInfo() {
  const {logout,userInfo}=useContext(AuthContext)
  const [profileAnchor, setProfileAnchor] = useState(null)
  const ProfileOpen = Boolean(profileAnchor)

  function CloseProfileAnchor() {
    setProfileAnchor(null)
  }
  function OpenProfileAnchor(event) {
    setProfileAnchor(event.currentTarget)
  }
  const PROFILE_URL=`http://localhost:8800/${userInfo.profilePicture}`


  const emailbox={border:"2px solid",borderRadius:"20px",padding:"13px"}
  const logoutstyle={color:"red",margin:"0.2em"}
  const logoutIconStyle={fontSize:"1.2rem"}
  function handleLogOut(){
    localStorage.clear("creditionals")
    logout()
  }
  return (
    <>
      <div className='useravatar'
      onClick={OpenProfileAnchor}
      >
        <Avatar
          src={PROFILE_URL}
          alt="A"
        />
      </div>
      {/* avatar MEnu */}
      <Menu
        anchorEl={profileAnchor}
        open={ProfileOpen}
        id="profilebox"
        onClose={CloseProfileAnchor}
        sx={{marginTop:"18px"}}

      >
        <MenuItem>
        <Avatar
        sx={{width:"150px",height:"150px",margin:"auto"}}
        src={PROFILE_URL}
        al="Profile"
        />
              <MenuItem>
        <hr color='brown'  size="1" width="100%" />
        </MenuItem>
      

        </MenuItem>
        <MenuItem>
        <Typography
        variant='h6'
        >{userInfo.username}</Typography>
        </MenuItem>
        <MenuItem>
        <hr color='brown'  size="1" width="100%" />
        </MenuItem>
        <MenuItem>
        <Typography
        variant='h6'
        sx={emailbox}
        >{userInfo.email}</Typography>
        </MenuItem>

        <MenuItem>
        <Typography
        variant='h6'
        sx={logoutstyle}
        onClick={handleLogOut}
        >Logout <LogoutIcon sx={logoutIconStyle} /> </Typography>
        </MenuItem>

      </Menu>
    </>
  )
}
