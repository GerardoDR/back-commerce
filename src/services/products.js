const ProductsDaoMongoDb = require("../daos/Products/ProductsDaoMongoDb");

const productsContainer = new ProductsDaoMongoDb();

const getAll = async () => {
    return await productsContainer.getAll();
};

const getOne = async (id) => {
    return await productsContainer.getOne(id);
}

const save = async (p) => {
    return await productsContainer.save(p);
};

const updateById = async (id, values) => {
    return await productsContainer.modify(id, values);
}

const deleteById = async (id) => {
    return await productsContainer.deleteById(id);

};

const srvcProducts = { save, getAll, getOne, updateById, deleteById };

module.exports = srvcProducts;