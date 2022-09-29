import { useContext, useState } from 'react'
import { Avatar, Button } from "@mui/material"

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

import AuthContext from '../../../API/AuthContext';
import AXIOS from "../../../API/AXIOS"
const arr = [
    { label: "Tag", icon: <LocalOfferIcon className='tagIcon' /> },
    { label: "Location", icon: <AddLocationIcon className='locationIcon' /> },
    { label: "Feelings", icon: <EmojiEmotionsIcon className='feelingsIcon' /> },
]

export default function Share() {
    const { userInfo,creditionals } = useContext(AuthContext)

    const PROFILE_URL = `http://localhost:8800/${userInfo.profilePicture}`


    const [file, setFile] = useState('')
    function handleFile(e) {
        const f = e.target.files[0]
        setFile(f)
        const x = URL.createObjectURL(f)
       if(f.type.includes('image')){
        document.getElementById("imgFile").src = x
       }else if(f.type.includes('video')){
        document.getElementById("videoFile").src = x
       }
    }

    function uploadMedia(){
        const UPLOAD_URL=`/posts/${creditionals.id}`
        const token=creditionals.token
       
        const data=new FormData()
        data.append("file",file)
        AXIOS.post(UPLOAD_URL,data,{
            headers: {
                'Authorization':`Bearer ${token}`
              }
        })
        .then(res=>{
            console.log(res.data)
            alert("done")
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleIMG={
        display:(file!=='' && file.type.includes('image'))  ? "block" :"none"
    }
    const handleVIDEO={
        display:(file!=='' && file.type.includes('video')  ) ? "block" :"none"
    }
    return (
        <div className='TOPcONTAINER'>
            <div className='msgContainer'>
                <Avatar
                    src={PROFILE_URL}
                    sx={{ width: "60px", height: "60px", marginRight: "20px" }}
                />
                <input type="text" placeholder="What's in your mind ? .." className='msgInput' />
            </div>
            <hr size="3" width="90%" style={{ margin: "auto" }} />
            <div>
              {
                <div>
                    
                    <img src="" alt="err" id="imgFile" className='uploadableFile' style={handleIMG} />
                    <video controls id='videoFile' className='uploadableFile' style={handleVIDEO} >
                        <source src="" ></source>
                    </video>
                    </div>
              }
            </div>
            <div className='sharedComponents' >
                <div className='mediaUpload'>
                    <Button
                        sx={{ margin: "7px" }}
                        color="info"
                        component="label"
                        startIcon={<AddAPhotoIcon className='addMediaIcon' />}
                    >Photo or video
                        <input type="file" hidden onChange={handleFile} />

                    </Button>
                </div>
                {

                    arr.map(obj => {
                        return (
                            <Button key={obj.label}
                                className={obj.className || 'media-btn'}
                                sx={{ margin: "7px" }}
                                color="info"
                                startIcon={obj.icon}
                            >{obj.label}</Button>
                        )
                    })
                }
                <div className='sharebtn'>
                    <Button
                        variant='contained'
                        color='success'
                        size="small"
                        onClick={uploadMedia}
                    >Share</Button>
                </div>
            </div>

        </div>
    )
}
