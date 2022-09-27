const express = require("express");
const chatRouter = express.Router();
const { chatPage } = require('../controllers/chat');

chatRouter.get('/', chatPage);

module.exports = chatRouter;