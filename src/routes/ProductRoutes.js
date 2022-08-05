const express = require("express");
const ProductsDaoMongoDb = require("../daos/Products/ProductsDaoMongoDb");
const { logger } = require("../utils/logger");
const productRouter = express.Router();

let productsContainer = new ProductsDaoMongoDb();

const userAdmin = true;

productRouter.get("/", async (req, res) => {
  try {
    let products = await productsContainer.getAll();
    logger.info('get all products');
    res.render("loggedin", { products: products, admin: userAdmin , user: req.user, displayPage: 'products' });
  } catch (error) {
    logger.error(error);
  }
});

productRouter.post("/", async (req, res) => {
  try {
    let product = req.body;
    await productsContainer.save(product);
    logger.info(product);
    logger.info('product saved');
    res.json({ result: "product saved", product });
  } catch (error) {
    logger.error(error);
  }
  
});

module.exports = productRouter;
