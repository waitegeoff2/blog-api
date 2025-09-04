const db = require('../db/queries')

// POSTS
//blog page displays all posts with authors
async function getPosts(req, res, next) {
    try {
        const posts = await db.getPosts()
        res.json(posts)
    } catch (error) {
        next(error)
    }
}

//clicking on post, you get the post info, author info, and comments
async function getSinglePost(req, res) {
    try {
        console.log(req.params)
        const postId = parseInt(req.params.postId);
        const post = await db.getSinglePost(postId)
        // const returnedFiles = files[0];
        res.json(post)
    } catch (error) {
        next(error)
    }
}

//find an author's posts
//id will be pulled from JWT TOKEN
async function getUserPosts(req, res){ 
    // try {
    // //const userId = GET FROM JWT TOKEN
    // //const posts = await db.getUserPosts(userId)
    // } catch(error) {
    //     next(error)
    // }
}

async function createPost(req, res) {
    try {
        let title = req.body.title;
        let author = req.body.author;
        let content = req.body.content;
        await db.createPost(author, title, content)
    } catch (error) {
        next(error);
    }
}

//edit post
//ADD

//delete post
async function deletePost(req, res){
    try {
        const postId = req.params.postId
        await db.deletePost(postId)
    } catch (error) {
        next(error);
    }
}

//COMMENTS
//post comment
async function postComment(req, res){
    try{
        const postId = req.params.postId
        const content = req.body.content

        await db.postComment(postId, content)
    } catch (error) {
        next(error)
    }    
} 

//delete comment
async function deleteComment(req, res){
    try {
        const commentId = req.params.commentId;
        await db.deleteComment(commentId)
    } catch (error) {
        next(error)
    }  
}



module.exports = {
    getPosts,
    createPost,
    getSinglePost,
    getUserPosts,
    deletePost,
    postComment,
    deleteComment,
}