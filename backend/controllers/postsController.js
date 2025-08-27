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

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getPosts,
    createPost
}