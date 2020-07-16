const Product = require('../models/Product');

module.exports = {
    async store(req, res) {
        const { id, name } = req.body;

        const date = new Date();
        date.setUTCMinutes(date.getMinutes() - 10);

        let product = await Product.findOne({ id, name }).sort("+createAt").where({ createAt: { $gte: date } });

        if (!product) {
            
            product = await Product.create({
                id: id,
                name: name
            });

            return res.status(200).send('Ok');
        }

        return res.status(403).send('Forbidden');
    }
}