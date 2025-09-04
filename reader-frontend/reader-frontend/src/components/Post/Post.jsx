import { useState } from "react";
import { useParams } from "react-router";

export default function Post() {
    const { articleId } = useParams();
    console.log(articleId)

    const [post, setPost] = useState();
    const [error, setError] = useState();

    //useEffect to get post with post id (PARAM)
    useEffect(() => {
        fetch(`http://localhost:3000/posts/${articleId}`, { 
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
                setPost(response)
                
           })
          .catch((error) => setError(error))
        }, []);

        // return (

        // )
}