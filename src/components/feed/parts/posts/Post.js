import { useState } from 'react'
import PostItem from './postItem'

import AXIOS from '../../../../API/AXIOS'
export default function Post() {
  const [data, setData] = useState(null)
  useState(() => {
    const MYPOSTS_URL = "http://localhost:8800/posts/"
    AXIOS.get(MYPOSTS_URL)
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      {
        data &&
        data.map(obj => {
          const mediaType = obj.mediaType.split("/")[0]

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
