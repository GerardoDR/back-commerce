const ContainerFirebase = require("../../containers/ContainerFirebase");

class ProductsDaoFirebase extends ContainerFirebase {
  constructor() {
    super("products");
    this.id = 0;
    this.checkId();
    console.log(`id: ${this.id}`);
  }

  async checkId() {
    let products = await this.getAll();
    if (products.length > 0) {
      this.id = parseInt(products[products.length - 1].id) + 1;
    }
  }

  async saveProd(product) {
    await this.save(product, this.id);
    this.id++;
  }

  async getById(id) {
    return await this.getOne(id);
  }

  async updateById(id, name, description, thumbnail, price, stock) {
    try {
      let updatee = {};
      if (name) {
        updatee.name = name;
        updatee.code = `${name}${id}`;
      }
      if (description) {
        updatee.description = description;
      }
      if (thumbnail) {
        updatee.thumbnail = thumbnail;
      }
      if (stock) {
        updatee.stock = stock;
      }
      if (price) {
        updatee.price = price;
      }
      updatee.timestamp = Date.now();
      console.log("Updating properties: ", updatee);
      let res = await this.update(id, updatee);
      return res;
    } catch (error) {
      console.log("Update error: ", error);
      return null;
    }
  }
}

module.exports = ProductsDaoFirebase;
