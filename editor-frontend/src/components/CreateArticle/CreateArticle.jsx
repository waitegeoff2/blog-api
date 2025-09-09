import { useState, useRef } from "react";
import { useNavigate } from "react-router";

export default function CreateArticle() {

    const navigate = useNavigate();


    
    async function handleSubmit(e) {
        //post the article, make a post request to 
        //the articles
        e.preventDefault()
        const token = localStorage.getItem('jwtToken');

        fetch(`http://localhost:3000/posts`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Replace 'yourJwtToken' with the actual token
        },
        body: JSON.stringify({ title: title, author, content: content }), 
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {   
            console.log(response)
            navigate('/');
            //trigger a page rerender each time
            // const newValue = reRender + 1
            // setRerender(newValue)
        })
        .catch((err) => {
            console.log(err);
        });

    }

    return (
        <>
   
        </>
    )
}