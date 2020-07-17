const Product = require('../models/Product');

module.exports = {
    async createProductRequest(product){
       
        const {id, name} = product;
        
        const date = new Date();

        date.setUTCMinutes(date.getMinutes() - 10);
        
        let productDb = await Product.findOne({ id, name }).sort("+createAt").where({ createAt: { $gte: date } });

        console.log(productDb);

        if (!productDb) {

            productDb = await Product.create({
                id: id,
                name: name
            });

            return true;
        }
    }
}