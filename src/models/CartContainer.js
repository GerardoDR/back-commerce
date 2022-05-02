const { Container } = require('./Container');

class CartContainer extends Container {
    constructor() {
        super('./data/carts.json');
        let carts = this.getAll();
        this.id = (carts.length > 0) ? carts.length + 1 : 1;
    }

    save(name) {
        let carts = this.getAll();
        let cart = {id:this.id, name: name, products: []}
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

        if(carts.length > 0) {
            let element = carts.find(elem => elem.id == id);
            if(element) {
                cart = element;
            }
        }

        return cart;
    }

    addProductToCart(cartId, product) {
        let carts = this.getAll();
        let cart = null;

        if(carts.length > 0) {
            let element = carts.find(elem => elem.id == cartId);
            if(element) {
                element.products.push(product);
                cart = element;
            }

            this.saveInFile(carts);
        }

        return cart;
    }
}

module.exports = { CartContainer }