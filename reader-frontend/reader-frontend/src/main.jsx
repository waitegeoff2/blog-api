import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    //loads app
    path: '/',
    element: <App />,
    // children: [
    //    { index: true, element: <Home /> },
    //    { path: 'login', element: <Login /> },
    // ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
