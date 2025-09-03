import { useState } from 'react'
import './App.css'
import RegistrationForm from './components/Registration/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RegistrationForm />
    </>
  )
}

export default App
