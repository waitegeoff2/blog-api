const { Router } = require("express");
const userRouter = Router();
const userController = require('../controllers/userController')
const passport = require("passport");
require('../config/passport');

//this is to get user data using id from JWT token, thus should be protected
//passport decodes the jwt, and then attaches the info to req.user
userRouter.get('/userinfo', passport.authenticate('jwt', { session: false }), userController.getUserData)

//normal user signup
userRouter.post('/signup', userController.createUser)
//author signup
userRouter.post('/auth-signup', userController.createAuthor)

module.exports = userRouter;