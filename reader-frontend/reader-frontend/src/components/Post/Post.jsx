import { useState, useEffect } from "react";
import { useParams } from "react-router";
import './Post.css'
import { useOutletContext } from "react-router";
import CommentModal from '../CommentModal/CommentModal'
import { useNavigate } from "react-router";

//add props for USER
export default function Post() {

    const { user } = useOutletContext();
    const { postId } = useParams();
    const apiUrl = import.meta.env.VITE_API_LINK;


    const navigate = useNavigate();


    const [post, setPost] = useState([]);
    const [error, setError] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [content, setContent] = useState('');
    const [reRender, setRerender] = useState(1);

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
    }, [reRender]);

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
            //trigger a page rerender each time
            const newValue = reRender + 1
            setRerender(newValue)
        })
        .catch((err) => {
            console.log(err);
        });

    }


    return (
    <>
        <div className="article-page">
            <div className="article-body">
                <h1>{post.title}</h1>
                {/* waits for post.author to exist before displaying
                because it doesn't exist on initial render */}
                <h2>By: {post.author && post.author.name}</h2>
                <p>{post.body}</p>
            </div>
            
            <div className="comments-section">
                <h2>Comments</h2>
                {/* check that post comments exist, then check if there's more than one, THEN map
                Otherwise it won't map because nothing is there initially */}
                {post.comments && post.comments.length > 0 && (
                    <ul className='comments-list'>
                    {(post.comments).map((comment, index) => (
                        <div key={comment.id} className="commentCard">
                            <span><b>{comment.author.name}</b></span>
                            <span>{comment.content}</span>
                        </div>
                    ))}
                    </ul>
                )}
                <div className='leaveComment'>
                    {user ? ( <button onClick={openModal}>Add Comment</button> ) : ( <span><b>Login to leave a comment!</b></span> ) }
                </div>
            </div>
    
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