const express = require('express');
const tweetsRouter = require('./tweetsRouter');

const router = express.Router();
router.use('/tweets', tweetsRouter);

module.exports = (app) => app.use('/v1', router);