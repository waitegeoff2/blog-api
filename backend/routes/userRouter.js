const { Router } = require("express");
const userRouter = Router();
const userController = require('../controllers/userController')
const passport = require("passport");
require('../config/passport');

//this is to get user data using id from JWT token, thus should be protected
userRouter.get('/userinfo', passport.authenticate('jwt', { session: false }), userController.getUserData)

userRouter.post('/signup', userController.createUser)

module.exports = userRouter;