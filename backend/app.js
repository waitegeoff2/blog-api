// npm install express express-session pg passport passport-local ejs dotenv express-validator @quixo3/prisma-session-store cors
//REQUIRE brings  bring in external JavaScript files (modules) and make their exported functionalities available within the current file or scope. 
const path = require("node:path");
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
require('dotenv').config();
require('./config/passport');
const db = require('./db/queries')
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const prisma = require('./db/prisma')
const cors = require('cors');

//this allows the app to parse form data into req.
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use(express.json())

//static assets path (CSS, etc.)
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//parse form requests and makes available in req.body
app.use(express.urlencoded({ extended: false }));

//view library - don't need it for this one
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

//CURRENTUSER middleware: to allow access to currentUser in views to render the current user without having to pass it in
// insert this code somewhere between where you instantiate the passport middleware 
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//import routes
const indexRouter = require("./routes/indexRouter")
const postsRouter = require('./routes/postsRouter')
const userRouter = require('./routes/userRouter')
const loginRouter = require('./routes/loginRouter')

//router
app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/", userRouter);
app.use("/login", loginRouter);

// Error middleware: Every thrown error in the application or the previous middleware function calling `next` with an error as an argument will eventually go to this middleware function
app.use((error, req, res, next) => {
  console.error(`Uhoh something went wrong: ${error}`);
  //with throw new Error("OH NO!");
  // You will  see an OH NO! in the page, with a status code of 500 that can be seen in the network tab of the dev tools
  res.status(500).send(error);
});


const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Rest API Express app - listening on port ${PORT}!`);
});