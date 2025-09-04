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
  const [user, setUser] = useState();

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
          localStorage.removeItem("jwt-token"); // remove bad token
    });
    }
  }, []);

  function userLogout() {
        //for when a userlogs out, set user to null
  }


  return (
    <>
      <NavBar />
      {/* renders wherever you are on the outlet links from the parent component (in this case, App) */}
      <Outlet context={user}/>
    </>
  )
}

export default App
