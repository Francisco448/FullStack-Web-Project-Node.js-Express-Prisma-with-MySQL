const app = require('express').Router();
const { isLoggedIn } = require('../Security/Auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.post('/addSale', isLoggedIn, async (req, res) => {
    const newSale = JSON.parse(req.body.newSale);
    // await prisma.products.createMany({
    //     data:{

    //     }
    // })
    console.log(newSale);
})


module.exports = app;