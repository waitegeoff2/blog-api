import './Articles.css'
import { useEffect, useState } from "react";
import { Link } from 'react-router';

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    //fetch the articles to display
    useEffect(() => {
    fetch("http://localhost:3000/posts", { 
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            
            })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {   
            console.log(response)
            setArticles(response)
            
       })
      .catch((error) => setError(error))
    }, []);

    return (
        <div className="articles-section">
            {articles.map((article, index) =>(
                <div key={article.id} className="articleCard">
                    <Link to={`/posts/${article.id}`}>{article.title}</Link>
                    <span>Author: {article.author.name}</span>
                    <span>Created on: {article.postTime}</span>
                </div>
            ))}
        </div>
    )
}