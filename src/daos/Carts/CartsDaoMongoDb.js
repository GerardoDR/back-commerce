const ContainerMongoDb = require("../../containers/ContainerMongoDb");
const cartModel = require("../../models/carts");

class CartsDaoMongoDb extends ContainerMongoDb {
  constructor() {
    super(cartModel);
  }
}

module.exports = CartsDaoMongoDb;
