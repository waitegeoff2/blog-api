import { useState } from 'react'
import './App.css'
import RegistrationForm from './components/Registration/Register'
import LoginForm from './components/Login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LoginForm />
    </>
  )
}

export default App
