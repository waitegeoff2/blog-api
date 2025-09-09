const db = require('../db/queries')

// POSTS
//blog page displays all PUBLISHED posts with authors
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

//find an author's posts: need to get published and unpublished
//try to get BOTH PUBLISHED AND UNPUBLISHED HERE
async function getUserPosts(req, res, next){ 
try {
        let userData = req.user;
        let userId = req.user.id;
        let userPosts = await db.getUserPosts(userId)
        //returns both unpublished and published posts in different arrays
        res.status(200).json({ userPosts })
    } catch(error) {
        next(error);
    }
}

//create a post

async function createPost(req, res) {
    try {
        console.log(req.body)
        let author = req.body.user.id;
        let title = req.body.title;
        let content = req.body.content;
        await db.createPost(author, title, content)
        res.json({ message: "Post published" })
    } catch (error) {
        next(error);
    }
}

//publish post
async function publishPost(req, res) {
    try {
        const articleId = req.body.articleId;
        await db.publishPost(articleId)
         res.json({ message: "Post published" })
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
        console.log(req.body)
        const postId = parseInt(req.params.postId)
        const authorId = req.body.user.id;
        const content = req.body.content

        await db.postComment(postId, authorId, content)
        res.json({message: 'Comment posted'})
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
    publishPost,
    deletePost,
    postComment,
    deleteComment,
}