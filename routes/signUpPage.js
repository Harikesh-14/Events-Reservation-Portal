const express = require('express')
const path = require('path')
const router = express.Router()
require('mongoose')
require('../database/conn')
const loginDetails = require('../database/loginDetails')

router.get('/register-user', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "html", "signUp.html"))
})

router.post('/register-user', async (req, res) => {
    try {
        const loginDetailFormat = new loginDetails({
            firstName: req.body.signUpFirstName,
            lastName: req.body.signUpLastName,
            emailID: req.body.signUpEmail,
            phoneNumber: req.body.signUpPhone,
            gender: req.body.signUpGender,
            address: req.body.signUpAddress,
            password: req.body.signUpPassword,
        })

        await loginDetailFormat.save()
        res.redirect('/signin')
    } catch (err) {
        res.status(500).json({
            error: "Error in inserting the details in the database",
            errorMessage: err
        })
    }
})

module.exports = router