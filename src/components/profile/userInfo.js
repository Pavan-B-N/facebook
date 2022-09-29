import { useContext } from 'react'
import { Button, Typography } from "@mui/material"
import AuthContext from '../../API/AuthContext'
import AXIOS from "../../API/AXIOS"
export default function UserInformation(props) {
  const data = props.data

  const { creditionals } = useContext(AuthContext)


  function handleFollow() {
    const FOLLOW_URL = `/users/${data._id}/follow`
    console.log(FOLLOW_URL)
    const info = { userid: creditionals.id }
    AXIOS.put(FOLLOW_URL, info)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  function handleUnFollow(){
    const FOLLOW_URL = `/users/${data._id}/unfollow`
    console.log(FOLLOW_URL)
    const info = { userid: creditionals.id }
    AXIOS.put(FOLLOW_URL, info)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div>
      {
        data._id !== creditionals.id
        &&
        (
          <div>
          {
            data
            &&
           !(data.followers.includes(creditionals.id))
           ?
           <div className='follow'>
           <Button
             variant='contained'
             color="info"
             onClick={handleFollow}
           >Follow</Button>
         </div>
         :
         <div className='follow'>
         <Button
           variant='contained'
           color="info"
           onClick={handleUnFollow}
         >Un Follow</Button>
       </div>
       
          }
        

          </div>
        )
      }
      <h1 className='title'>User Information</h1>
      <div className='user-deatils'>
        <Typography variant='body1'>Email : {data.email}</Typography>
        <Typography variant='body1'>Username : {data.username}</Typography>
      </div>
    </div>
  )
}
