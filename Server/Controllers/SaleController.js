const app = require('express').Router();
const { isLoggedIn } = require('../Security/Auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


app.get('/getCapital', isLoggedIn, async (req, res) => {
    const user = await prisma.users.findFirst({
        where:{
            Id: req.user.Id
        }
    })
    res.json({Capital: req.user.Capital});
})

app.post('/addSale', isLoggedIn, async (req, res) => {
    const newSale = JSON.parse(req.body.newSale);
    // await prisma.products.createMany({
    //     data:{

    //     }
    // })
    console.log(newSale);
})


app.post('/updateUnits/:id', isLoggedIn, async (req, res) => {
    await prisma.products.updateMany({
        data: {
            Units: parseInt(req.body.Units)
        }, where: {
            Id: parseInt(req.params.id)
        }
    })
    res.send(true);
})

module.exports = app;