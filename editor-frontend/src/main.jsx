import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
import './index.css'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    //update routes
    children: [
       { index: true, element: <Navigate to="/posts" replace /> },
       { path: 'posts', element: <Articles /> },
       { path: 'posts/:postId', element: <Post /> },
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
