const app = require('express').Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./Auth');


app.get('/signin', isNotLoggedIn, (req, res) => {
    if (!req.isAuthenticated()) {
        res.render('Account/signin.ejs');
    } else {
        res.redirect('/Profile');
    }
})

app.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('Account/signup.ejs')
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


app.get('/singout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
})

app.get('/Profile', isLoggedIn, (req, res) => {
    res.render('Profile/Profile.ejs');
})

module.exports = app;