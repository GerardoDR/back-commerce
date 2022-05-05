const express = require("express");
const { Router } = express;
const productRouter = Router();

const { ProductsContainer } = require("../models/ProductsContainer");
let productsContainer = new ProductsContainer();

productRouter.get("/", (req, res) => {
  let products = productsContainer.getAll();

  res.json({ products: products });
});

productRouter.put("/:id", (req, res) => {
  const product = req.body;
  const id = req.params.id;
  if (product.name || product.description || product.price) {
    let result = productsContainer.updateById(
      id,
      product.name,
      product.description,
      product.price
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
});

productRouter.post("/", (req, res) => {
  let product = req.body;

  if (product && product.name && product.description && product.price) {
    product = productsContainer.save(
      product.name,
      product.description,
      product.thumbnail = product.thumbnail || "",
      product.price,
      product.stock = product.stock || 0
    );
    res.json({ result: "product saved", product: product });
  } else {
    res.json({ result: "product cannot be saved" });
  }
});

productRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  const result = productsContainer.deleteById(id);
  res.json({
    result: `product ${id} deleted`,
    newArray: result,
  });
});


module.exports = productRouter;
