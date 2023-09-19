const express = require('express')
const path = require('path')
const { isAuthenticated } = require('../passportConfig')
const passport = require('passport')
const router = express.Router()
require('mongoose')
require('../database/conn')

router.get('/signin', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('profile')
    } else {
        res.sendFile(path.join(__dirname, "../public", "html", "signIn.html"))
    }
})

router.post('/signin', async (req, res, next) => {
    try {
        if(req.isAuthenticated()) {
            req.logout()
            console.log("User logged out")
        }
        
        passport.authenticate("local", {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        })(req, res, next);
        
    } catch (err) {
        console.error("Error during authentication:", err);
        res.status(500).json({
            error: "Error in fetching the details from the database",
            errorMessage: err
        });
    }
});


module.exports = router