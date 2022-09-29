import { Avatar, Typography } from "@mui/material"

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
export default function PostItem(props) {
    const type=props.type
    const name=props.name
    const profilePicture=props.profilePicture
    const url=props.src
  return (
    <div className='postConatiner' >
            <div className='postTopBar'>
                <div className='postTitle'>
                    <Avatar sx={{ width: "50px", height: "50px", marginRight: "20px" }} src={profilePicture} />
                    <Typography variant='body1' sx={{ marginRight: "20px" }}>{name}</Typography>
                    <Typography variant='body2'>5min Ago</Typography>
                </div>
                <div className='postOptions'>
                    <MoreVertIcon />
                </div>
            </div>

            <div className='post'>
                {
                    type==="image" &&
                <img src={url} alt="post" className='postIMG' />

                }
                {
                    type==='video' &&
                    <video controls className="postIMG"  >
                        <source src={url+"#t=5"} ></source>
                    </video>
                }
            </div>

            <div className='postBottomBar'>
                <div className='likes'>
                    <div className='likes'>
                        <ThumbUpIcon className='linkIcon' />
                        <span className='popularity'>20 <span className="desktopOnly">Likes</span></span>
                    </div>
                    <div className='likes'>
                        <FavoriteIcon className='loveIcon' />
                        <span className='popularity'>5 <span className="desktopOnly">Loves</span></span>
                    </div>
                </div>
                <div className='comments'>
                    <span className='popularity'>60 comments</span>
                </div>
            </div>

        </div>
  )
}
