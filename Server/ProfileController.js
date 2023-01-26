const app = require('express').Router();
const { isLoggedIn } = require('./Auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


app.get('/Profile', isLoggedIn, (req, res) => {
    res.render('Profile/Profile.ejs', { user: req.user });
})

app.get('/Products', isLoggedIn, async (req, res) => {
    const products = await prisma.products.findMany();
    await res.send(products);
})

app.post('/addProduct', isLoggedIn, async (req, res) => {
    await prisma.products.create({
        data: {
            Name: req.body.Name,
            BuyCost: parseFloat(req.body.BuyCost),
            SalePrice: parseFloat(req.body.SalePrice),
            Units: parseInt(req.body.Units)
        }
    })
    res.send(true);
})

app.post('/editProduct/:Id', async(req, res)=>{
    await prisma.products.update({
        data:{
            Name: req.body.Name,
            BuyCost: parseFloat(req.body.BuyCost),
            SalePrice: parseFloat(req.body.SalePrice),
            Units: parseInt(req.body.Units)
        },
        where: {
            Id: parseInt(req.params.Id) 
        }
    })
    res.send(true);
})

module.exports = app;