import { useState, useEffect } from "react";
import { useParams } from "react-router";
import './Post.css'

export default function Post() {
    const { postId } = useParams();

    const [post, setPost] = useState([]);
    const [error, setError] = useState();

    //useEffect to get post with post id (PARAM)
    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}`, { 
                method: 'GET',
                
                })
          .then((response) => {
            if (response.status >= 400) {
              throw new Error("server error");
            }
            return response.json();
          })
          .then((response) => {   
                console.log(response)
                setPost(response)
                
           })
          .catch((error) => setError(error))
    }, []);

    return (
    <>
        <div className="article-body">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
        <h2>Comments</h2>
        <div className="comments-section">
            {/* check that post comments exist, then check if there's more than one, THEN map
            Otherwise it won't map because nothing is there initially */}
            {post.comments && post.comments.length > 0 && (
                <ul>
                {(post.comments).map((comment, index) => (
                <div key={comment.id} className="commentCard">
                    <span>{comment.content}</span>
                    <span>By: {comment.author.name}</span>
                </div>
                ))}
                </ul>
            )}
        </div>
        <button>Add Comment</button>
    </>
    )
}