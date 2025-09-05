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
            setArticles(response)
            
       })
      .catch((error) => setError(error))
    }, []);

    return (
        <div className="articles-section">
            <h1 className='blog-title'>Blog posts</h1>
            <h2>Fake blog</h2>
            <div className="articles-list">
                {articles.map((article, index) => (
                    <div key={article.id} className="articleCard">
                        <h2><Link to={`/posts/${article.id}`}>{article.title}</Link></h2>
                        <span><b>Author:</b> {article.author.name}</span>
                        <span><b>Created on:</b> {article.postTime}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}