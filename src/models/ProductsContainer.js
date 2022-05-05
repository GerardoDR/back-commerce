const { Container } = require("./Container");

class ProductsContainer extends Container {
  constructor() {
    super("./src/data/products.json");
    let products = this.getAll();
    this.id = products.length > 0 ? products.length + 1 : 1;
  }

  save(name, description, thumbnail, price, stock) {
    let products = this.getAll();
    let product = {
      id: this.id,
      name,
      description,
      code: this.name + this.id,
      timestamp: Date.now(),
      thumbnail,
      price,
      stock,
    };
    products.push(product);
    this.saveInFile(products);
    this.id++;
  }

  getAll() {
    let products = this.getContentFile();

    return products;
  }

  getById(id) {
    let products = this.getAll();
    let product = null;

    if (products.length > 0) {
      let element = products.find((elem) => elem.id == id);
      if (element) {
        product = element;
      }
    }

    return product;
  }

  updateById(id, name, description, thumbnail, price, stock) {
    const products = this.getAll();
    const updatee = this.getById(id);

    if (updatee) {
      const idx = products.findIndex((elem) => elem.id === updatee.id);
      
      if (name) {
        products[idx].name = name;
      }
      if (description) {
        products[idx].description = description;
      }
      if (thumbnail) {
        products[idx].thumbnail = thumbnail;
      }
      if (stock) {
        products[idx].stock = stock;
      }
      if (price) {
        products[idx].price = price;
      }
      products[idx].timestamp = Date.now();
      this.saveInFile(products);
      return products[idx];
    } else {
      return null;
    }
  }

  deleteById(id) {
    const products = this.getAll();
    let newProducts = products.filter((elem) => elem.id != id);
    this.saveInFile(newProducts);
    return newProducts;
  }
}

module.exports = { ProductsContainer };
