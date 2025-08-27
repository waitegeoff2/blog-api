const db = require('../db/queries')

async function getPosts(req, res) {
    try {
        const posts = await db.getPosts()
    } catch (err) {
        next(err);
    }
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

module.exports = {
    getPosts,
    createPost
}