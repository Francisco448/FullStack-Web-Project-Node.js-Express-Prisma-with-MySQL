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
    if(user == null){
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












passport.serializeUser((user, done) => {
    done(null, user.Id);
})

passport.deserializeUser(async(user, done) => {
    const users = await prisma.users.findFirst({
        where: {
            Id: user.id
        }
    })
    done(null, users);
})