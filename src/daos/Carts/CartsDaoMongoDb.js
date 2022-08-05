const ContainerMongoDb = require("../../containers/ContainerMongoDb");
const cartModel = require("../../models/carts");
const { logger } = require("../../utils/logger")

class CartsDaoMongoDb extends ContainerMongoDb {
  constructor() {
    super(cartModel);
  }

  async getUserCart(id) {
    try {
      let cart = await this.getOne('ownerId', id);
      return cart;
    } catch (e) {
      logger.warn("Error getting cart: " + e);
      throw new Error(e);
    }
  }

  async addProductToCart( id, product, options, callback ){
    let cart = await this.getUserCart(id);
    cart.products.push(product);
    let resp = await this.updateOne({'ownerId': id}, { 'products': cart.products, 'timestamp': Date.now() }, options, callback);
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
