const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require('../db/queries')

//DO THIS ON REACT SIDE
// const emptyErr = "is required"
// const lengthErr = "must be between 1 and 50 characters."
// const emailErr = "must be formatted like an email."
// const pwMatchErr = "Passwords do not match"

// const validateUser = [
//     body("name").trim()
//     .notEmpty().withMessage(`Your name ${emptyErr}`)
//     .isLength({ min: 1, max: 50 }).withMessage(`Full name ${lengthErr}`),
//     body("username").trim()
//     .isLength({ min: 1, max: 50 }).withMessage(`Full name ${lengthErr}`)
//     .isEmail().withMessage(`Email ${emailErr}`), 
//     body('password')
//     .notEmpty().withMessage(`Password ${emptyErr}`)
//     .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
//     body('confirmpassword')
//         .notEmpty().withMessage(`Confirm Password ${lengthErr}`)
//         .custom((value, { req }) => {
//             if (value !== req.body.password) {
//                 throw new Error(`${pwMatchErr}`);
//             }
//             return true;
//         }),
// ]


//get user data from jwt. use jwt to find user id, search db for that user, return user to react
async function getUserData(req, res, next) {
    //get the user data from the decoded JWT which is attached to req.user
    try {
        console.log(req.user)
        let userData = req.user;
        res.status(200).json({ userData })
    } catch(error) {
        next(error);
    }
}

async function createUser(req, res, next) {
    try {
        const user = req.body;
        console.log(req.body)
        let name = req.body.name;
        let username = req.body.username;
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await db.createUser(name, username, hashedPassword)
        res.json({ message: 'User created' }) //is this necessary?
    } catch(error) {
        next(error);
    }
}


//make user an author
async function becomeAuth(userId) {
    await db.becomeAuth(userId);
}

//delete user
async function deleteUser(req, res, next) {
    try {

    } catch(err) {
        next(err);
    }
}

module.exports = {
    getUserData,
    createUser,
    becomeAuth,
    deleteUser
}