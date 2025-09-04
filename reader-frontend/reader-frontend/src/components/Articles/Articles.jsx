import './Articles.css'
import { useEffect, useState } from "react";

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
            body: JSON.stringify({ name, username, password, confirmPassword }), 
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
        // <div className="articles-section">
        //     {articles.map((article, index) =>(
        //             return ( 
                        
                    // )
        //     ))}
        // </div>
    )
}