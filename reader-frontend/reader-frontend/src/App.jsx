import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Register from './components/Registration/Register'
import Login from './components/Login/Login'
import NavBar from './components/NavBar/NavBar'

function App() {

  //do I put a useEffect here to grab JWT token, including id and username
  //out of local storage??
    //then, I can pass those values into blog pages 
    // so they can display in certain areas??

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default App
