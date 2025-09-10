import { useState, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router";
import './CreateArticle.css'

export default function CreateArticle() {
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const apiUrl = import.meta.env.VITE_API_LINK;


    const navigate = useNavigate();

    const { user } = useOutletContext();
    console.log(user)
    
    async function handleSubmit(e) {
        //post the article, make a post request to 
        //the articles
        e.preventDefault()
        const token = localStorage.getItem('jwtToken');

        fetch(`${apiUrl}/posts`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Replace 'yourJwtToken' with the actual token
        },
        body: JSON.stringify({ title: title, user: user, content: content }), 
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {   
            console.log(response)
            navigate('/');
        })
        .catch((err) => {
            console.log(err);
        });

    }

    return (
        <>
        <div className="create-section">
            <h2>Create New Blog Post:</h2>
            <form className="create-form" onSubmit={handleSubmit}>
                <input
                        type="hidden"
                        name="hiddenField"
                        value={user}
                />
                <div >
                    <label htmlFor="title">Title:</label>
                    <input
                    className="blog-title"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                </div>
                <div className="blog-content">
                    <label htmlFor="content">Content:</label>
                    <textarea
                    className="content-section"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    ></textarea>
                </div>
                <button type="submit">Create Post</button>
            </form>
        </div>
        </>
    )
}