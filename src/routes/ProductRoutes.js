const express = require("express");
const productRouter = express.Router();
const { getAll, getOne, saveProduct, updateProduct, removeProduct } = require("../controllers/products");

productRouter.get('/', getAll);
productRouter.get('/:prod_id', getOne);
productRouter.post('/', saveProduct);
productRouter.patch('/', updateProduct);
productRouter.delete('/', removeProduct);

module.exports = productRouter;
