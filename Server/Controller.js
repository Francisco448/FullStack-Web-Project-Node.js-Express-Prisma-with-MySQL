const app = require('express').Router();
const passport = require('passport');

app.get('/signin', (req, res) => {
    res.render('Account/signin.ejs');
})

app.get('/signup', (req, res) => {
    res.render('Account/signup.ejs')
})


app.post('/signup', passport.authenticate('Local-SignUp', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    passReqToCallback: true
}))

app.get('/Profile', (req, res) => {
    res.render('Profile/Profile.ejs');
})

module.exports = app;