// this contains a list of all an author's articles
// posts will be divided into PUBLISHED AND UNPUBLISHED (button to switch)
// button to publish post in unpublished section

import { useState, useEffect } from "react";
import './AuthorArticles.css';

export default function AuthorArticles() {
    const [activeTab, setActiveTab] = useState('tab1'); 
    const [publishedArticles, setPublishedArticles] = useState([]);
    const [unpublishedArticles, setUnpublishedArticles] = useState([]);
    
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    //useEffect to get the author articles (published and unpublished)
    useEffect(() => {
    fetch("http://localhost:3000/posts/yourPosts", { 
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
    <>
    <div className="tabs-container">
      <div className="tab-buttons">
        <button
          className={activeTab === 'tab1' ? 'active' : ''}
          onClick={() => handleTabClick('tab1')}
        >
          Tab 1
        </button>
        <button
          className={activeTab === 'tab2' ? 'active' : ''}
          onClick={() => handleTabClick('tab2')}
        >
          Tab 2
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'tab1' && (
          <div className="tab-page">
            <h2>Content for Tab 1</h2>
            <p>This is the content displayed when Tab 1 is active.</p>
          </div>
        )}

        {activeTab === 'tab2' && (
          <div className="tab-page">
            <h2>Content for Tab 2</h2>
            <p>This is the content displayed when Tab 2 is active.</p>
          </div>
        )}
      </div>
    </div>
    </>
    )
}