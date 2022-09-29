import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Auth from "./pages/auth/auth";
import Chat from "./pages/chat/chat";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import AuthContext from "./API/AuthContext";
import AXIOS from "./API/AXIOS";

import "./App.css"
function App() {
  const [isLoggedIn, setIsLoggedIN] = useState(false)
  const [creditionals,setCreditionals]=useState('')//token id logged-in-time
  const [userInfo, setUserInfo] = useState('')//email profile followers



  const login = useCallback(() => {
    setIsLoggedIN(true)
  }, [])
  const logout = useCallback(() => {
    setIsLoggedIN(false)
  }, [])


  useEffect(() => {

    const data = localStorage.getItem("creditionals")
    if (!data) return
    const creditionals=JSON.parse(data)
    const loogedTime=new Date(creditionals.loggedTime)
    const currentTime=new Date()
    const diff=(currentTime-loogedTime)
    const minuteDifference=diff/(60*1000)
    if(minuteDifference>50){
      logout()
      localStorage.clear("creditionals")
    }
    else{
      setCreditionals(creditionals)
      login()
    }
   
  }, [login,logout])

  
  useEffect(() => {
    if(isLoggedIn){
      const USER_INFORMATION_URL = `/users/${creditionals.id}/userInfo`
      AXIOS.get(USER_INFORMATION_URL, {
        headers: {
          'Authorization': `Bearer ${creditionals.token}`
        }
      })
        .then(res => {
          setUserInfo(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [creditionals])
  return (

    <AuthContext.Provider value={{ isLoggedIn, login, logout,creditionals,setCreditionals, userInfo, setUserInfo }} >

      <Router>
        <Switch>
          <Route exact path="/">
            {
              isLoggedIn ?
                <Home />
                :
                <Redirect to="/auth" />
            }
          </Route>
          <Route exact path="/:userId/profile">
            {
              isLoggedIn ?
                <Profile />
                :
                <Redirect to="/auth" />
            }

          </Route>
          <Route exact path="/auth">
            {
              !isLoggedIn ?
                <Auth />
                :
                <Redirect to="/" />
            }

          </Route>
          <Route path="/chat" exact >
            <Chat/>
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>

    </AuthContext.Provider>
  );
}

export default App;
