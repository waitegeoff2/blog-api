const { Router } = require("express");
const postsRouter = Router();
const postsController = require('../controllers/postsController')
const passport = require("passport");
require('../config/passport');

postsRouter.get('/', postsController.getPosts)
postsRouter.post('/', passport.authenticate('jwt', { session: false }), postsController.createPost)

//find all of author's posts
postsRouter.get('/yourPosts', passport.authenticate('jwt', { session: false }), postsController.getUserPosts)

//take post from unpublished to published
postsRouter.post('/publish', passport.authenticate('jwt', { session: false }), postsController.publishPost)

//get a post and show the comments and the author
postsRouter.get('/:postId', postsController.getSinglePost)

//delete post
postsRouter.delete('/:postId', postsController.deletePost)

//edit post (this will receive info from an edit form)
//postsRouter.put('/:postId', postsController.editPost)

//COMMENTS
//create comment
postsRouter.post('/:postId', postsController.postComment)

//delete comment
postsRouter.delete('/:postId/:commentId', postsController.deleteComment)

module.exports = postsRouter;