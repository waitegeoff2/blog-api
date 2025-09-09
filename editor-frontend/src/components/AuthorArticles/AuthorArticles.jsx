// this contains a list of all an author's articles
// posts will be divided into PUBLISHED AND UNPUBLISHED (button to switch)
// button to publish post in unpublished section

import { useState, useEffect } from "react";
import './AuthorArticles.css';
import { useOutletContext, useNavigate } from "react-router";
import { Link } from "react-router";

export default function AuthorArticles() {
    const [activeTab, setActiveTab] = useState('tab1'); 
    const [publishedArticles, setPublishedArticles] = useState([]);
    const [unpublishedArticles, setUnpublishedArticles] = useState([]);
    const [error, setError] = useState();
    const [reRender, setRerender] = useState(1);
    const apiUrl = import.meta.env.VITE_API_LINK;
    const {user} = useOutletContext()
    const navigate = useNavigate()

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    //useEffect to get the author articles (published and unpublished)
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        fetch(`${apiUrl}/posts/yourPosts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Replace 'yourJwtToken' with the actual token
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
                setPublishedArticles(response.userPosts.publishedPosts)
                setUnpublishedArticles(response.userPosts.unPublishedPosts)
        })
        .catch((error) => setError(error))
    }, [reRender]);

    async function publishArticle(articleId) {
        try {
            console.log(articleId)
            const token = localStorage.getItem('jwtToken');

            fetch(`${apiUrl}/posts/publish`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Replace 'yourJwtToken' with the actual token
            },
            body: JSON.stringify({ articleId: articleId }), 
            })
            .then((response) => {
                //it was getting stuck here cause there was no response 
                return response.json();
            })
            .then((response) => {   
                console.log(response)
                const newValue = reRender + 1
                setRerender(newValue)
            })
            .catch((err) => {
                console.log(err);
            });
        } catch(error) {
            console.error("Error fetching user data:", error);
        }
    }

    return (
    <>
    <div className="page-title">{user && user.name ? (
        <h2>{user.name}'s Articles</h2>
      ) : (
        <h2>Your Articles</h2>
      )}</div>
    <div className="tabs-container">
      <div className="tab-buttons">
        <button
          className={activeTab === 'tab1' ? 'active' : ''}
          onClick={() => handleTabClick('tab1')}
        >
          Published Articles
        </button>
        <button
          className={activeTab === 'tab2' ? 'active' : ''}
          onClick={() => handleTabClick('tab2')}
        >
          Unpublished Articles
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'tab1' && (
          <div className="tab-page">
            <h2>Articles You've Published</h2>
            { publishedArticles && publishedArticles.length > 0 ? (
            <div className="author-articles-list">
                {publishedArticles.map((article, index) => (
                    <div key={article.id} className="author-article-card">
                        <h2><Link to={`/posts/${article.id}`}>{article.title}</Link></h2>
                        <span><b>Author:</b> {article.author.name}</span>
                        <span><b>Created on:</b> {article.postTime}</span>
                    </div>
                ))}
            </div>
            ) : (
                <p>No articles to display.</p>
            )
            }
          </div>
        )}

        {activeTab === 'tab2' && (
          <div className="tab-page">
            <h2>Unpublished Articles</h2>
            { unpublishedArticles && unpublishedArticles.length > 0 ? (
            <div className="author-articles-list">
                {unpublishedArticles.map((article, index) => (
                    <div key={article.id} className="author-article-card">
                        <div className="publish-bar">
                            <h2><Link to={`/posts/${article.id}`}>{article.title}</Link></h2>
                            <button onClick={() => publishArticle(article.id)} className="publish-article-btn">Publish article</button>
                        </div>
                        <span><b>Author:</b> {article.author.name}</span>
                        <span><b>Created on:</b> {article.postTime}</span>
                    </div>
                ))}
            </div>
            ) : (
                <p>No articles to display.</p>
            )
            }
          </div>
        )}
      </div>
    </div>
    </>
    )
}