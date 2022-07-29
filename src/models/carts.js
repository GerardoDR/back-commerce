const mongoose = require('mongoose');

const cartsCollection = "carts";

const CartsSchema = new mongoose.Schema({
    ownerId: {type: 'string', required: true},
    timestamp: {type: Date, default: Date.now, required: true},
    products: {type: Array, required: true},
});

const carts = mongoose.model(cartsCollection, CartsSchema);
module.exports = carts;