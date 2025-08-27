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
    try {
        const user = req.body;
        let name = req.body.name;
        let username = req.body.username;
        let password = req.body.password;
        //const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.createUser(name, username, password)
    } catch(err) {
        next(err);
    }
}
]

//delete user

module.exports = {
    createUser,
}