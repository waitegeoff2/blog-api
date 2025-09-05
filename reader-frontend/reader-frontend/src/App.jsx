import { useState, useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Register from './components/Registration/Register'
import Login from './components/Login/Login'
import NavBar from './components/NavBar/NavBar'

function App() {
  //don't think NECESSARY
  const [isLoggedIn, setIsLoggedIn] = useState();
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
        console.log(response)
        setUser(response)
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
      {/* renders wherever you are on the outlet links from the parent component (in this case, App) */}
      {/* NEXT: PASS USER into Post component and then use it to display add comment button */}
      {/* SEE USE OUTLET CONTEXT in shopping cart app (Shop component) to accept context from parent components */}
      <Outlet context={{user, setUser, triggerJwt, setTriggerJwt}}/>
    </>
  )
}

export default App
