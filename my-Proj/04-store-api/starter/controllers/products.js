const { json } = require('express');
const Product = require('../models/product');
const moment = require('moment');


const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({ products });
}

const getProducts = async (req, res) => {

    const timeStamp = moment().format('HH:mm:ss,DD-MM-YYYY');
    console.log(`function called : getAllProducts ,TIMESTAMP:${timeStamp}`);
    const { name: productName } = req.query;
    if (!productName) {
        const products = await Product.find({});
        if (!products) {
            res.status(404).json({ message: `no products found` });
        }
        res.status(200).json({
            count: products.length
            , products: products
        });
    }
    const products = await Product.find({ name: productName });
    res.status(200).json({ count: products.length, products: products })
}

const getFeaturedProducts = async (req, res) => {
    const product = await Product.find({ featured: true });
    if (!product) {
        res.status(404).json({ message: `no featured products` });
    }
    res.status(200).json({ product });
}

module.exports = { getFeaturedProducts, getProducts, getAllProductsStatic };