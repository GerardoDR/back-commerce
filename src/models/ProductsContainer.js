const { Container } = require('./Container');

class ProductsContainer extends Container {
    constructor() {
        super('./data/products.json');
        let products = this.getAll();
        this.id = (products.length > 0) ? products.length + 1 : 1;
    }

    save(name, brand, price) {
        let products = this.getAll();
        let product = {id:this.id, name, brand, price}
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

        if(products.length > 0) {
            let element = products.find(elem => elem.id == id);
            if(element) {
                product = element;
            }
        }

        return product;
    }
}

module.exports = { ProductsContainer }