const mongoose = require('mongoose');

const chatsCollection = "chats";

const ChatsSchema = new mongoose.Schema({
    mail: {type: String, required: true},
    message: {type: String, default: "", required: true},
    timestamp: {type: Date, default: Date.now, required: true}
});

const chats = mongoose.model(productsCollection, ProductsSchema);
module.exports = chats;