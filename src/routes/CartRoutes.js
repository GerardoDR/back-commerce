const express = require("express");
const { Router } = express;
const cartRouter = Router();

const { ProductsContainer } = require("../models/ProductsContainer");
const { CartContainer } = require("../models/CartContainer");

let productsContainer = new ProductsContainer();
let cartContainer = new CartContainer();

cartRouter.get("/", (req, res) => {
  let carts = cartContainer.getAll();

  res.json({ carts: carts });
});

cartRouter.get("/:id/products", (req, res) => {
  const id = req.params.id;
  let cart = getById(id);
    cart = cart.cart;
  if (cart) {
    res.json({ cart: cart });
  } else {
    res.send(`cart with ${id} not found`);
  }
});

cartRouter.post("/", (req, res) => {
  let cart = req.body;

  if (cart && cart.name) {
    cart = cartContainer.save(cart.name, cart.description);
    res.json({ result: "cart saved", cartID: cart.id });
  } else {
    res.json({ result: "cart cannot be saved" });
  }
});

cartRouter.post("/:id/products", (req, res) => {
  let cartId = req.params.id;
  let product = productsContainer.getById(req.body.id);

  if (cartId && product) {
    let cart = cartContainer.addProductToCart(cartId, product);

    res.json({ result: "product added to cart", cart: cart });
  } else {
    res.json({ result: "product cannot be added" });
  }
});

cartRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  const result = cartContainer.deleteById(id);
  res.json({
    result: `Cart with id: ${id} deleted`,
    carts: result,
  });
});

cartRouter.delete("/:id/productos/:id_prod", (req, res) => {
    const id = req.params.id;
    const idProd = req.params.id_prod;
    const result = cartContainer.deleteProductFromCart(id, idProd)
    if (result) {
        res.json({ result: result });
    } else {
        res.send(`couldn't delete product with id: ${idProd} from cart with id: ${id}`);
    }
});

module.exports = cartRouter;
