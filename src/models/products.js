const mongoose = require('mongoose');

const productsCollection = "products";

const ProductsSchema = new mongoose.Schema({
    name: {type: String, default: 'producto1', required: true},
    description: {type: String, default: "empty description", required: true},
    code:   {type: String, default: 'test-code', required: true},
    timestamp: {type: Date, default: Date.now, required: true},
    thumbnail: {type: String, default: "https://via.placeholder.com/150", required: true},
    price: {type: Number, default: 9999999, required: true},
    stock: {type: Number, default: 0, required: true}
});

const products = mongoose.model(productsCollection, ProductsSchema);
module.exports = products;