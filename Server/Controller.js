const app = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
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


app.post('/singout', isLoggedIn, (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        } else {
            res.redirect('/signin');
        }
    });
})

app.get('/Profile', isLoggedIn, (req, res) => {
    res.render('Profile/Profile.ejs');
})


app.post('/Products', isLoggedIn, async (req, res) => {
    const products = await prisma.products.findMany();
    const datatable = {
        draw: products.length,
        start: 0,
        length: products.length,
        order: 'ASC',
        orderDir: 'ASC',
        data: products
    }
    await res.send(datatable);
})



app.post('/addProduct', async (req, res) => {
    await prisma.products.create({
        data: {
            Name: req.body.Name,
            BuyCost: req.body.BuyCost,
            SalePrice: req.body.SalePrice
        }
    })
})

module.exports = app;