const { ContainerFS } = require("../../containers/ContainerFS");

class ProductsDaoFS extends ContainerFS {
  constructor() {
    super("./src/data/products.json");
    let products = this.getAll();
    this.id = products.length > 0 ? products.length + 1 : 1;
  }

  saveProd(obj) {
    let products = this.getAll();
    let product = {
      ...obj,
      id: this.id,
      code: obj.code || `${obj.name}${this.id}`,
      timestamp: Date.now(),
      stock: obj.stock || 10,
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
        products[idx].code = `${name}${id}`;
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

module.exports =  ProductsDaoFS;
