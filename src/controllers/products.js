const srvcProducts = require("../services/products");
const { logger } = require("../utils/logger");

const getAll = async (req, res) => {
    try {
        let products = await srvcProducts.getAll();
        logger.info('get all products');
        res.render("loggedin", { products: products, user: req.user, displayPage: 'products' });
    } catch (error) {
        logger.error(error);
    }
};

const getOne = async (req, res) => {
    try {
        let id = req.params.prod_id;
        let product = await srvcProducts.getOne(id);
        res.send(product);
    } catch (error) {
        logger.error(error);
    }
};

const saveProduct = async (req, res) => {
    try {
        req.body.code = `${req.body.name}${Math.floor(Math.random() * 99999999)}`;
        let product = req.body;
        await srvcProducts.save(product);
        logger.info(product);
        logger.info('product saved');
        res.json({ result: "product saved", product });
    } catch (error) {
        logger.error(error);
    }
};

const updateProduct = async (req, res) => {
    try {
        let id = req.params.prod_id;
        let modifications = req.body
        let resp = await srvcProducts.updateById(id, modifications);
        res.json({ result: "product updated", resp });
    } catch (error) {
        logger.error(error);
    }
};

const removeProduct = async (req, res, done) => {
    if (!req.params.prod_id) { res.status(400).json({ result: 'not a valid query', error: true }); }
    const id = req.params.prod_id;
    let result = await srvcProducts.deleteById(id);
    result ?
        res.status(200).json({ message: 'product deleted' })
        : res.status(400).json({ error: 'error deleting product' })
};

module.exports = { getAll, saveProduct, getOne, updateProduct, removeProduct };