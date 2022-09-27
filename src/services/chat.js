const ChatsDaoMongoDb = require("../daos/Chats/ChatsDaoMongoDb");
const chatsContainer = new ChatsDaoMongoDb();

const getAll = async () => {
    return await chatsContainer.getAll();
};

const save = async (message) => {
    return await chatsContainer.save(message);
};

const srvcMsgs = { save, getAll };

module.exports = srvcMsgs;