// this contains a list of all an author's articles
// posts will be divided into PUBLISHED AND UNPUBLISHED (button to switch)
// button to publish post in unpublished section

import { useState, useEffect } from "react";
import './AuthorArticles.css';
import { useOutletContext } from "react-router";

export default function AuthorArticles() {
    const [activeTab, setActiveTab] = useState('tab1'); 
    const [publishedArticles, setPublishedArticles] = useState([]);
    const [unpublishedArticles, setUnpublishedArticles] = useState([]);
    const [error, setError] = useState();

    const {user} = useOutletContext()

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    //useEffect to get the author articles (published and unpublished)
    useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    fetch('http://localhost:3000/posts/yourPosts', {
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
    }, []);

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
            {/* ITERATE THROUGH published articles state */}
            <p>This is the content displayed when Tab 1 is active.</p>
          </div>
        )}

        {activeTab === 'tab2' && (
          <div className="tab-page">
            <h2>Not Published Yet</h2>
            <p>This is the content displayed when Tab 2 is active.</p>
          </div>
        )}
      </div>
    </div>
    </>
    )
}