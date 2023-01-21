const app = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = PrismaClient();



module.exports = app;