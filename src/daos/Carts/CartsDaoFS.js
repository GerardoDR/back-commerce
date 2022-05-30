const { ContainerFS } = require("../../containers/ContainerFS");

class CartsDaoFS extends ContainerFS {
  constructor() {
    super("./src/data/carts.json");
    let carts = this.getAll();
    this.id = carts.length > 0 ? carts.length + 1 : 1;
  }

  saveCart() {
    let carts = this.getAll();
    let cart = { id: this.id, timestamp: Date.now(), products: [] };
    carts.push(cart);
    this.saveInFile(carts);
    this.id++;

    return cart;
  }

  getAll() {
    let carts = this.getContentFile();

    return carts;
  }

  getById(id) {
    let carts = this.getAll();
    let cart = null;

    if (carts.length > 0) {
      cart = carts.find((elem) => elem.id == id);
    }
    return { cart, carts };
  }

  addProductToCart(cartId, product) {
    let carts = this.getAll();
    let cart = null;

    if (carts.length > 0) {
      cart = carts.find((elem) => elem.id == cartId);
      if (cart) {
        cart.products.push(product);
      }

      this.saveInFile(carts);
    }

    return cart;
  }

  deleteById(id) {
    const carts = this.getAll();
    const newCarts = carts.filter((cart) => cart.id != id);
    
    if (JSON.stringify(carts) !== JSON.stringify(newCarts)) {
      this.saveInFile(newCarts);
      return newCarts;
    } else {
      return null;
    }
  }

  deleteProductFromCart(cartId, productId) {
    let { cart, carts } = this.getById(cartId);

    if (cart) {
      let products = cart.products;
      if (products.length > 0) {
        let newProducts = products.filter((product) => product.id != productId);
        cart.products = newProducts;
      }
      this.saveInFile(carts);
      return carts;
    } else {
      return null;
    }
  }
}

module.exports = CartsDaoFS;
