const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require('../db/queries')

const emptyErr = "is required"
const lengthErr = "must be between 1 and 50 characters."
const emailErr = "must be formatted like an email."
const pwMatchErr = "Passwords do not match"

const validateUser = [
    body("name").trim()
    .notEmpty().withMessage(`Your name ${emptyErr}`)
    .isLength({ min: 1, max: 50 }).withMessage(`Full name ${lengthErr}`),
    body("username").trim()
    .isLength({ min: 1, max: 50 }).withMessage(`Full name ${lengthErr}`)
    .isEmail().withMessage(`Email ${emailErr}`), 
    body('password')
    .notEmpty().withMessage(`Password ${emptyErr}`)
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('confirmpassword')
        .notEmpty().withMessage(`Confirm Password ${lengthErr}`)
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(`${pwMatchErr}`);
            }
            return true;
        }),
]

const createUser = [
validateUser,
async (req, res, next) => {
    //pass this on?
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), input: req.body });
    }
    try {
        const user = req.body;
        let name = req.body.name;
        let username = req.body.username;
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await db.createUser(name, username, hashedPassword)
        res.json(newUser, errors) //is this necessary?
    } catch(error) {
        next(error);
    }
}
]

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
    createUser,
    becomeAuth,
    deleteUser
}