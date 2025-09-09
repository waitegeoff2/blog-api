import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar'

function App() {
  //pass user details through the app to use them
  const [user, setUser] = useState(null);
  const [triggerJwt, setTriggerJwt] = useState(null);

  useEffect(() => {
    //take jwt out of local storage
    const token = localStorage.getItem('jwtToken');
    if (token) {
      //user jwt to make a fetch request to server
      fetch('http://localhost:3000/userinfo', {
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

  function userLogout() {
        //for when a userlogs out, set user to null
  }
  
  return (
    <>
      <NavBar user={user} setUser={setUser} setTriggerJwt={setTriggerJwt} />
      <Outlet context={{user, setUser, triggerJwt, setTriggerJwt}}/>
    </>
  )
}

export default App
