const db = require('../db/queries')

//get comments for a single post
async function getComments(req, res){
    const postId = req.params.postId
    const comments = await db.getComments(postId)
    res.json(comments)
}

//post comment

//delete comment

//edit comment

module.exports = {
    getComments,

}