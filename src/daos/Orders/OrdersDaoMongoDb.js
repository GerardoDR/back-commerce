const ContainerMongoDb = require("../../containers/ContainerMongoDb");
const ordersModel = require("../../models/orders");

class OrdersDaoMongoDb extends ContainerMongoDb {
    constructor(){
        super(ordersModel);
    }
}

module.exports = OrdersDaoMongoDb;