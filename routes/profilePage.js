const express = require('express')
const path = require('path')
const { isAuthenticated } = require('../passportConfig')
const passport = require('passport')
const router = express.Router()
require('mongoose')
require('../database/conn')

router.get('/', isAuthenticated, (req, res) => {
    const { firstName, lastName, gender, phoneNumber, emailID, address } = req.user
    res.render('profile', { firstName, lastName, gender, phoneNumber, emailID, address })
})

router.get('/logout', async function (req, res, next) {
    try {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/signin');
        });
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;