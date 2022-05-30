const ContainerFirebase = require("../../containers/ContainerFirebase");

class CartsDaoFirebase extends ContainerFirebase {
  constructor() {
    super('carts');
    this.id = 0;
    this.checkId();
  }

  async checkId() {
    let carts = await this.getAll();

    if (carts.length > 0) {
      this.id = parseInt(carts[carts.length - 1].id) + 1;
    }
  }

  async saveCart() {
    try {
      let cart = { timestamp: Date.now(), products: [] };
      await this.save(cart, this.id);
      this.id++;
      return cart;
    } catch (error) {
      console.log("Error saving cart: " + error);
    }
  }

  async getById(id) {
    try {
      let carts = await this.getAll();
      let cart = undefined;
      if (carts.length > 0) {
        cart = await this.getOne(id);
      }
      return { cart, carts };
    } catch (error) {
      console.log("Error getting cart: " + error);
    }
  }

  async addProductToCart(cartId, product) {
    try {
      let { cart } = await this.getById(cartId);
      if (cart) {
        cart.products.push(product);
        await this.update(cartId, cart);
      }
      return cart;
    } catch (error) {
      console.log("Error adding product to cart: " + error);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      let { cart } = await this.getById(cartId);

      if (cart) {
        if (cart.products.length > 0) {
          let newProducts = cart.products.filter(
            (product) => product.id != productId
          );
          cart.products = newProducts;
        }
        await this.update(cartId, cart);
        let cartsResult = await this.getAll();
        return cartsResult;
      } else {
        console.log("Cart not found");
      }
    } catch {
      console.log("Error deleting product from cart");
    }
  }
}

module.exports = CartsDaoFirebase;
