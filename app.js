const express = require('express')
const path = require('path')
const passport = require('passport')
const expressSession = require('express-session')
require('dotenv').config()

const { initializePassport, isAuthenticated } = require('./passportConfig');

const port = 3000 || process.env.PORT

const app = express()

app.use(expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))

initializePassport(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "public")))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const loginPageRoute = require('./routes/signInPage')
app.use('/', loginPageRoute)

const signUpPageRoute = require('./routes/signUpPage')
app.use('/', signUpPageRoute)

app.listen(port, (req, res) => {
    console.log(`Your server⚡ is running at: http://localhost:${port}/`)
})