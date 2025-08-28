const db = require('../db/queries')

//blog page displays all posts with authors
async function getPosts(req, res, next) {
    try {
        const posts = await db.getPosts()
        res.json(posts)
    } catch (error) {
        next(error);
    }
}

//clicking on post, you get the post info, author info, and comments
async function getSinglePost(req, res) {
    const postId = req.params.postId;
    const post = await db.getSinglePost(postId)
    // const returnedFiles = files[0];
    res.json(post)
}

async function createPost(req, res) {
    try {
        let title = req.body.title;
        let author = req.body.author;
        let content = req.body.content;
        await db.createPost(author, title, content)
    } catch (err) {
        next(err);
    }
}

//edit post

//delete post

//post comment
async function postComment(req, res){
    const postId = req.params.postId
    const content = req.body.content

    await db.postComment(postId, content)    
}
module.exports = {
    getPosts,
    createPost,
    getSinglePost,
    postComment
}