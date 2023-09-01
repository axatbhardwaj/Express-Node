const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/products');

router.route('/').get(productControllers.getAllProducts);
router.route('/static').get(productControllers.getAllProductsStatic);
router.route('/featuredProducts').get(productControllers.getFeaturedProducts);

module.exports = router;