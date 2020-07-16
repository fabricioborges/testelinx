const Product = require('../models/Product');

module.exports = {
    async store(req, res){
        const {id, name} = req.body;

        let product = await Product.findOne({createAt: {$gte: new Date(2020, 07, 16), $lt: Date.now}});
        
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