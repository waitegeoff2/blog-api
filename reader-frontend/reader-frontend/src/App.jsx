import { useState, useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Register from './components/Registration/Register'
import Login from './components/Login/Login'
import NavBar from './components/NavBar/NavBar'

function App() {
  //pass user details through the app to use them
  const [user, setUser] = useState(null);
  const [triggerJwt, setTriggerJwt] = useState(null);
  const apiUrl = import.meta.env.VITE_API_LINK;


  useEffect(() => {
    //take jwt out of local storage
    const token = localStorage.getItem('jwtToken');
    if (token) {
      //user jwt to make a fetch request to server
      fetch(`${apiUrl}/userinfo`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // Replace 'yourJwtToken' with the actual token
        },
      })
      .then((response) => response.json())
      .then((response) => {
        //server responds with data about the user
        //extracted from JWT
        setUser(response.userData)
      })
      .catch((error) => {
          console.error("Token fetch failed", error);
          localStorage.removeItem("jwtToken"); // remove bad token
    });
    } else {
      console.log('no token')
      setUser(null)
    }
  }, [triggerJwt]);

  return (
    <>
      <NavBar user={user} setUser={setUser} setTriggerJwt={setTriggerJwt} />
      {/* renders wherever you are on the outlet links from the parent component (in this case, App) */}
      <Outlet context={{user, setUser, triggerJwt, setTriggerJwt}}/>
    </>
  )
}

export default App
