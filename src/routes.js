const { Router } = require('express');
const ProductController = require('./app/controllers/ProductController');

const routes = Router();

routes.get('/products', ProductController.store);

module.exports = routes;