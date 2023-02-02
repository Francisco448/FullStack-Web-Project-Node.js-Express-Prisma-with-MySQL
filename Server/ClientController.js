const app = require('express').Router();
const { isLoggedIn } = require('./Auth');
const { PrismaClient } = require('@prisma/client');
const { format } = require('morgan');
const prisma = new PrismaClient();

app.get('/getClients', isLoggedIn, async (req, res) => {
    const clients = await prisma.client.findMany();
    await res.send(clients);
})

app.post('/addClient', isLoggedIn, async (req, res) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = [yyyy, mm, dd].join('-');
    await prisma.client.create({
        data: {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Alias: req.body.Alias,
            DateSince: new Date(formattedToday),
            Email: req.body.Email,
            Phone: parseInt(req.body.Phone),
            UidSerie: parseInt(req.body.UidSerie)
        }
    })
    res.send(true);
})

module.exports = app;