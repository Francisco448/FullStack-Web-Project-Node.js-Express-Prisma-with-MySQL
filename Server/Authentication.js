const app = require('express').Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./Auth');

app.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('Account/signin.ejs');
})

app.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('Account/signup.ejs')
})

app.get('/Profile', isLoggedIn, (req, res) => {
    res.render('Profile/Profile.ejs');
})

app.post('/signup', isNotLoggedIn, passport.authenticate('Local-SignUp', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    passReqToCallback: true,
    failureFlash: true
}))

app.post('/signin', isNotLoggedIn, passport.authenticate('Local-Signin', {
    successRedirect: '/Profile',
    failureRedirect: '/signin',
    passReqToCallback: true,
    failureFlash: true
}))

app.post('/singout', isLoggedIn, (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        } else {
            res.redirect('/signin');
        }
    });
})

module.exports = app;