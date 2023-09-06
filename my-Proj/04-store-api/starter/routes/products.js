const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/products');

router.route('/').get(productControllers.getProducts);
router.route('/static').get(productControllers.getAllProductsStatic);
router.route('/featured-products').get(productControllers.getFeaturedProducts);
// router.route()

module.exports = router;