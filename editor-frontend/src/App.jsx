import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
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
      //use jwt to make a fetch request to server
      fetch(`${apiUrl}/userinfo`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
      })
      .then((response) => response.json())
      .then((response) => {
        //server responds with data about the user extracted from JWT
        setUser(response.userData)
      })
      .catch((error) => {
          console.error("Token fetch failed", error);
          localStorage.removeItem("jwtToken"); 
    });
    } else {
      console.log('no token')
      setUser(null)
    }
  }, [triggerJwt]);

  return (
    <>
      <NavBar user={user} setUser={setUser} setTriggerJwt={setTriggerJwt} />
      <Outlet context={{user, setUser, triggerJwt, setTriggerJwt}}/>
    </>
  )
}

export default App
