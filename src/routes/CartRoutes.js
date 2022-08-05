const express = require("express");
const { Router } = express;
const cartRouter = Router();
const ProductsDaoMongoDb = require("../daos/Products/ProductsDaoMongoDb");
const CartsDaoMongoDb = require("../daos/Carts/CartsDaoMongoDb");
const { sendMail, defaultMailOptions } = require("../utils/nodemailer");
const { sendMessage, defaultTWLOptions, defaultSMSOptions } = require("../utils/twilio");
const { logger } = require("../utils/logger");
let productsContainer = new ProductsDaoMongoDb();
let cartContainer = new CartsDaoMongoDb();

cartRouter.get("/", async (req, res) => {
  try {
    const id = req.user._id;
    let cart = await cartContainer.getUserCart(id);
    if (cart === null) {
      cart = await cartContainer.saveCart(id);
    }
    res.render("loggedin", {
      cartProducts: cart.products,
      cartDate: cart.timestamp,
      id: cart.ownerId,
      user: req.user,
      displayPage: "cart",
    });
  } catch (e) {
    throw new Error(e);
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    if (!cartContainer.getUserCart(req.user._id)) {
      let cart = await cartContainer.saveCart(req.user._id);
      res.render("cart", { cartProducts: cart.products });
    } else {
      res.redirect("/cart");
    }
  } catch (e) {
    throw new Error(e);
  }
});

cartRouter.put("/", async (req, res) => {
  try {
    let product = await productsContainer.getOne("_id", req.body.idProduct);
    let resp = await cartContainer.addProductToCart(req.user._id, product);
    res.status(200).json({ message: "cart updated", responded: resp });
  } catch (e) {
    throw new Error(e);
  }
});

cartRouter.post("/checkout", async (req, res) => {
  try {
    let cart= await cartContainer.getUserCart(req.user._id);
    let productList = cart.products.map(
      (p) =>
        `<li style="color: green; list-style: none;"><b>${p.name}</b><i>codigo_producto: ${p.code} - precio: ${p.price}</i></li>`
    ).join('');
    let mailOptions = { ...defaultMailOptions };
    mailOptions.subject = `Nuevo pedido de: ${req.user.name} ${req.user.lastname} (${req.user.email})`;
    mailOptions.html = `<ul>${productList}</ul>`;
    mailOptions.to = req.user.email;

    await sendMail(mailOptions);

    let TWLOptions = { ...defaultTWLOptions };
    TWLOptions.body = `Nuevo pedido de: ${req.user.name} ${req.user.lastname} (${req.user.email})`;

    await sendMessage(TWLOptions);

    let SMSOptions = { ...defaultSMSOptions };
    SMSOptions.to = "+" + req.user.phone;
    SMSOptions.body = "Su pedido ha sido recibido y se encuentra en proceso";

    await sendMessage(SMSOptions);

    res.status(200).json({ success: true });

  } catch (e) {
    throw new Error(e);
  }
});

module.exports = cartRouter;
