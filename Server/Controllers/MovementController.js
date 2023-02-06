const app = require('express').Router();
const { isLoggedIn } = require('../Security/Auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();





module.exports = app;