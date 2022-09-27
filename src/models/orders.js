const mongoose = require('mongoose');

const ordersCollection = "orders";

const ordersSchema = new mongoose.Schema({
    ownerId: {type: String, required: true},
    timestamp: {type: Date, default: Date.now, required: true},
    products: {type: Array, required: true},
});

const orders = mongoose.model(ordersCollection, ordersSchema);
module.exports = orders;