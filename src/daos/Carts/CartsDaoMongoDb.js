const ContainerMongoDb = require("../../containers/ContainerMongoDb");
const cartModel = require("../../models/carts");
const { logger } = require("../../utils/logger")

class CartsDaoMongoDb extends ContainerMongoDb {
  constructor() {
    super(cartModel);
  }

  async getUserCart(id) {
    try {
      let cart = await this.model.findOne({ ownerId: id });
      return cart;
    } catch (e) {
      logger.warn("Error getting cart: " + e);
      throw new Error(e);
    }
  }

  async addProductToCart(id, product) {
    let cart = await this.getUserCart(id);
    cart.products.push(product);
    let resp = await this.model.updateOne({ 'ownerId': id }, { 'products': cart.products, 'timestamp': Date.now() });
    return resp;
  }

  async removeProductFromCart(id, prod_id) {
    let cart = await this.getUserCart(id);
    let gotOne = false;
    const updatedProducts = cart.products.filter(p => {
      let keeper = true;
      if (!gotOne) {
        if (p._id == prod_id) {
          gotOne = true;
          keeper = false;
        }
      }
      return keeper;
    });
    const resp = await this.model.updateOne({ 'ownerId': id }, { 'products': updatedProducts, 'timestamp': Date.now() });
    return resp;
  }

  async saveCart(id) {
    try {
      let cart = { ownerId: id, products: [], timestamp: Date.now() };
      await this.save(cart);
      return cart;
    } catch (error) {
      logger.error("Error saving cart: " + error);
    }
  }
}

module.exports = CartsDaoMongoDb;
