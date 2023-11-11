const express = require("express");
const router = express.Router();
const MongoDB = require("../lib/mongo");
const mongo = new MongoDB();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken')
const config = require('../config');
require('../utils/auth/basic');

router.post('/login', 
passport.authenticate('basic', {session: false}),
async(req, res, next) => {
    const user = req.user;
    delete user.password;

    const token = jwt.sign(user, config.JWT_SECRET);

    /*res.cookie('jwt', token, {httpOnly: true})
    .status(200).json({
        message: 'Cookie enviada'
    });*/

    res.status(200).json({
        token
    })
}
);

router.post('/register', async(req, res, next) => {
    try {
        const userFound = await mongo.getOne("users", {email: req.body.email});
        if (userFound) {
            return res.status(403).json({
                message: "Este usuario ya existe."
            });
        }

        let user = req.body;
        user.password = await bcrypt.hash(user.password, 10);
        const result = await mongo.createOne("users", user);

        return res.status(200).json({
            result
        })
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;