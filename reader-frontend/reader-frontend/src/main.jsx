import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './App.jsx'
import Login from './components/Login/Login.jsx';
import Register from './components/Registration/Register.jsx';

const router = createBrowserRouter([
  {
    //loads app
    path: '/',
    element: <App />,
    children: [
      //  { index: true, element: <Blogs /> },
       { path: 'login', element: <Login /> },
       { path: 'register', element: <Register /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
