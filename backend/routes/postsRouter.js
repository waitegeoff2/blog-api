const { Router } = require("express");
const postsRouter = Router();
const postsController = require('../controllers/postsController')

postsRouter.get('/', postsController.getPosts)
postsRouter.post('/', postsController.createPost)
//get a post and show the comments and the author
postsRouter.get('/:postId', postsController.getSinglePost)

//delete comment

//COMMENTS
//create comment
postsRouter.post('/:postId', postsController.postComment)

//delete comment

module.exports = postsRouter;