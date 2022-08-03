const express = require("express");
const ProductsDaoMongoDb = require("../daos/Products/ProductsDaoMongoDb");
const productRouter = express.Router();

let productsContainer = new ProductsDaoMongoDb();

const userAdmin = false;

productRouter.get("/", async (req, res) => {
  let products = await productsContainer.getAll();
  res.render("loggedin", { products: products, admin: userAdmin , user: req.user, displayPage: 'products' });
});

productRouter.post("/", async (req, res) => {
  let product = req.body;
  console.log(product);

  if (!userAdmin) {
    return res.json({
      error: -1,
      description: `route /api/products/ POST method not authorized`,
    });
  }
  if (!product || !product.name || !product.description || !product.price) {
    return res.json({ result: "product cannot be saved" });
  }

  let mappedProduct = {
    ...product,
    code: `${product.name}${productsContainer.id}`,
    timestamp: Date.now(),
    thumbnail: product.thumbnail || "https://via.placeholder.com/150",
    stock: product.stock || 0,
  };
  await productsContainer.saveProd(mappedProduct);
  res.json({ result: "product saved", product: mappedProduct });
});

/*
productRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (userAdmin) {
    const result = await productsContainer.deleteById(id);
    res.json({
      result: `product ${id} deleted`,
      response: result,
    });
  } else {
    res.json({
      error: -1,
      description: `route /api/products/${id} DELETE method not authorized`,
    });
  }
});
*/
module.exports = productRouter;
