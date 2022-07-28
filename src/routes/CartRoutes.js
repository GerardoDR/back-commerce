const express = require("express");
const { Router } = express;
const cartRouter = Router();

const ProductsDaoMongoDb = require("../daos/Products/ProductsDaoMongoDb");

const CartsDaoMongoDb = require("../daos/Carts/CartsDaoMongoDb");

let productsContainer = new ProductsDaoMongoDb();

let cartContainer = new CartsDaoMongoDb();

cartRouter.get("/", async (req, res) => {
  let carts = await cartContainer.getAll();
  res.json({ carts: carts });
});

cartRouter.get("/:id/products", async (req, res) => {
  try {
    const id = req.params.id;
    let cart = await cartContainer.getById(id);
    cart = cart.cart;
    if (cart) {
      res.json({ cart: cart });
    } else {
      res.send(`cart with ${id} not found`);
    }  
  } catch (error) {
    console.log(error)
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    let cart = await cartContainer.saveCart();
    res.json({ result: "cart saved", cartID: cart.id });
  } catch {
    res.json({ result: "cart cannot be saved" });
  }
});

cartRouter.post("/:id/products", async (req, res) => {
  let cartId = req.params.id;
  try {
    let product = await productsContainer.getById(req.body.id);
    if (cartId && product) {
      let cart = await cartContainer.addProductToCart(cartId, product);
      if(cart){
        res.json({ addedProduct: product, cart: cart });
      } else {
        res.json({ result: `Cart with 'id:${cartId}' is not found` });
      }
    } else {
      res.json({ result: `Product with 'id:${req.body.id}' is not found` });
    }
  } catch (err) {
    res.json({ result: `Failed: ${err}` });
  }
});

cartRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  const result = cartContainer.deleteById(id);
  if (result) {
    res.json({
      result: `Cart with id: ${id} deleted`,
      response: result,
    });
  } else {
    res.json({ result: `Cart with id: ${id} not found` });
  }
});

cartRouter.delete("/:id/products/:id_prod", async (req, res) => {
  const id = req.params.id;
  const idProd = req.params.id_prod;
  const result = await cartContainer.deleteProductFromCart(id, idProd);
  if (result) {
    res.json({ result: result });
  } else {
    res.send(
      `couldn't delete product with id: ${idProd} from cart with id: ${id}`
    );
  }
});

module.exports = cartRouter;
