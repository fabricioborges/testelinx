const Product = require('../models/Product');
const ProductService = require('../services/product');

module.exports = {
    async store(req, res) {
        const product = req.body;

        const response = await ProductService.createProductRequest(product);    

        return response ? res.status(200).send('Ok') : res.status(403).send('Forbidden')
    }
}