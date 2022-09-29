import { useContext, useState } from 'react'


import AuthContext from '../../API/AuthContext'
import "./profilePhoto.css"
import { Avatar, Button } from "@mui/material"
import AXIOS from "../../API/AXIOS"
import UploadIcon from '@mui/icons-material/Upload';

export default function ProfilePhoto(props) {
    const data=props.data
    const PROFILE_PICTURE=`http://localhost:8800/${data.profilePicture}`
    const Cover_PICTURE=`http://localhost:8800/${data.coverPicture}`
    const { userInfo, creditionals } = useContext(AuthContext)
    const [file, setFile] = useState('')
    function uploadFile(e) {
        setFile(e.target.files[0])
    }
    function updateProfilePicture() {
        const userid = creditionals.id
        const UPDATE_POST_URL = `/users/${userid}/updateProfile`
        console.log(UPDATE_POST_URL)
        const data = new FormData()
        data.append("image", file)
        data.append("email", userInfo.email)
        // console.log(userInfo.email)
        AXIOS.put(UPDATE_POST_URL, data)
            .then(res => {
                alert("succed")
                setFile('')
            })
            .catch(err => {
                alert("error")
            })
    }

    const Upload_Style = {
        display: "flex",
        maringButtom: "3px",
        alignItems: "center",
        justifyContent: "center"
    }
    return (
        <>
            <div className='profilephoto'>
                <img src={Cover_PICTURE} className='coverImg' alt='err' />
                <div className="profilePicture"  >
                    <Avatar
                        src={PROFILE_PICTURE}
                        sx={{ width: "200px", height: "200px" }}

                    />
                    <h2>{data.username}</h2>
            {
                data._id===creditionals.id &&
                <div style={Upload_Style} >
                <Button
                    variant='outlined'
                    component="label"
                    sx={{ margin: "5px" }}
                >
                    <input type="file" hidden onChange={uploadFile} />
                    Update </Button>
                <Button
                    variant='contained'
                    color='success'
                    disabled={file === "" && true}

                >
                    <UploadIcon onClick={updateProfilePicture}
                    /></Button>
            </div>
            }
                </div>
            </div>
        </>
    )
}
