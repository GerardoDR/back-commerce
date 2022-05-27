import mongoose from "mongoose";
import express from "express";
import productRouter from "./src/routes/ProductRoutes";
import cartRouter from "./src/routes/CartRoutes";
import * as model from "./src/db/mongoDB";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.get("*", (req, res) => {
  res.status(404).send("Not found");
});

app.listen(8080, () => {
  console.log("Server on port https://localhost:8080");
});

const productSaveModel = new model.products({
  name: "Product 1",
  description: "Description 1",
  timestamp: Date.now(),
  code: "Product1",
  thumbnail: "https://via.placeholder.com/150",
  price: 100,
  stock: 10,
});

let productToDB = await productSaveModel
  .save()
  .then(() => {
    console.log("Product saved");
  })
  .catch((err) => {
    console.log(err);
  });
