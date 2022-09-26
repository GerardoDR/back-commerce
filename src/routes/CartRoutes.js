const express = require("express");
const cartRouter = express.Router();

const { getCart, postCart, updateCart, checkoutCart, deleteFromCart } = require("../controllers/carts")

cartRouter.get('/', getCart);
cartRouter.post('/', postCart);
cartRouter.put('/', updateCart);
cartRouter.post("/checkout", checkoutCart);
cartRouter.delete('/', deleteFromCart);

module.exports = cartRouter;