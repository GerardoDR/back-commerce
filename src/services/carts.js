const CartsDaoMongoDb = require("../daos/Carts/CartsDaoMongoDb");
const cartContainer = new CartsDaoMongoDb();
const { logger } = require("../utils/logger");

const getOrCreateCart = async (id) => {
    try {
        let cart = await cartContainer.getUserCart(id);
        if (cart === null) {
            cart = await cartContainer.saveCart(id);
        }
        return cart;
    } catch (error) {
        logger.error(error);
    }
};

const productToCart = async (cartOwnerId, product) => {
    try {
        let resp = await cartContainer.addProductToCart(cartOwnerId, product);
        return resp
    } catch (error) {
        logger.error(error);
    }
};

const deleteFromCart = async (cartOwnerId, productId) => {
    try {
        let resp = await cartContainer.removeProductFromCart(cartOwnerId, productId);
        return resp
    } catch (error) {
        logger.error(error);
    }
};


module.exports = { getOrCreateCart, productToCart, deleteFromCart }