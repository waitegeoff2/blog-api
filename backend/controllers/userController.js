const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require('../db/queries')

//get user data from jwt. use jwt to find user id, search db for that user, return user to react
async function getUserData(req, res, next) {
    //get the user data from the decoded JWT which is attached to req.user
    try {
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