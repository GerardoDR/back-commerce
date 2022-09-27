const { logger } = require("../utils/logger");
const srvcMsgs = require('../services/chat')

const getMessages = async () => {
    try {
        let msgs = await srvcMsgs.getAll();
        return msgs;
    } catch (error) {
        logger.error(error);
    };
}

const insertNewMessage = async (message) => {
    try {
        await srvcMsgs.save(message)
    } catch (error) {
        logger.error(error);
    }
}

const chatPage = async (req, res) => {
    const msgs = await getMessages();
    await res.render("loggedin", { msgs, user: req.user, displayPage: 'chat' });
}

module.exports = { getMessages, insertNewMessage, chatPage }
