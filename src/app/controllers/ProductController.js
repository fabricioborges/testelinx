const Product = require('../models/Product');

module.exports = {
    async store(req, res){
        const {id, name} = req.body;

        let product = await Product.findOne({id });

        if(!product){
            console.log('criando novo produto')
            product = await Product.create({
                id: id,
                name: name
            });
        }
        
        return res.json(product);
    }
}