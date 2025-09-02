const { Router } = require("express");
const postsRouter = Router();
const postsController = require('../controllers/postsController')

postsRouter.get('/', postsController.getPosts)
postsRouter.post('/', postsController.createPost)
//get a post and show the comments and the author
postsRouter.get('/:postId', postsController.getSinglePost)

//delete post
postsRouter.delete('/:postId', postsController.deletePost)

//edit post (this will receive info from an edit form)
//postsRouter.put('/:postId')
//posts //CONTINUE THIS*******

//find author's (pull up all of an author's posts)
//usign id that will be pulled from JWT TOKEN
postsRouter.get('/yourPosts', passport.authenticate('jwt', { session: false }), postsController.getUserPosts)

//COMMENTS
//create comment
postsRouter.post('/:postId', postsController.postComment)

//delete comment
postsRouter.delete('/:postId/:commentId', postsController.deleteComment)

module.exports = postsRouter;