const ContainerMongoDb = require("../../containers/ContainerMongoDb");
const productModel = require("../../models/products");

class ProductsDaoMongoDb extends ContainerMongoDb {
    constructor(){
        super(productModel);
    }
}


module.exports = ProductsDaoMongoDb;