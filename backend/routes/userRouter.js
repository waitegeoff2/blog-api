const { Router } = require("express");
const userRouter = Router();
const userController = require('../controllers/userController')

userRouter.post('/signup', userController.createUser)

module.exports = userRouter;