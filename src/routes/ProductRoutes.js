const express = require('express');
const { Router } = express;
const productRouter = Router();

const { ProductsContainer } = require('../models/ProductsContainer');
let productsContainer = new ProductsContainer();

productRouter.get('/', (req, res) => {
    let products = productsContainer.getAll();

    res.json({products: products});
});

productRouter.post('/', (req, res) => {
    let product = req.body;

    if (product && product.name && product.brand && product.price) {
        product = productsContainer.save(product.name, product.brand, product.price);
        res.json({result: 'product saved', product: product});
    } else {
        res.json({result: 'product cannot saved'});
    }
});

module.exports = productRouter;