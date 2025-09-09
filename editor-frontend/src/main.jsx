import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
import './index.css'
import App from './App.jsx'
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
// import Articles from './components/Articles/Articles.jsx';
// import Post from './components/Post/Post.jsx'
import AuthorArticles from './components/AuthorArticles/AuthorArticles.jsx'
import CreateArticle from './components/CreateArticle/CreateArticle.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    //update routes
    children: [
        { index: true, element: <Navigate to="yourposts" replace /> },
      //  { path: 'posts', element: <Articles /> },
       { path: 'yourposts', element: <AuthorArticles /> },
      //  { path: 'posts/:postId', element: <Post /> },
       { path: 'login', element: <Login /> },
       { path: 'register', element: <Register /> },
       { path: 'create', element: <CreateArticle /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
