const ContainerMongoDb = require("../../containers/ContainerMongoDb");
const cartModel = require("../../models/carts");

class CartsDaoMongoDb extends ContainerMongoDb {
  constructor() {
    super(cartModel);
  }

  async getUserCart(id) {
    try {
      console.log('getUserCart '+id);
      let cart = await this.getOne('ownerId', id);
      return cart;
    } catch (e) {
      console.log("Error getting cart: " + e);
      throw new Error(e);
    }
  }

  async saveCart(id) {
    try {
      console.log('saving cart');
      let cart = { ownerId: id, products: [], timestamp: Date.now() };
      await this.save(cart);
      return cart;
    } catch (error) {
      console.log("Error saving cart: " + error);
    }
  }
}

module.exports = CartsDaoMongoDb;
