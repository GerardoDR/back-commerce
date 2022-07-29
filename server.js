const express = require("express");
const productRouter = require ('./src/routes/ProductRoutes');
const authRouter = require('./src/routes/AuthRoutes');
// const cartRouter = require ('./src/routes/CartRoutes');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", authRouter);
app.use("/products", productRouter);
// app.use("/carts", cartRouter);

app.set('view engine', 'ejs');

app.get("*", (req, res) => {
  res.status(404).send("Not found");
});

app.listen(8080, () => {
  console.log("Server on port https://localhost:8080");
});