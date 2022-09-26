const srvcCarts = require("../services/carts");
const srvcProducts = require("../services/products");
const { sendMail, defaultMailOptions } = require("../utils/nodemailer");
const { sendMessage, defaultTWLOptions, defaultSMSOptions } = require("../utils/twilio");
const { logger } = require("../utils/logger");

const getCart = async (req, res) => {
    try {
        const id = req.user._id;
        const cart = await srvcCarts.getOrCreateCart(id)
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
}

const postCart = async (req, res) => {
    try {
        const id = req.user._id;
        const cart = await srvcCarts.getOrCreateCart(id)
        res.render("cart", { cartProducts: cart.products });
    } catch (e) {
        throw new Error(e);
    }
};

const updateCart = async (req, res) => {
    try {
        const id = req.user._id;
        await srvcCarts.getOrCreateCart(id)
        const product = await srvcProducts.getOne(req.body.idProduct);
        const resp = await srvcCarts.productToCart(req.user._id, product);
        res.status(200).json({ message: "cart updated", responded: resp });
    } catch (e) {
        logger.error(e)
        throw new Error(e);
    }
};

const deleteFromCart = async (req, res) => {
    try {
        const resp = await srvcCarts.deleteFromCart(req.user._id, req.body.idProduct);
        res.status(200).json({ message: "cart updated", responded: resp });
    } catch (e) {
        logger.error(e)
        throw new Error(e);
    }
}

const checkoutCart = async (req, res) => {
    try {
        let cart = await srvcCarts.getOrCreateCart(id)
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
};

module.exports = { getCart, postCart, updateCart, deleteFromCart, checkoutCart }