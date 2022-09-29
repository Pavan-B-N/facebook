import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import PostItem from "../feed/parts/posts/postItem"
import AXIOS from "../../API/AXIOS"



export default function Myposts(props) {
  const { userId } = useParams()
  const [data,setData]=useState(null)
  useEffect(()=>{
  const MYPOSTS_URL="http://localhost:8800/posts/"+userId
    AXIOS.get(MYPOSTS_URL)
    .then(res=>{
      setData(res.data)

    })
    .catch(err=>{
      console.log(err)
    })
  },[userId])

  return (
    <div>
        <h1 className='title' >Posts</h1>
      {
        data &&
        data.map(obj=>{
          const mediaType=obj.mediaType.split("/")[0]
            return (
            <PostItem
             src={`http://localhost:8800/${obj.media}`}
              key={obj._id}
               name={obj.username} 
               type={mediaType}
               profilePicture={`http://localhost:8800/${obj.profilePicture}`}
              />
            )
        })
      }
    </div>
  )
}
