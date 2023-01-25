const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client');
const { help } = require('./helpers');
const prisma = new PrismaClient();


passport.use('Local-SignUp', new LocalStrategy({
    usernameField: 'FirstName',
    passwordField: 'regPassword',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = await prisma.users.findFirst({
        where: {
            UidSerie: req.body.UidSerie,
            Email: req.body.Email
        }
    });
    if (user == null) {
        const hash = await help.Encrypt(password);
        await prisma.users.create({
            data: {
                FirstName: username,
                LastName: req.body.LastName,
                Email: req.body.Email,
                UidSerie: req.body.UidSerie,
                userName: username + '-' + req.body.LastName,
                Password: hash
            }
        })
        const newUser = await prisma.users.findFirst({
            where: {
                Email: req.body.Email,
                UidSerie: req.body.UidSerie
            }
        })
        return done(null, newUser);
    } else {
        done(null, false, req.flash('message', 'the user is already created.'));
    }

}))

passport.use('Local-Signin', new LocalStrategy({
    usernameField: 'Email',
    passwordField: 'Password',
    passReqToCallback: true
}, async (req, Email, Password, done) => {
    const user = await prisma.users.findFirst({
        where: {
            Email: Email
        }
    })
    if (user != null) {
        const valid = await help.Compare(Password, user.Password);
        if (valid) {
            return done(null, user, req.flash('success', 'Welcome'));
        } else {
            return done(null, false, req.flash('message', 'Invalid password'));
        }
    } else {
        return done(null, false, req.flash('message', 'User not exist, please Sign Up'));
    }
}))


passport.serializeUser((user, done) => {
    done(null, user.Id);
})

passport.deserializeUser(async (user, done) => {
    const users = await prisma.users.findFirst({
        where: {
            Id: user.id
        }
    })
    done(null, users);
})