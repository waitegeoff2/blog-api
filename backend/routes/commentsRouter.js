const { Router } = require("express");
const commentsRouter = Router();
const commentsController = require('../controllers/commentsController')

//get comments for a single post (such as if you click on the comment section)
commentsRouter.get('/posts/:postId/comments', commentsController.getComments)

//create comment

//delete comment

module.exports = commentsRouter;