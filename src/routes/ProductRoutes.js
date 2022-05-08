const express = require("express");
const { Router } = express;
const productRouter = Router();

const { ProductsContainer } = require("../models/ProductsContainer");
let productsContainer = new ProductsContainer();

const userAdmin = false;

productRouter.get("/", (req, res) => {
  let products = productsContainer.getAll();

  res.json({ products: products });
});

productRouter.put("/:id", (req, res) => {
  const product = req.body;
  const id = req.params.id;

  if (userAdmin) {
    if (
      product.name ||
      product.description ||
      product.price ||
      product.thumbnail ||
      product.stock
    ) {
      let result = productsContainer.updateById(
        id,
        product.name,
        product.description,
        product.thumbnail,
        product.price,
        product.stock
      );

      if (result) {
        res.json({ result: result });
      } else {
        res.json({
          id: id,
          result: `Product not found`,
          returned: result,
        });
      }
    } else {
      res.json({ result: `bad request: ${JSON.stringify(product)}` });
    }
  } else {
    res.json({
      error: -1,
      description: `route /api/products/${id} PUT method not authorized`,
    });
  }
});

productRouter.post("/", (req, res) => {
  let product = req.body;
  if (userAdmin) {
    if (product && product.name && product.description && product.price) {
      product = productsContainer.save(
        product.name,
        product.description,
        (product.thumbnail = product.thumbnail || ""),
        product.price,
        (product.stock = product.stock || 0)
      );
      res.json({ result: "product saved", product: product });
    } else {
      res.json({ result: "product cannot be saved" });
    }
  } else {
    res.json({
      error: -1,
      description: `route /api/products/ POST method not authorized`,
    });
  }
});

productRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (userAdmin) {
    const result = productsContainer.deleteById(id);
    res.json({
      result: `product ${id} deleted`,
      newArray: result,
    });
  } else {
    res.json({
      error: -1,
      description: `route /api/products/${id} DELETE method not authorized`,
    });
  }
});

module.exports = productRouter;
