const app = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



app.get('/', (req, res) => {
    res.render('Account/Account.ejs');
})



module.exports = app;