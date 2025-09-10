const { Router } = require("express");
const loginRouter = Router();
const jwtSecret = process.env.JWT_SECRET; // Use a strong, environment variable for production
const passport = require('passport')
const jwt = require('jsonwebtoken')


//when a post is made here (on React fill out the form and make the post request)
//authenticate the un and pw with passport
//then, create token and add id to payload
loginRouter.post(
      "/",
  passport.authenticate("local", { session: false, failWithError: true }), (req, res) => {
    console.log(req.user)
    const payload = { id: req.user.id };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
    console.log(token)
    return res.status(200).json({ message: 'Login successful', token: token });
    // If authentication succeeds, generate token
});

loginRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ message: 'Logout successful' });
  });
});

module.exports = loginRouter;