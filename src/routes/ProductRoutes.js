const express = require("express");
const ProductsDaoMongoDb = require("../daos/Products/ProductsDaoMongoDb");
const productRouter = express.Router();

let productsContainer = new ProductsDaoMongoDb();

const userAdmin = true;

productRouter.get("/", async (req, res) => {
  let products = await productsContainer.getAll();
  res.render("loggedin", { products: products, admin: userAdmin , user: req.user, displayPage: 'products' });
});

productRouter.post("/", async (req, res) => {
  let product = req.body;
  await productsContainer.save(product);
  res.json({ result: "product saved", product });
});

module.exports = productRouter;
