const { Container } = require('./Container');

class ProductsContainer extends Container {
    constructor() {
        super('./src/data/products.json');
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

    deleteById (id) {
        let products = this.getAll();
        let newProducts = products.filter(elem => elem.id != id);
        this.saveInFile(newProducts);
        return id;
    }

    updateProduct(id, body) {

        if (body.name || body.brand || body.price) {
            let products = this.getAll();
            let product = null;
            product = this.getById(id);
            if(product){
                if(body.name){
                    product.name = body.name;
                }
                if(body.brand){
                    product.brand = body.brand;
                }
                if(body.price){
                    product.price = body.price;
                }
                console.log(product);
                this.saveInFile(products);
                return `Product ${product.id} updated`;

            } else {
                
                return `Product ${id} not found`;
            }
        } else{
            return `bad request: ${JSON.stringify(body)}`;
        }
    }
}

module.exports = { ProductsContainer }