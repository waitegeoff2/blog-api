import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function Post() {
    const { postId } = useParams();
    console.log(postId)

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
                console.log(response.comments)
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
            <div className="comments-section">
                {/* {(post.comments).map((comment, index) =>(
                <div key={comment.id} className="commentCard">

                    <span>{comment.content}</span>
                </div>
                ))} */}
            </div>
        </>
        )
}