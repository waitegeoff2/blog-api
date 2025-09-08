import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar'

function App() {
  const [user, setUser] = useState(null);
  const [triggerJwt, setTriggerJwt] = useState(null);

  return (
    <>
      <NavBar user={user} setUser={setUser} setTriggerJwt={setTriggerJwt} />
      <Outlet context={{user, setUser, triggerJwt, setTriggerJwt}}/>
    </>
  )
}

export default App
