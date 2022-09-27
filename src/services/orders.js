const OrdersDaoMongoDb = require("../daos/Orders/OrdersDaoMongoDb");

const ordersContainer = new OrdersDaoMongoDb();

const getAll = async () => {
    return await ordersContainer.getAll();
};

const placeOrder = async (order) => {
    return await ordersContainer.save(order);
};

const srvcOrders = { placeOrder, getAll };

module.exports = srvcOrders;