import { useState, useContext, useEffect } from 'react'
import "./auth.css"
import AXIOS from "../../API/AXIOS"

import AuthContext from "../../API/AuthContext"

import { CircularProgress, Alert } from "@mui/material"


import GoogleAuth from '../googleAuth/AuthComponent'

export default function Auth() {
  const LOGIN_URL = "/auth/login"
  const SIGHNUP_URL = "/auth/register"
  const { login, setCreditionals } = useContext(AuthContext)

  const [signUpMode, setSignUpMode] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    if (!signUpMode) {
      if (email !== "" && password !== "") {
        setAllowBtn(true)
      } else setAllowBtn(false)
    }
    else if (signUpMode) {
      if (username !== "" && email !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword) {
        setAllowBtn(true)
      } else setAllowBtn(false)
    }
  }, [username, email, password, confirmPassword, signUpMode])
  //btnAllow
  const [allowBtn, setAllowBtn] = useState(false)

  //progress
  const [progressOpen, setProgressOpen] = useState(false)

  //error
  const [error, setError] = useState("")
  const [severity, setSeverity] = useState('error')

  function handleToggle() {
    setSignUpMode(!signUpMode)
  }
  function handleLogin() {
    setProgressOpen(true)
    const data = {
      email,
      password
    }
    AXIOS.post(LOGIN_URL, data)
      .then(res => {
        setProgressOpen(false)
        localStorage.setItem('creditionals', JSON.stringify(res.data))
        setCreditionals(res.data)
        login()
      })
      .catch(err => {
        setError(err.response.data)
        setProgressOpen(false)

      })

  }
  function handleSubmitionBYKey(e){
    if(e.key==='Enter')
      handleLogin()
  }

  function handleSignUp() {
    setProgressOpen(true)
    const data = {
      email,
      password,
      username
    }
    AXIOS.post(SIGHNUP_URL, data)
      .then(res => {
        setProgressOpen(false)
        setSeverity("success")
        setError(res.data)
        setProgressOpen(false)

      })
      .catch(err => {
        console.log(err.response.data)
        setError(err.response.data.message || err.response.data || "error")
        setProgressOpen(false)

      })
  }
  return (
    <>
      <div className='auth-parent'>
        <h1 className='app-title-in-auth'>FaceBook</h1>

        <div className='auth-container'>
          <div className='auth-title'>
            <h1>Connect with Friends and world around you on Facebook</h1>
          </div>
          <div className='auth-box'>
            {
              error &&
              <Alert
                severity={severity}
                variant='filled'
              >{error}</Alert>
            }
            {
              signUpMode &&
              <input placeholder='username ' className='authField' value={username} onChange={(e) => setUsername(e.target.value)} />
            }
            <input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='authField' />
            <input placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='authField' onKeyPress={handleSubmitionBYKey} />
            {
              signUpMode &&
              <input placeholder='Confirm Password' type="password" className='authField' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            }
            {
              signUpMode &&
              <button className='authbtn' disabled={!allowBtn} onClick={handleSignUp}  >
                {
                  progressOpen ?
                    <CircularProgress sx={{ color: "white", marginRight: "20px" }} size="20px" />
                    :
                    "signup"
                }
              </button>
            }
            {
              !signUpMode &&
              <button className='authbtn' onClick={handleLogin} disabled={!allowBtn} >
                {
                  progressOpen ?
                    <CircularProgress sx={{ color: "white", marginRight: "20px" }} size="20px" />
                    :
                    "login"
                }
              </button>
            }
            <GoogleAuth/>
            <pre className='toggler' onClick={handleToggle}  >{!signUpMode ? "signup" : "Login"}</pre>
          </div>
        </div>
      </div>
    </>
  )
}
