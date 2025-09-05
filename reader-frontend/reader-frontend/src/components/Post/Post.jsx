import { useState, useEffect } from "react";
import { useParams } from "react-router";
import './Post.css'
import { useOutletContext } from "react-router";
import CommentModal from '../CommentModal/CommentModal'
import { useNavigate } from "react-router";

//add props for USER
export default function Post() {

    const {user} = useOutletContext();
    const { postId } = useParams();
 
    console.log(user)

    const navigate = useNavigate();


    const [post, setPost] = useState([]);
    const [error, setError] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [content, setContent] = useState('');

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
                setPost(response) 
           })
          .catch((error) => setError(error))
    }, []);

    function openModal() {
        setIsModalOpen(true);
    }

    const closeModal = () => setIsModalOpen(false);

    async function handleSubmit(e) {
        setIsModalOpen(false)
        e.preventDefault()

        fetch(`http://localhost:3000/posts/${postId}`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content, user: user }), 
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {   
            console.log(response)
            navigate(`/posts/${postId}`)
        })
        .catch((err) => {
            console.log(err);
        });

    }


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
        <div className='leaveComment'>
        {user ? ( <button onClick={openModal}>Add Comment</button> ) : ( <span>Login to leave a comment!</span> ) }
        </div>
        <CommentModal isOpen={isModalOpen} onClose={closeModal}>
            <h2>Add comment</h2>
            <form className="registration-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Comment:</label>
                <input 
                    type="text"
                    id='content' 
                    name='content'
                    placeholder="Your comment here"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <input
                    type="hidden"
                    name="hiddenField"
                    value={user}
                />
                <button type="submit">Submit</button>
            </form>
        </CommentModal>
    </>
    )
}