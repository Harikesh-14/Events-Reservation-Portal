const express = require('express')
const path = require('path')
const router = express.Router()
require('mongoose')
require('../database/conn')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "html", "signIn.html"))
})

module.exports = router