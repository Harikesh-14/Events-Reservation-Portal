const LocalStrategy = require('passport-local').Strategy
const loginDetails = require('./database/loginDetails')

exports.initializePassport = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: "signInEmail",
        passwordField: "signInPassword"
    }, async (email, password, done) => {
        try {
            const user = await loginDetails.findOne({ emailID: email });

            if (!user) {
                return done(null, false);
            }

            if (user.password !== password) {
                return done(null, false);
            }            

            return done(null, user);
        } catch (err) {
            console.log(err);
            return done(err, false);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await loginDetails.findById(id);
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    });
}

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/signin");
}