const mongoose = require('mongoose');

const chatsCollection = "chats";

const ChatsSchema = new mongoose.Schema({
    mail: {type: String, required: true},
    message: {type: String, default: "", required: true},
    timestamp: {type: Date, default: Date.now}
});

const chats = mongoose.model(chatsCollection, ChatsSchema);
module.exports = chats;