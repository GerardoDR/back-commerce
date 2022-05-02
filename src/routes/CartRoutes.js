const express = require('express');
const { Router } = express;
const cartRouter = Router();

const { ProductsContainer } = require('../models/ProductsContainer');
const { CartContainer } = require('../models/CartContainer');

let productContainer = new ProductsContainer();
let cartContainer = new CartContainer();

cartRouter.get('/', (req, res) => {
    let carts = cartContainer.getAll();

    res.json({carts: carts});
});

cartRouter.post('/', (req, res) => {
    let cart = req.body;

    if (cart && cart.name && cart.description) {
        cart = cartContainer.save(cart.name, cart.description);
        res.json({result: 'cart saved', cart: cart});
    } else {
        res.json({result: 'cart cannot saved'});
    }
});

cartRouter.post('/:id/products', (req, res) => {
    let cartId = req.params.id;
    let product = productContainer.getById(req.body.id);

    if (cartId && product) {
        let cart = cartContainer.addProductToCart(cartId, product);
        
        res.json({result: 'product added to cart', cart: cart});
    } else {
        res.json({result: 'product cannot be added'});
    }
});

module.exports = cartRouter;