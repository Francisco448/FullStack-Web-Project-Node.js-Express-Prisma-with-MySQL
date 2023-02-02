const app = require('express').Router();
const { isLoggedIn } = require('./Auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();





module.exports = app;